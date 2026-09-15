"use client";

import { useMemo } from "react";

type Tag = "span" | "h1" | "h2" | "h3" | "p";

/**
 * Révélation caractère par caractère (inspirée du composant "Split Text" de
 * React Bits, réimplémentée en CSS pur pour rester sans dépendance et
 * cohérente avec la DA sombre/minimaliste du site). Chaque lettre apparaît
 * avec un léger décalage — évoque un texte qui se matérialise/se compile,
 * en phase avec l'univers terminal du reste de l'UI.
 */
export function SplitText({
    text,
    as: Tag = "span",
    className,
    delayStep = 0.028,
}: {
    text: string;
    as?: Tag;
    className?: string;
    delayStep?: number;
}) {
    const chars = useMemo(() => Array.from(text), [text]);

    return (
        <Tag className={`split-text${className ? ` ${className}` : ""}`}>
            {chars.map((char, i) => (
                <span key={i} className="split-text__char" style={{ animationDelay: `${i * delayStep}s` }}>
                    {char === " " ? " " : char}
                </span>
            ))}
        </Tag>
    );
}
