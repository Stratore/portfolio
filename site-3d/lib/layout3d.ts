import { forceSimulation, forceManyBody, forceLink, forceCenter, forceCollide, forceX, forceY, forceZ } from "d3-force-3d";
import type { GraphData, PositionedNode, PositionedEdge, RawNode } from "@/lib/types";

interface SimNode extends RawNode {
    x: number;
    y: number;
    z: number;
    vx?: number;
    vy?: number;
    vz?: number;
}

export interface GraphLayoutResult {
    nodes: PositionedNode[];
    edges: PositionedEdge[];
    /** Centre de la sphère englobant tous les nœuds (moyenne des positions). */
    center: [number, number, number];
    /** Rayon de cette sphère, marge visuelle (taille de nœud + label) incluse. */
    radius: number;
}

/**
 * Calcule une disposition statique des nœuds dans l'espace 3D via d3-force-3d,
 * puis fige le résultat (pas de simulation continue à chaque frame — les nœuds
 * reçoivent ensuite une légère oscillation "flottante" côté rendu, découplée
 * de la physique du graphe).
 *
 * Retourne aussi le centre et le rayon de la sphère englobante : c'est ce qui
 * permet au cadrage caméra (lib/cameraFraming.ts) de s'adapter automatiquement
 * quelle que soit la taille du graphe, sans jamais coder une position en dur.
 */
export function computeLayout(data: GraphData): GraphLayoutResult {
    const simNodes: SimNode[] = data.nodes.map((n) => ({ ...n, x: 0, y: 0, z: 0 }));
    const nodeById = new Map(simNodes.map((n) => [n.id, n]));

    const links = data.edges
        .filter((e) => nodeById.has(e.source) && nodeById.has(e.target))
        .map((e) => ({ source: e.source, target: e.target }));

    const simulation = forceSimulation(simNodes, 3)
        .force(
            "charge",
            forceManyBody().strength((n: SimNode) => -18 * (n.weight ?? 1) * (n.type === "projet" ? 2.3 : 1))
        )
        .force(
            "link",
            forceLink(links)
                .id((n: SimNode) => n.id)
                .distance((l: any) => {
                    const s = nodeById.get(typeof l.source === "string" ? l.source : l.source.id);
                    return s?.type === "projet" ? 6.6 : 3.2;
                })
                .strength(0.4)
        )
        .force("center", forceCenter(0, 0, 0))
        // forceCenter ne fait que recentrer la moyenne globale — elle ne retient pas
        // les sous-graphes non connectés entre eux (ex : compétences "Web" et
        // "Systèmes", qui ne partagent aucune arête avec les projets). Sans force
        // de rappel par axe, la répulsion forceManyBody les envoie indéfiniment
        // loin de l'origine. forceX/Y/Z(0) agit comme un ressort doux vers le
        // centre sur chaque nœud, quelle que soit sa connectivité.
        .force("x", forceX(0).strength(0.09))
        .force("y", forceY(0).strength(0.09))
        .force("z", forceZ(0).strength(0.09))
        .force("collide", forceCollide((n: SimNode) => 1.6 * (n.weight ?? 1) + (n.type === "projet" ? 1.85 : 0)))
        .stop();

    const TICKS = 360;
    for (let i = 0; i < TICKS; i++) simulation.tick();

    const nodes: PositionedNode[] = simNodes.map((n) => ({ ...n, x: n.x, y: n.y, z: n.z }));
    const positioned = new Map(nodes.map((n) => [n.id, n]));

    const edges: PositionedEdge[] = data.edges
        .map((e) => {
            const source = positioned.get(e.source);
            const target = positioned.get(e.target);
            if (!source || !target) return null;
            return { source, target };
        })
        .filter((e): e is PositionedEdge => e !== null);

    // Sphère englobante : centre = barycentre des nœuds, rayon = distance max
    // au centre + une marge tenant compte du rayon visuel de chaque nœud
    // (les projets sont plus gros et portent un label sous la sphère).
    let cx = 0;
    let cy = 0;
    let cz = 0;
    for (const n of nodes) {
        cx += n.x;
        cy += n.y;
        cz += n.z;
    }
    const count = nodes.length || 1;
    cx /= count;
    cy /= count;
    cz /= count;

    let maxReach = 0;
    for (const n of nodes) {
        const visualMargin = n.type === "projet" ? 0.85 * (n.weight ?? 1) + 1.6 : 0.9;
        const dist = Math.hypot(n.x - cx, n.y - cy, n.z - cz) + visualMargin;
        if (dist > maxReach) maxReach = dist;
    }
    const radius = Math.max(maxReach, 8); // plancher : reste lisible même avec très peu de nœuds

    return { nodes, edges, center: [cx, cy, cz], radius };
}
