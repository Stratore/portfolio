"use client";

import { useEffect, useRef } from "react";

/**
 * Halo lumineux qui suit le curseur avec un léger retard et REMPLACE le
 * curseur natif (masqué via la classe "cursor-hidden" sur <body>, cf.
 * globals.css) — demandé explicitement : seule cette petite lumière doit
 * rester visible. La classe n'est posée que si le halo est effectivement
 * actif (souris fine + pas de "réduire les animations") : sur écran tactile
 * ou en cas de préférence d'accessibilité, le curseur natif reste visible,
 * sinon l'utilisateur n'aurait plus aucun repère visuel du tout.
 */
export function CursorTrail() {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!canHover || reduceMotion) return;

        document.body.classList.add("cursor-hidden");

        const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const pos = { ...target };
        let raf = 0;
        let active = false;

        const onMove = (e: PointerEvent) => {
            target.x = e.clientX;
            target.y = e.clientY;
            if (!active && dotRef.current) {
                active = true;
                dotRef.current.style.opacity = "1";
            }
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        const loop = () => {
            pos.x += (target.x - pos.x) * 0.16;
            pos.y += (target.y - pos.y) * 0.16;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            document.body.classList.remove("cursor-hidden");
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <div ref={dotRef} className="cursor-trail" aria-hidden="true" />;
}
