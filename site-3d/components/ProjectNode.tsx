"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import type { PositionedNode } from "@/lib/types";
import { useGraphContext } from "./GraphContext";

const ACCENT = "#5ec8ff";
const ACCENT_DIM = "#2b4a5c";

export function ProjectNode({ node, seed }: { node: PositionedNode; seed: number }) {
    const { hoveredNode, setHoveredNode, selectedProject, selectProject, relatedIds } = useGraphContext();
    const group = useRef<THREE.Group>(null);
    const mesh = useRef<THREE.Mesh>(null);
    const material = useRef<THREE.MeshStandardMaterial>(null);

    const radius = 0.85 * (node.weight ?? 1);
    const isHovered = hoveredNode?.id === node.id;
    const isSelected = selectedProject?.id === node.id;
    const isDimmed = relatedIds !== null && !relatedIds.has(node.id);

    const basePos = useMemo(() => new THREE.Vector3(node.x, node.y, node.z), [node.x, node.y, node.z]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (group.current) {
            group.current.position.set(
                basePos.x,
                basePos.y + Math.sin(t * 0.5 + seed) * 0.25,
                basePos.z + Math.cos(t * 0.4 + seed) * 0.15
            );
        }
        const targetScale = isHovered || isSelected ? 1.35 : 1;
        if (mesh.current) {
            mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
        }
        if (material.current) {
            const targetIntensity = isHovered || isSelected ? 2.2 : isDimmed ? 0.25 : 1.1;
            material.current.emissiveIntensity = THREE.MathUtils.lerp(
                material.current.emissiveIntensity,
                targetIntensity,
                0.12
            );
            const targetOpacity = isDimmed ? 0.25 : 1;
            material.current.opacity = THREE.MathUtils.lerp(material.current.opacity, targetOpacity, 0.12);
        }
    });

    return (
        <group ref={group}>
            <mesh
                ref={mesh}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredNode(node);
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredNode(null);
                    document.body.style.cursor = "auto";
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    selectProject(isSelected ? null : node);
                }}
            >
                <icosahedronGeometry args={[radius, 2]} />
                <meshStandardMaterial
                    ref={material}
                    color={ACCENT}
                    emissive={ACCENT}
                    emissiveIntensity={1.1}
                    roughness={0.25}
                    metalness={0.4}
                    transparent
                    opacity={1}
                />
            </mesh>

            {/* Frontière Suspense locale : un chargement de police lent/bloqué ne doit
                jamais masquer tout le graphe (cf. la Suspense globale dans World3D).
                Billboard : le libellé fait toujours face à la caméra, quel que soit
                l'angle d'orbite — sans ça le texte est un plan fixe dans l'espace 3D
                et devient illisible (vu de tranche) dès qu'on tourne autour. */}
            <Suspense fallback={null}>
                <Billboard position={[0, -radius - 0.75, 0]}>
                    <Text
                        fontSize={0.75}
                        color={isDimmed ? ACCENT_DIM : "#ffffff"}
                        anchorX="center"
                        anchorY="top"
                        outlineWidth={0.04}
                        outlineColor="#04070a"
                        outlineOpacity={1}
                    >
                        {node.label}
                    </Text>
                </Billboard>
            </Suspense>
        </group>
    );
}
