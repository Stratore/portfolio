"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { PositionedEdge } from "@/lib/types";
import { useGraphContext } from "./GraphContext";

function EdgeParticle({ edge, offset }: { edge: PositionedEdge; offset: number }) {
    const ref = useRef<THREE.Mesh>(null);
    const start = new THREE.Vector3(edge.source.x, edge.source.y, edge.source.z);
    const end = new THREE.Vector3(edge.target.x, edge.target.y, edge.target.z);

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
    const { highlightedNode, hoveredNode } = useGraphContext();

    const touchesActive =
        highlightedNode !== null && (edge.source.id === highlightedNode.id || edge.target.id === highlightedNode.id);
    const touchesHover =
        hoveredNode !== null && (edge.source.id === hoveredNode.id || edge.target.id === hoveredNode.id);
    const isDimmed = highlightedNode !== null && !touchesActive;
    const isActive = touchesActive || touchesHover;

    const points: [number, number, number][] = [
        [edge.source.x, edge.source.y, edge.source.z],
        [edge.target.x, edge.target.y, edge.target.z],
    ];

    return (
        <>
            <Line
                points={points}
                color={isActive ? "#bfe9ff" : "#5a6472"}
                transparent
                opacity={isDimmed ? 0.08 : isActive ? 0.9 : 0.32}
                lineWidth={isActive ? 1.6 : 0.8}
            />
            {!isDimmed && <EdgeParticle edge={edge} offset={(edge.source.id.length + edge.target.id.length) % 10 / 10} />}
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
