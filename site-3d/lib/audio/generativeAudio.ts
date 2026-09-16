import { defaultFraming } from "@/lib/defaultFraming";

// --- Design sonore — Option C : loops ambiants pré-produits, mixage réactif --
// Fini la synthèse en temps réel (source du son "crispant/fatigant") : les
// deux textures ci-dessous sont rendues hors-ligne (accord ouvert en
// synthèse additive, réverbération algorithmique type Freeverb, bouclage
// sans coupure — voir le script de rendu) puis exportées en MP3. Le
// Web Audio API ne sert plus ici qu'à LIRE et MIXER ces boucles de façon
// réactive : crossfade selon le zoom, filtre doux selon le mouvement.
// Jamais de distorsion possible : aucun paramètre ne peut faire saturer
// un simple gain/filtre.
const PAD_DEEP_URL = "/audio/pad-deep.mp3";
const PAD_HIGH_URL = "/audio/pad-high.mp3";

const FILTER_REST = 900;
const FILTER_ACTIVE = 2600; // ouverture douce, jamais extrême
const ACTIVITY_DECAY = 0.94;
const ACTIVITY_SENSITIVITY = 1.6;

const MASTER_TARGET_GAIN = 0.55;
const FADE_IN_SECONDS = 4;
const MUTE_RAMP_SECONDS = 0.8;
const SMOOTHING = 0.03;

// Balance deep/high à distance min (proche) et max (loin) du graphe —
// jamais 0/1 pur : les deux couches restent toujours un peu présentes
// pour un mélange riche, seul l'équilibre se déplace avec le zoom.
const DEEP_GAIN_FAR = 0.9;
const DEEP_GAIN_NEAR = 0.35;
const HIGH_GAIN_FAR = 0.15;
const HIGH_GAIN_NEAR = 0.75;

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

async function loadBuffer(ctx: AudioContext, url: string): Promise<AudioBuffer> {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    return ctx.decodeAudioData(arrayBuffer);
}

/**
 * Moteur audio — lecture réactive de deux nappes pré-rendues (pas de
 * synthèse en temps réel). `update()` pilote uniquement :
 *  - la balance deep/high (zoom caméra),
 *  - l'ouverture d'un filtre passe-bas doux (mouvement caméra, rotation ET pan).
 */
class GenerativeAudioEngine {
    private ctx: AudioContext | null = null;
    private deepSource: AudioBufferSourceNode | null = null;
    private highSource: AudioBufferSourceNode | null = null;
    private deepGain: GainNode | null = null;
    private highGain: GainNode | null = null;
    private filter: BiquadFilterNode | null = null;
    private masterGain: GainNode | null = null;

    private starting = false;
    private started = false;
    private muted = false;
    private currentDeepGain = DEEP_GAIN_FAR;
    private currentHighGain = HIGH_GAIN_FAR;
    private currentCutoff = FILTER_REST;
    private activity = 0;

    get isStarted() {
        return this.started;
    }
    get isMuted() {
        return this.muted;
    }

