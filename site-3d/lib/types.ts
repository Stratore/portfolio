export type NodeType = "projet" | "techno" | "skill";

export interface ProjectDetails {
    tagline: string;
    description: string;
    tags: string[];
    github?: string;
    demo?: string;
    image?: string;
}

export interface RawNode {
    id: string;
    type: NodeType;
    label: string;
    /** Poids relatif (influence la taille du nœud) */
    weight?: number;
    project?: ProjectDetails;
}

export interface RawEdge {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: RawNode[];
    edges: RawEdge[];
}

/** Nœud une fois positionné par la simulation de force 3D. */
export interface PositionedNode extends RawNode {
    x: number;
    y: number;
    z: number;
}

export interface PositionedEdge {
    source: PositionedNode;
    target: PositionedNode;
}
