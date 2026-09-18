"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import type { PositionedNode } from "@/lib/types";
import { useGraphContext } from "./GraphContext";

const ACCENT = "#5ec8ff";
const ACCENT_DIM = "#2b4a5c";

export function ProjectNode({ node, seed }: { node: PositionedNode; seed: number }) {
    const { hoveredNode, setHoveredNode, selectedProject, selectProject, relatedIds, typeFilter } = useGraphContext();
    const group = useRef<THREE.Group>(null);
    const mesh = useRef<THREE.Mesh>(null);
    const material = useRef<THREE.MeshStandardMaterial>(null);

    const radius = 0.85 * (node.weight ?? 1);
    const isHovered = hoveredNode?.id === node.id;
    const isSelected = selectedProject?.id === node.id;
    const isDimmed = relatedIds !== null && !relatedIds.has(node.id);
    const isFilteredOut = typeFilter !== null && typeFilter !== node.type;

    const basePos = useMemo(() => new THREE.Vector3(node.x, node.y, node.z), [node.x, node.y, node.z]);

    // Filet anti-curseur-bloqué : si ce nœud est démonté pendant un survol
    // (ex. bascule vers la vue classique en plein hover), onPointerOut ne se
    // déclenche jamais et document.body.style.cursor resterait "pointer" en
    // permanence sans ce nettoyage explicite au démontage.
    const isHoveringRef = useRef(false);
    useEffect(() => {
        return () => {
            if (isHoveringRef.current) document.body.style.cursor = "auto";
        };
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (group.current) {
            group.current.position.set(
                basePos.x,
                basePos.y + Math.sin(t * 0.5 + seed) * 0.25,
                basePos.z + Math.cos(t * 0.4 + seed) * 0.15
            );
        }
        const targetScale = isFilteredOut ? 0.001 : isHovered || isSelected ? 1.35 : 1;
        if (mesh.current) {
            // setScalar + lerp scalaire plutôt que lerp(new THREE.Vector3(...)) :
            // évite d'allouer un Vector3 à chaque nœud, à chaque frame.
            mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.15));
        }
        if (material.current) {
            const targetIntensity = isFilteredOut ? 0 : isHovered || isSelected ? 2.2 : isDimmed ? 0.25 : 1.1;
            material.current.emissiveIntensity = THREE.MathUtils.lerp(
                material.current.emissiveIntensity,
                targetIntensity,
                0.12
            );
            const targetOpacity = isFilteredOut ? 0 : isDimmed ? 0.25 : 1;
            material.current.opacity = THREE.MathUtils.lerp(material.current.opacity, targetOpacity, 0.12);
        }
    });

    return (
        <group ref={group}>
            <mesh
                ref={mesh}
                onPointerOver={(e) => {
                    if (isFilteredOut) return;
                    e.stopPropagation();
                    setHoveredNode(node);
                    isHoveringRef.current = true;
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                    if (isFilteredOut) return;
                    e.stopPropagation();
                    setHoveredNode(null);
                    isHoveringRef.current = false;
                    document.body.style.cursor = "auto";
                }}
                onClick={(e) => {
                    if (isFilteredOut) return;
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
                l'angle d'orbite - sans ça le texte est un plan fixe dans l'espace 3D
                et devient illisible (vu de tranche) dès qu'on tourne autour. */}
            <Suspense fallback={null}>
                <Billboard visible={!isFilteredOut} position={[0, -radius - 0.75, 0]}>
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
