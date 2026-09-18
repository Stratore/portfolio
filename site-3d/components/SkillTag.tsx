"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import { graphData } from "@/data/graph";
import { graphLayout } from "@/lib/graphLayout";
import { useGraphContext } from "./GraphContext";

/**
 * Vignette légère (DOM, pas un mesh) qui s'affiche près d'un nœud techno/
 * compétence sélectionné. Contrairement au panneau des projets, son contenu
 * n'est jamais rédigé à la main : la liste "Utilisé dans" est dérivée des
 * arêtes déjà présentes dans data/graph.ts. Ajouter un projet qui référence
 * cette compétence suffit à le faire apparaître ici automatiquement.
 */
export function SkillTag() {
    const { highlightedNode, selectProject } = useGraphContext();

    const connectedProjects = useMemo(() => {
        if (!highlightedNode) return [];
        const neighborIds = new Set<string>();
        for (const edge of graphData.edges) {
            if (edge.source === highlightedNode.id) neighborIds.add(edge.target);
            if (edge.target === highlightedNode.id) neighborIds.add(edge.source);
        }
        return graphLayout.nodes.filter((n) => n.type === "projet" && neighborIds.has(n.id));
    }, [highlightedNode]);

    if (!highlightedNode) return null;

    const radius = highlightedNode.type === "techno" ? 0.42 : 0.36;

    // .world-canvas (parent du <Canvas>) a son propre z-index (pour rester
    // sous le HUD) : ça plafonne TOUT son contenu, y compris ce que <Html>
    // porte dans le DOM par défaut - aucun z-index interne ne peut alors
    // dépasser le HUD. On téléporte donc explicitement la vignette dans
    // #skill-tag-portal, un conteneur frère du HUD (cf. World3D.tsx),
    // pour sortir de cette contrainte de contexte d'empilement.
    const portalEl = typeof document !== "undefined" ? document.getElementById("skill-tag-portal") : null;

    return (
        <Html
            position={[highlightedNode.x, highlightedNode.y + radius + 0.9, highlightedNode.z]}
            center
            occlude={false}
            portal={portalEl ? { current: portalEl } : undefined}
        >
            <div className="skill-tag glass">
                <p className="skill-tag__label">{highlightedNode.label}</p>
                {connectedProjects.length > 0 ? (
                    <>
                        <p className="skill-tag__eyebrow">Utilisé dans</p>
                        <ul className="skill-tag__list">
                            {connectedProjects.map((project) => (
                                <li key={project.id}>
                                    <button onClick={() => selectProject(project)}>{project.label}</button>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="skill-tag__empty">Pas encore utilisé dans un projet publié.</p>
                )}
            </div>
        </Html>
    );
}
