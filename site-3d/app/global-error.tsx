"use client";

import { useEffect } from "react";

/**
 * Dernier filet de secours : se déclenche si le root layout lui-même plante.
 * Next.js impose que ce fichier redéfinisse <html>/<body> - le layout normal
 * (et son import de globals.css) est court-circuité, donc tout est en style
 * inline ici pour rester lisible même si aucune feuille de style ne charge.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            console.error("[app/global-error] erreur racine :", error);
        }
    }, [error]);

    return (
        <html lang="fr">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#030407",
                    color: "#f2f6f8",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div style={{ textAlign: "center", maxWidth: 420, padding: "0 1.5rem" }}>
                    <p style={{ color: "#5ec8ff", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
                        Erreur inattendue
                    </p>
                    <p style={{ color: "#9aa4ad", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.4rem" }}>
                        Le site a rencontré un problème. Vous pouvez réessayer ou recharger la page.
                    </p>
                    <button
                        onClick={() => reset()}
                        style={{
                            fontFamily: "monospace",
                            fontSize: "0.8rem",
                            color: "#f2f6f8",
                            background: "none",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: 30,
                            padding: "0.6rem 1.2rem",
                            cursor: "pointer",
                        }}
                    >
                        Réessayer
                    </button>
                </div>
            </body>
        </html>
    );
}
