"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Coque partagée par CVTerminal et ContactTerminal - un panneau en verre
 * dépoli sombre façon instrument de bord, RIGOUREUSEMENT centré (flex,
 * indépendant de la résolution), avec une barre de titre façon terminal.
 * Remplace l'ancienne métaphore "feuille de papier" (DocumentOverlay),
 * jugée hors-thème : ici tout reste dans le langage visuel déjà établi par
 * le HUD/InfoPanel (verre, mono, bordure fine), pas une troisième esthétique.
 */
export function TerminalPanel({
    path,
    title,
    onClose,
    children,
}: {
    /** Chemin façon terminal affiché dans la barre de titre, ex: "~/cv.tex" */
    path: string;
    title: string;
    onClose: () => void;
    children: ReactNode;
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="term-overlay" onClick={onClose}>
            <div className="term-panel glass" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={title}>
                <div className="term-bar">
                    <div className="term-bar__dots">
                        <span />
                        <span />
                        <span />
                    </div>
                    <span className="term-bar__path">{path}</span>
                    <button className="term-bar__close" onClick={onClose}>
                        [x] esc
                    </button>
                </div>
                <div className="term-body">{children}</div>
            </div>
        </div>
    );
}
