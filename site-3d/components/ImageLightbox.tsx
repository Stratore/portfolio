"use client";

import { useEffect } from "react";

/**
 * Agrandissement plein écran d'une capture de la galerie projet (cf.
 * InfoPanel.tsx) - même langage visuel/comportement que TerminalPanel (fond
 * sombre, esc pour fermer, clic en dehors pour fermer) plutôt qu'une 3e
 * variante de modale.
 */
export function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
            <button className="lightbox-close" onClick={onClose} aria-label="Fermer">
                [x] esc
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element -- galerie de captures statiques, pas besoin du pipeline next/image ici */}
            <img className="lightbox-image" src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
    );
}
