"use client";

import { useEffect, useState } from "react";
import { graphData } from "@/data/graph";

const LINES = [
    "$ init_graph.sh",
    `> ${graphData.nodes.length} nœuds chargés`,
    `> ${graphData.edges.length} relations tissées`,
    "> rendu prêt",
];

const LINE_DELAY_MS = 260;
const HOLD_MS = 1400;
const FADE_MS = 500;

/**
 * Court log façon terminal qui s'affiche une fois au premier montage, puis
 * disparaît — clin d'œil "boot séquence" cohérent avec l'esthétique
 * terminal déjà présente (CVTerminal, sigils "$"), jamais un écran d'attente
 * qui bloquerait l'arrivée directe dans la scène 3D (purement décoratif, en
 * coin, la scène est déjà interactive derrière).
 */
export function BootSequence() {
    const [visibleLines, setVisibleLines] = useState(0);
    const [fading, setFading] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDone(true);
            return;
        }

        const timers: ReturnType<typeof setTimeout>[] = [];
        LINES.forEach((_, i) => {
            timers.push(setTimeout(() => setVisibleLines(i + 1), i * LINE_DELAY_MS));
        });
        const lastLineAt = (LINES.length - 1) * LINE_DELAY_MS;
        timers.push(setTimeout(() => setFading(true), lastLineAt + HOLD_MS));
        timers.push(setTimeout(() => setDone(true), lastLineAt + HOLD_MS + FADE_MS));

        return () => timers.forEach(clearTimeout);
    }, []);

    if (done) return null;

    return (
        <div className={`boot-sequence${fading ? " boot-sequence--fading" : ""}`} aria-hidden="true">
            {LINES.slice(0, visibleLines).map((line, i) => (
                <p key={i} className="boot-sequence__line">
                    {line}
                </p>
            ))}
        </div>
    );
}
