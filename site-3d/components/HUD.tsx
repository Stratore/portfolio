"use client";

import { useState } from "react";
import { useGraphContext } from "./GraphContext";
import { audioEngine } from "@/lib/audio/generativeAudio";
import { CVTerminal } from "./CVTerminal";
import { ContactTerminal } from "./ContactTerminal";
import { SplitText } from "./SplitText";
import type { NodeType } from "@/lib/types";

const LEGEND_ITEMS: { type: NodeType; label: string; dotClass: string }[] = [
    { type: "projet", label: "Projet", dotClass: "dot--projet" },
    { type: "techno", label: "Technologie", dotClass: "dot--techno" },
    { type: "skill", label: "Compétence", dotClass: "dot--skill" },
];

export function HUD() {
    const { selectedProject, selectProject, highlightedNode, clearHighlight, typeFilter, setTypeFilter } =
        useGraphContext();
    const showReset = selectedProject !== null || highlightedNode !== null;
    const [muted, setMuted] = useState(false);
    const [activePanel, setActivePanel] = useState<"cv" | "contact" | null>(null);

    const toggleMute = () => {
        const next = !muted;
        setMuted(next);
        audioEngine.setMuted(next);
    };

    return (
        <>
            <header className="hud-top glass">
                <div className="hud-brand">
                    <SplitText as="span" text="Pierre Puget" className="hud-brand__name" delayStep={0.02} />
                    <span className="hud-brand__role">Développement & Systèmes - BUT Informatique</span>
                </div>
                <nav className="hud-links">
                    <button className="hud-links__btn" onClick={() => setActivePanel("contact")}>
                        Email
                    </button>
                    <a href="https://www.linkedin.com/in/pierre-puget-54b427366/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="https://github.com/Stratore" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <button className="hud-links__btn" onClick={() => setActivePanel("cv")}>
                        CV
                    </button>
                </nav>
                <button
                    className="hud-mute"
                    onClick={toggleMute}
                    aria-label={muted ? "Réactiver le son" : "Couper le son"}
                    title={muted ? "Réactiver le son" : "Couper le son"}
                >
                    {muted ? "🔇" : "🔊"}
                </button>
            </header>

            <div className="hud-legend glass">
                {LEGEND_ITEMS.map((item) => (
                    <button
                        key={item.type}
                        className="hud-legend__item"
                        aria-pressed={typeFilter === item.type}
                        onClick={() => setTypeFilter(item.type)}
                    >
                        <i className={`dot ${item.dotClass}`} />
                        {item.label}
                    </button>
                ))}
                {typeFilter && (
                    <button
                        className="hud-legend__clear"
                        onClick={() => setTypeFilter(null)}
                        aria-label="Réinitialiser le filtre - tout voir"
                    >
                        <span aria-hidden="true">×</span> Tout voir
                    </button>
                )}
            </div>

            <p className="hud-hint glass">Glissez pour orbiter · molette pour zoomer · clic sur un nœud</p>

            {showReset && (
                <button
                    className="hud-reset glass"
                    onClick={() => {
                        selectProject(null);
                        clearHighlight();
                    }}
                >
                    ← Vue d&apos;ensemble
                </button>
            )}

            {activePanel === "cv" && <CVTerminal onClose={() => setActivePanel(null)} />}
            {activePanel === "contact" && <ContactTerminal onClose={() => setActivePanel(null)} />}
        </>
    );
}
