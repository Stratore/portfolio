"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { PositionedEdge } from "@/lib/types";
import { useGraphContext } from "./GraphContext";

// useMemo sur start/end : une arête relie deux positions FIXES (graphLayout
// est calculé une seule fois) - sans ça, ces deux Vector3 seraient réalloués
// à chaque re-render (hover/sélection sur N'IMPORTE quel nœud du graphe
// re-render toutes les arêtes via le contexte).
function EdgeParticle({ edge, offset }: { edge: PositionedEdge; offset: number }) {
    const ref = useRef<THREE.Mesh>(null);
    const start = useMemo(
        () => new THREE.Vector3(edge.source.x, edge.source.y, edge.source.z),
        [edge.source.x, edge.source.y, edge.source.z]
    );
    const end = useMemo(
        () => new THREE.Vector3(edge.target.x, edge.target.y, edge.target.z),
        [edge.target.x, edge.target.y, edge.target.z]
    );

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = (clock.getElapsedTime() * 0.25 + offset) % 1;
        ref.current.position.lerpVectors(start, end, t);
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#bfe9ff" />
        </mesh>
    );
}

function Edge({ edge }: { edge: PositionedEdge }) {
    const { highlightedNode, hoveredNode, typeFilter } = useGraphContext();

    const touchesActive =
        highlightedNode !== null && (edge.source.id === highlightedNode.id || edge.target.id === highlightedNode.id);
    const touchesHover =
        hoveredNode !== null && (edge.source.id === hoveredNode.id || edge.target.id === hoveredNode.id);
    // Une arête ne reste visible sous filtre que si ses DEUX extrémités
    // correspondent au type affiché - sinon elle pointe vers un nœud masqué.
    const isFilteredOut =
        typeFilter !== null && (edge.source.type !== typeFilter || edge.target.type !== typeFilter);
    const isDimmed = !isFilteredOut && highlightedNode !== null && !touchesActive;
    const isActive = !isFilteredOut && (touchesActive || touchesHover);

    // Extrémités figées (mêmes positions qu'au montage) : mémoïsées pour ne
    // pas repasser un nouveau tableau à <Line> (donc une nouvelle géométrie)
    // à chaque re-render déclenché par un hover/highlight qui ne concerne
    // même pas cette arête.
    const points = useMemo<[number, number, number][]>(
        () => [
            [edge.source.x, edge.source.y, edge.source.z],
            [edge.target.x, edge.target.y, edge.target.z],
        ],
        [edge.source.x, edge.source.y, edge.source.z, edge.target.x, edge.target.y, edge.target.z]
    );

    return (
        <>
            <Line
                points={points}
                color={isActive ? "#bfe9ff" : "#5a6472"}
                transparent
                opacity={isFilteredOut ? 0 : isDimmed ? 0.08 : isActive ? 0.9 : 0.32}
                lineWidth={isActive ? 1.6 : 0.8}
            />
            {!isDimmed && !isFilteredOut && (
                <EdgeParticle edge={edge} offset={(edge.source.id.length + edge.target.id.length) % 10 / 10} />
            )}
        </>
    );
}

export function Edges({ edges }: { edges: PositionedEdge[] }) {
    return (
        <group>
            {edges.map((e) => (
                <Edge key={`${e.source.id}-${e.target.id}`} edge={e} />
            ))}
        </group>
    );
}