    /** À appeler depuis un vrai geste utilisateur (clic) — contrainte des navigateurs. */
    async start() {
        if (this.started) {
            this.ctx?.resume();
            return;
        }
        if (this.starting) return;
        this.starting = true;

        try {
            // Le contexte est créé de façon synchrone dans le geste utilisateur
            // (obligatoire) ; le chargement/décodage des boucles peut ensuite
            // continuer de façon asynchrone sans perdre l'autorisation navigateur.
            // Toute cette section (y compris la création du contexte lui-même)
            // est protégée : certains environnements bloquent Web Audio (iframe
            // sandboxée, politique navigateur stricte...) et `new AudioContext()`
            // peut lever une exception — sans ce filet, `starting` restait bloqué
            // à `true` pour toujours et plus aucun futur appel à `start()` n'aurait
            // d'effet, même après un vrai geste utilisateur ultérieur.
            const ctx = new AudioContext();
            this.ctx = ctx;

            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = FILTER_REST;
            filter.Q.value = 0.4;

            const masterGain = ctx.createGain();
            masterGain.gain.value = 0;
            filter.connect(masterGain);
            masterGain.connect(ctx.destination);
            this.filter = filter;
            this.masterGain = masterGain;

            try {
                const [deepBuffer, highBuffer] = await Promise.all([
                    loadBuffer(ctx, PAD_DEEP_URL),
                    loadBuffer(ctx, PAD_HIGH_URL),
                ]);

                const deepGain = ctx.createGain();
                deepGain.gain.value = DEEP_GAIN_FAR;
                const highGain = ctx.createGain();
                highGain.gain.value = HIGH_GAIN_FAR;

                const deepSource = ctx.createBufferSource();
                deepSource.buffer = deepBuffer;
                deepSource.loop = true;

                const highSource = ctx.createBufferSource();
                highSource.buffer = highBuffer;
                highSource.loop = true;

                deepSource.connect(deepGain);
                highSource.connect(highGain);
                deepGain.connect(filter);
                highGain.connect(filter);

                deepSource.start();
                highSource.start();

                this.deepSource = deepSource;
                this.highSource = highSource;
                this.deepGain = deepGain;
                this.highGain = highGain;
            } catch {
                // Si le chargement des boucles échoue (réseau, etc.), on laisse le
                // moteur silencieux plutôt que de bloquer le reste de l'expérience.
            }

            const now = ctx.currentTime;
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(this.muted ? 0 : MASTER_TARGET_GAIN, now + FADE_IN_SECONDS);

            this.started = true;
        } catch (err) {
            console.warn("[audio] démarrage impossible sur cet environnement :", err);
            this.ctx = null;
        } finally {
            this.starting = false;
        }
    }

    /** Bascule muet/audible avec une rampe douce (pas de coupure brutale). */
    setMuted(muted: boolean) {
        this.muted = muted;
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : MASTER_TARGET_GAIN, now + MUTE_RAMP_SECONDS);
    }

    /**
     * Appelé chaque frame (useFrame) avec l'état caméra courant.
     * `distance` = distance caméra ↔ centre du graphe (pilote la balance
     * deep/high). `movementDelta` = déplacement depuis la frame précédente,
     * rotation ET pan au clic gauche compris (pilote l'ouverture du filtre).
     */
    update(distance: number, movementDelta: number) {
        if (!this.started || !this.deepGain || !this.highGain || !this.filter) return;

        const { minDistance, maxDistance } = defaultFraming;
        const clamped = Math.min(Math.max(distance, minDistance), maxDistance);
        const closeness = 1 - (clamped - minDistance) / (maxDistance - minDistance || 1); // 1 = proche, 0 = loin

        const targetDeep = lerp(DEEP_GAIN_FAR, DEEP_GAIN_NEAR, closeness);
        const targetHigh = lerp(HIGH_GAIN_FAR, HIGH_GAIN_NEAR, closeness);
        this.currentDeepGain = lerp(this.currentDeepGain, targetDeep, SMOOTHING);
        this.currentHighGain = lerp(this.currentHighGain, targetHigh, SMOOTHING);
        this.deepGain.gain.value = this.currentDeepGain;
        this.highGain.gain.value = this.currentHighGain;

        this.activity = Math.max(this.activity * ACTIVITY_DECAY, Math.min(movementDelta * ACTIVITY_SENSITIVITY, 1));
        const targetCutoff = FILTER_REST + this.activity * (FILTER_ACTIVE - FILTER_REST);
        this.currentCutoff = lerp(this.currentCutoff, targetCutoff, SMOOTHING);
        this.filter.frequency.value = this.currentCutoff;
    }

    stop() {
        this.deepSource?.stop();
        this.highSource?.stop();
        this.ctx?.close();
        this.ctx = null;
        this.started = false;
    }
}

export const audioEngine = new GenerativeAudioEngine();
