"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { NodeType, PositionedNode } from "@/lib/types";

interface GraphContextValue {
    /** Nœud projet actuellement ouvert dans le panneau d'info (ou null). */
    selectedProject: PositionedNode | null;
    selectProject: (node: PositionedNode | null) => void;

    /** Nœud survolé (tooltip / pulsation). */
    hoveredNode: PositionedNode | null;
    setHoveredNode: (node: PositionedNode | null) => void;

    /** Nœud techno/skill "épinglé" par clic : met en surbrillance les projets liés. */
    highlightedNode: PositionedNode | null;
    toggleHighlight: (node: PositionedNode) => void;
    clearHighlight: () => void;

    /** Ensemble des ids connectés au nœud highlighté (lui inclus), ou null si aucun. */
    relatedIds: Set<string> | null;

    /** Filtre actif sur le type de nœud affiché (boutons de la légende), ou null si aucun. */
    typeFilter: NodeType | null;
    setTypeFilter: (type: NodeType | null) => void;
}

const GraphContext = createContext<GraphContextValue | null>(null);

export function GraphProvider({
    children,
    adjacency,
}: {
    children: ReactNode;
    /** Map id -> ids voisins directs, précalculée à partir des arêtes du graphe. */
    adjacency: Map<string, Set<string>>;
}) {
    const [selectedProjectState, setSelectedProjectState] = useState<PositionedNode | null>(null);
    const [hoveredNode, setHoveredNode] = useState<PositionedNode | null>(null);
    const [highlightedNode, setHighlightedNode] = useState<PositionedNode | null>(null);
    const [typeFilter, setTypeFilterState] = useState<NodeType | null>(null);

    // Un seul "focus" actif à la fois : ouvrir le panneau d'un projet ferme la
    // vignette d'une compétence, et inversement — sinon les deux peuvent se
    // superposer à l'écran et la caméra ne sait plus où regarder.
    const selectProject = (node: PositionedNode | null) => {
        setSelectedProjectState(node);
        if (node) setHighlightedNode(null);
    };
    const toggleHighlight = (node: PositionedNode) => {
        setHighlightedNode((current) => (current?.id === node.id ? null : node));
        setSelectedProjectState(null);
    };
    const clearHighlight = () => setHighlightedNode(null);
    const selectedProject = selectedProjectState;

    // Filtrer par type ferme le panneau projet et la surbrillance en cours —
    // même logique de "focus unique" que selectProject/toggleHighlight, pour
    // éviter un panneau ouvert sur un nœud que le filtre vient de masquer.
    // Recliquer le même bouton de légende annule le filtre (toggle).
    const setTypeFilter = (type: NodeType | null) => {
        setTypeFilterState((current) => (current === type ? null : type));
        setSelectedProjectState(null);
        setHighlightedNode(null);
    };

    const relatedIds = useMemo(() => {
        if (!highlightedNode) return null;
        const neighbours = adjacency.get(highlightedNode.id) ?? new Set<string>();
        return new Set<string>([highlightedNode.id, ...neighbours]);
    }, [highlightedNode, adjacency]);

    const value: GraphContextValue = {
        selectedProject,
        selectProject,
        hoveredNode,
        setHoveredNode,
        highlightedNode,
        toggleHighlight,
        clearHighlight,
        relatedIds,
        typeFilter,
        setTypeFilter,
    };

    return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
}

export function useGraphContext() {
    const ctx = useContext(GraphContext);
    if (!ctx) throw new Error("useGraphContext must be used within a GraphProvider");
    return ctx;
}
