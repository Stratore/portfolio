// Site 100% statique (aucun formulaire, aucune donnée utilisateur, aucune
// clé API côté client) : pas besoin de nonces CSP dynamiques (ça demanderait
// un middleware). 'unsafe-inline' reste nécessaire pour les scripts/styles
// que Next.js injecte lui-même au bootstrap — le vrai gain de sécurité ici
// vient surtout de script-src/object-src/frame-ancestors, qui bloquent
// l'exécution de scripts tiers et l'embarquement du site dans une iframe.
//
// 'unsafe-eval' n'est autorisé qu'EN DÉVELOPPEMENT : le HMR webpack de
// `next dev` compile ses source maps via eval() et plante sinon (vérifié en
// local). Le build de production ne génère pas ce genre de chunk — le
// garder hors de la CSP de prod est donc un vrai gain de sécurité, pas
// seulement cosmétique.
const isDev = process.env.NODE_ENV !== "production";
const CSP = [
    "default-src 'self'",
    // blob: est nécessaire en dev ET en prod : troika-three-text (labels 3D,
    // cf. lib/troikaConfig.ts) instancie un Worker de génération SDF de
    // glyphes via une URL blob:, y compris texte "layout" désactivé — sans
    // ça les labels 3D ne s'affichent jamais (vérifié en local).
    `script-src 'self' 'unsafe-inline' blob:${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob:",
    "media-src 'self'",
    // cdn.jsdelivr.net : troika-three-text (labels 3D) va y chercher, à la
    // demande, la table de résolution unicode → police par défaut (aucune
    // police custom n'est fournie aux <Text>, cf. composants ProjectNode/
    // InstancedNodes) — sans ça, aucun label 3D ne s'affiche (vérifié en local).
    "connect-src 'self' https://cdn.jsdelivr.net",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
].join("; ");

const securityHeaders = [
    { key: "Content-Security-Policy", value: CSP },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
};

export default nextConfig;
