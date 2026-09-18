import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
    { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
    ...nextCoreWebVitals,
    ...nextTypescript,
    {
        // Shim de types pour d3-force-3d (paquet sans types officiels) :
        // `any` y est le seul choix honnête, ce fichier ne fait que déclarer
        // la forme de l'API externe, pas du code applicatif.
        files: ["types/*.d.ts"],
        rules: { "@typescript-eslint/no-explicit-any": "off" },
    },
];

export default config;
