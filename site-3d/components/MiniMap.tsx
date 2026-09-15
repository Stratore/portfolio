"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { graphLayout } from "@/lib/graphLayout";
import { cameraSignal } from "@/lib/cameraSignal";
import { useGraphContext } from "./GraphContext";
import type { PositionedNode } from "@/lib/types";

const SIZE = 132; // px, résolution du canvas (carré) — inchangée
const PADDING = 14;
const HIT_RADIUS = 13; // px, tolérance de ciblage (clic ET survol)

const BASE_RADIUS = 3.6; // était 2.2 — trop petit pour cibler confortablement
const ACTIVE_RADIUS = 5.2; // était 3.4
const HOVER_RADIUS = 4.8;

const NODE_COLOR: Record<string, string> = {
    projet: "#5ec8ff",
    techno: "#8f7bff",
    skill: "#5be8a6",
};

/**
 * Instrument de navigation façon "carte de bord de vaisseau" : projection
 * filaire du graphe vu du dessus (plan X/Z), un réticule montrant la
 * position et l'orientation de la caméra en temps réel, et un clic sur un
 * point pour un fast-travel direct — le même mécanisme que cliquer le nœud
 * en 3D (cf. CameraRig). Dessinée en Canvas2D avec sa propre boucle
 * requestAnimationFrame : aucune donnée haute-fréquence ne transite par
 * React (cf. lib/cameraSignal.ts).
 */
export function MiniMap() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { selectProject, toggleHighlight, selectedProject, highlightedNode } = useGraphContext();
    const projected = useRef<{ node: PositionedNode; px: number; py: number }[]>([]);
    const hoverPoint = useRef<{ x: number; y: number } | null>(null);

    const project = (x: number, z: number) => {
        const r = graphLayout.radius || 1;
        const px = SIZE / 2 + ((x - graphLayout.center[0]) / r) * (SIZE / 2 - PADDING);
        const py = SIZE / 2 + ((z - graphLayout.center[2]) / r) * (SIZE / 2 - PADDING);
        return { px, py };
    };

    const nearestNode = (x: number, y: number) => {
        let nearest: { node: PositionedNode; px: number; py: number } | null = null;
        let nearestDist = HIT_RADIUS;
        for (const p of projected.current) {
            const d = Math.hypot(p.px - x, p.py - y);
            if (d < nearestDist) {
                nearestDist = d;
                nearest = p;
            }
        }
        return nearest;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let raf = 0;
        const draw = () => {
            ctx.clearRect(0, 0, SIZE, SIZE);

            // Cercle de fond
            ctx.beginPath();
            ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 2, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,0.12)";
            ctx.lineWidth = 1;
            ctx.stroke();

            const nodes = graphLayout.nodes;
            const points = new Map<string, { px: number; py: number }>();
            for (const n of nodes) {
                points.set(n.id, project(n.x, n.z));
            }

            // Arêtes (filaire)
            ctx.strokeStyle = "rgba(255,255,255,0.16)";
            ctx.lineWidth = 1;
            for (const e of graphLayout.edges) {
                const a = points.get(e.source.id);
                const b = points.get(e.target.id);
                if (!a || !b) continue;
                ctx.beginPath();
                ctx.moveTo(a.px, a.py);
                ctx.lineTo(b.px, b.py);
                ctx.stroke();
            }

            // Nœuds
            projected.current = [];
            for (const n of nodes) points.get(n.id) && projected.current.push({ node: n, ...points.get(n.id)! });

            const hovered = hoverPoint.current ? nearestNode(hoverPoint.current.x, hoverPoint.current.y) : null;

            for (const { node: n, px, py } of projected.current) {
                const isActive = selectedProject?.id === n.id || highlightedNode?.id === n.id;
                const isHovered = hovered?.node.id === n.id;
                const color = NODE_COLOR[n.type] ?? "#ffffff";
                const radius = isActive ? ACTIVE_RADIUS : isHovered ? HOVER_RADIUS : BASE_RADIUS;

                if (isActive || isHovered) {
                    // Halo lumineux — rend le ciblage net, demandé explicitement.
                    ctx.save();
                    ctx.shadowColor = color;
                    ctx.shadowBlur = 12;
                    ctx.beginPath();
                    ctx.arc(px, py, radius, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.restore();
                } else {
                    ctx.beginPath();
                    ctx.arc(px, py, radius, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.globalAlpha = 0.85;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            // Étiquette du nœud survolé
            if (hovered) {
                ctx.font = "9px var(--font-mono), monospace";
                ctx.textAlign = "center";
                const labelY = hovered.py - HOVER_RADIUS - 5;
                ctx.fillStyle = "rgba(3,4,7,0.85)";
                const textWidth = ctx.measureText(hovered.node.label).width;
                ctx.fillRect(hovered.px - textWidth / 2 - 3, labelY - 9, textWidth + 6, 12);
                ctx.fillStyle = "#f2f6f8";
                ctx.fillText(hovered.node.label, hovered.px, labelY);
            }

            // Réticule caméra (position + direction de vue, plan X/Z)
            const cam = project(cameraSignal.x, cameraSignal.z);
            const angle = Math.atan2(cameraSignal.dirX, cameraSignal.dirZ);
            ctx.save();
            ctx.translate(
                Math.max(6, Math.min(SIZE - 6, cam.px)),
                Math.max(6, Math.min(SIZE - 6, cam.py))
            );
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -7);
            ctx.lineTo(4, 5);
            ctx.lineTo(-4, 5);
            ctx.closePath();
            ctx.fillStyle = "#f2f6f8";
            ctx.fill();
            ctx.restore();

            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProject, highlightedNode]);

    const pointFromEvent = (e: MouseEvent<HTMLCanvasElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        return {
            x: ((e.clientX - rect.left) / rect.width) * SIZE,
            y: ((e.clientY - rect.top) / rect.height) * SIZE,
        };
    };

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        hoverPoint.current = pointFromEvent(e);
    };

    const handleMouseLeave = () => {
        hoverPoint.current = null;
    };

    const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
        const { x, y } = pointFromEvent(e);
        const hit = nearestNode(x, y);
        if (!hit) return;
        if (hit.node.type === "projet") selectProject(hit.node);
        else toggleHighlight(hit.node);
    };

    return (
        <div className="minimap-wrap glass">
            <p className="minimap-label">Carte</p>
            <canvas
                ref={canvasRef}
                width={SIZE}
                height={SIZE}
                className="minimap-canvas"
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
}
