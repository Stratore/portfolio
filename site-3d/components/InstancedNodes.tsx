"use client";

import { Suspense, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Billboard, Instances, Instance, Text } from "@react-three/drei";
import * as THREE from "three";
import type { NodeType, PositionedNode } from "@/lib/types";
import { useGraphContext } from "./GraphContext";

const PALETTE: Record<NodeType, { base: string; dim: string }> = {
    projet: { base: "#5ec8ff", dim: "#2b4a5c" },
    techno: { base: "#8f7bff", dim: "#3a3358" },
    skill: { base: "#5be8a6", dim: "#2c4a3c" },
};

/**
 * Rendu instancié (instancedMesh via drei <Instances>) pour les nœuds
 * "Technologie" et "Compétence" — le même schéma s'étend sans coût
 * supplémentaire à des centaines de nœuds.
 */
export function InstancedNodes({ type, nodes }: { type: Extract<NodeType, "techno" | "skill">; nodes: PositionedNode[] }) {
    const { hoveredNode, setHoveredNode, highlightedNode, toggleHighlight, relatedIds } = useGraphContext();
    const refs = useRef<(THREE.Object3D | null)[]>([]);
    const colors = useRef<(THREE.Color | null)[]>([]);
    const { base, dim } = PALETTE[type];
    const radius = type === "techno" ? 0.42 : 0.36;
    const nearDetail = type === "techno" ? 0 : 1;

    // LOD léger basé sur la distance caméra : au-delà d'un certain éloignement,
    // on retombe sur la géométrie la plus grossière (0 subdivision) — même
    // principe qu'un THREE.LOD, généralisable sans changement à des centaines
    // de nœuds instanciés. Recalculé toutes les ~12 frames (pas besoin de plus).
    const { camera } = useThree();
    const [isFar, setIsFar] = useState(false);
    const frameCount = useRef(0);
    const detail = isFar ? 0 : nearDetail;

    useFrame(({ clock }) => {
        frameCount.current++;
        if (frameCount.current % 12 === 0) {
            const dist = camera.position.length();
            const nextIsFar = dist > 42;
            if (nextIsFar !== isFar) setIsFar(nextIsFar);
        }

        const t = clock.getElapsedTime();
        nodes.forEach((n, i) => {
            const obj = refs.current[i];
            if (obj) {
                obj.position.set(n.x, n.y + Math.sin(t * 0.6 + i * 1.7) * 0.18, n.z + Math.cos(t * 0.5 + i * 1.3) * 0.1);
                const isHovered = hoveredNode?.id === n.id;
                const isHighlighted = highlightedNode?.id === n.id;
                const target = isHovered || isHighlighted ? 1.7 : 1;
                obj.scale.lerp(new THREE.Vector3(target, target, target), 0.18);
            }
            const col = colors.current[i];
            if (col) {
                const isDimmed = relatedIds !== null && !relatedIds.has(n.id);
                const targetColor = isDimmed ? new THREE.Color(dim) : new THREE.Color(base);
                col.lerp(targetColor, 0.12);
            }
        });
    });

    return (
        <group>
            <Instances limit={Math.max(nodes.length, 1)} range={nodes.length}>
                <icosahedronGeometry args={[radius, detail]} />
                <meshStandardMaterial roughness={0.35} metalness={0.3} emissive={base} emissiveIntensity={0.55} />
                {nodes.map((n, i) => (
                    <Instance
                        key={n.id}
                        ref={(el: THREE.Object3D | null) => { refs.current[i] = el; }}
                        color={base}
                        position={[n.x, n.y, n.z]}
                        onUpdate={(self: any) => {
                            colors.current[i] = self.color as THREE.Color;
                        }}
                        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                            e.stopPropagation();
                            setHoveredNode(n);
                            document.body.style.cursor = "pointer";
                        }}
                        onPointerOut={(e: ThreeEvent<PointerEvent>) => {
                            e.stopPropagation();
                            setHoveredNode(null);
                            document.body.style.cursor = "auto";
                        }}
                        onClick={(e: ThreeEvent<MouseEvent>) => {
                            e.stopPropagation();
                            toggleHighlight(n);
                        }}
                    />
                ))}
            </Instances>

            {nodes.map((n) => {
                const isVisible = hoveredNode?.id === n.id || highlightedNode?.id === n.id;
                if (!isVisible) return null;
                return (
                    <Suspense key={`label-${n.id}`} fallback={null}>
                        <Billboard position={[n.x, n.y + radius + 0.45, n.z]}>
                            <Text
                                fontSize={0.34}
                                color="#f2f6f8"
                                anchorX="center"
                                anchorY="bottom"
                                outlineWidth={0.022}
                                outlineColor="#04070a"
                                outlineOpacity={0.9}
                            >
                                {n.label}
                            </Text>
                        </Billboard>
                    </Suspense>
                );
            })}
        </group>
    );
}
