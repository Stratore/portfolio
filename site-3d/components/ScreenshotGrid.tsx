"use client";

import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";

/**
 * Grille de captures pour la vue classique (Fallback2D, composant serveur -
 * seul ce petit îlot devient client pour l'interactivité). Mêmes vignettes
 * cliquables + ImageLightbox que dans InfoPanel : avant, un simple <a
 * target="_blank"> ouvrait l'image brute dans un nouvel onglet sans moyen
 * simple de revenir - remplacé par le même agrandissement encadré
 * (Échap / clic dehors pour fermer) que dans le graphe 3D.
 */
export function ScreenshotGrid({ screenshots, label }: { screenshots: string[]; label: string }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const lightboxSrc = lightboxIndex !== null ? screenshots[lightboxIndex] : undefined;

    return (
        <>
            <div className="fallback-2d__shots">
                {screenshots.map((src, i) => (
                    <button
                        key={src}
                        className="fallback-2d__shot"
                        onClick={() => setLightboxIndex(i)}
                        aria-label={`Agrandir la capture ${i + 1} - ${label}`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element -- miniatures statiques */}
                        <img src={src} alt={`${label} - capture ${i + 1}`} loading="lazy" />
                    </button>
                ))}
            </div>

            {lightboxSrc && (
                <ImageLightbox
                    src={lightboxSrc}
                    alt={`${label} - capture ${(lightboxIndex ?? 0) + 1}`}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
}
