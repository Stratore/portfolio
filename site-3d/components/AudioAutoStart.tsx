"use client";

import { useEffect } from "react";
import { audioEngine } from "@/lib/audio/generativeAudio";

/**
 * Démarre le moteur audio silencieusement, sans aucun écran d'entrée visible.
 * Les navigateurs bloquent l'audio tant qu'aucun geste utilisateur réel n'a
 * eu lieu (clic, touche, molette) — ici ce geste est la toute première
 * interaction naturelle avec la scène 3D (orbiter, zoomer...), jamais une
 * étape dédiée qui casserait l'arrivée directe dans l'espace.
 */
export function AudioAutoStart() {
    useEffect(() => {
        const start = () => {
            audioEngine.start().catch(() => {
                // audioEngine.start() gère déjà ses propres erreurs en interne
                // (cf. lib/audio/generativeAudio.ts) ; ce filet évite seulement
                // un avertissement "unhandled promise rejection" dans la console
                // si un cas imprévu remontait malgré tout.
            });
            window.removeEventListener("pointerdown", start);
            window.removeEventListener("keydown", start);
            window.removeEventListener("wheel", start);
        };
        window.addEventListener("pointerdown", start, { once: true });
        window.addEventListener("keydown", start, { once: true });
        window.addEventListener("wheel", start, { once: true, passive: true });
        return () => {
            window.removeEventListener("pointerdown", start);
            window.removeEventListener("keydown", start);
            window.removeEventListener("wheel", start);
        };
    }, []);

    return null;
}
