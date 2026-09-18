"use client";

import { useMemo } from "react";
import { graphLayout } from "@/lib/graphLayout";
import { graphData } from "@/data/graph";
import { ProjectNode } from "./ProjectNode";
import { InstancedNodes } from "./InstancedNodes";
import { Edges } from "./Edges";
import { SkillTag } from "./SkillTag";

export function NetworkGraph() {
    // Positions figées, calculées une seule fois pour tout le module
    // (cf. lib/graphLayout.ts) - pas de simulation physique continue ici.
    const { nodes, edges } = graphLayout;

    const projectNodes = useMemo(() => nodes.filter((n) => n.type === "projet"), [nodes]);
    const technoNodes = useMemo(() => nodes.filter((n) => n.type === "techno"), [nodes]);
    const skillNodes = useMemo(() => nodes.filter((n) => n.type === "skill"), [nodes]);

    return (
        <group>
            <Edges edges={edges} />

            {projectNodes.map((n, i) => (
                <ProjectNode key={n.id} node={n} seed={i * 1.618} />
            ))}

            <InstancedNodes type="techno" nodes={technoNodes} />
            <InstancedNodes type="skill" nodes={skillNodes} />

            <SkillTag />
        </group>
    );
}

/** Table d'adjacence id -> voisins directs, utilisée par GraphProvider pour la surbrillance. */
export function buildAdjacency(): Map<string, Set<string>> {
    const adjacency = new Map<string, Set<string>>();
    for (const node of graphData.nodes) adjacency.set(node.id, new Set());
    for (const edge of graphData.edges) {
        adjacency.get(edge.source)?.add(edge.target);
        adjacency.get(edge.target)?.add(edge.source);
    }
    return adjacency;
}
