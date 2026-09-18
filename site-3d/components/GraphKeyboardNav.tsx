"use client";

import { graphLayout } from "@/lib/graphLayout";
import { useGraphContext } from "./GraphContext";
import type { NodeType } from "@/lib/types";

const KIND_LABEL: Record<NodeType, string> = { projet: "Projet", techno: "Technologie", skill: "Compétence" };

/**
 * Contrepartie clavier du graphe 3D. Les nœuds Three.js (ProjectNode,
 * InstancedNodes) ne réagissent qu'au pointeur - aucun élément DOM, donc rien
 * à atteindre au Tab ni à annoncer à un lecteur d'écran. Cette nav rejoue les
 * MÊMES actions que le clic 3D (selectProject / toggleHighlight, cf.
 * GraphContext) sur de vrais <button> : la caméra (CameraRig), le panneau
 * projet (InfoPanel) et la vignette compétence (SkillTag) suivent déjà l'état
 * du contexte, donc ils réagissent automatiquement, sans code dupliqué.
 *
 * Chaque bouton reste focusable en permanence (jamais display:none, qui le
 * retirerait de l'ordre de tabulation) mais visuellement hors-écran jusqu'à
 * recevoir le focus - le pattern standard des liens d'évitement.
 */
export function GraphKeyboardNav() {
    const { selectProject, toggleHighlight, selectedProject, highlightedNode } = useGraphContext();

    return (
        <nav className="graph-keyboard-nav" aria-label="Explorer le graphe 3D au clavier">
            {graphLayout.nodes.map((n) => {
                const isActive = n.type === "projet" ? selectedProject?.id === n.id : highlightedNode?.id === n.id;
                return (
                    <button
                        key={n.id}
                        className="graph-keyboard-nav__item"
                        aria-pressed={isActive}
                        onClick={() => (n.type === "projet" ? selectProject(n) : toggleHighlight(n))}
                    >
                        <span className="graph-keyboard-nav__kind">{KIND_LABEL[n.type]}</span>
                        {n.label}
                    </button>
                );
            })}
        </nav>
    );
}
