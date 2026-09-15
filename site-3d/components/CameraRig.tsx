"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControlsImpl } from "./World3D";
import { useGraphContext } from "./GraphContext";
import { defaultFraming } from "@/lib/defaultFraming";
import { graphLayout } from "@/lib/graphLayout";

const DEFAULT_CAMERA_POSITION = new THREE.Vector3(...defaultFraming.position);
const DEFAULT_TARGET = new THREE.Vector3(...defaultFraming.target);
// Distance de "vol" vers un nœud sélectionné, proportionnelle à la taille
// réelle du graphe plutôt qu'une valeur fixe : avec 10 projets de plus (donc
// un graphe plus étendu), le zoom de mise au point reste cohérent sans aucun
// réglage manuel.
const PROJECT_FOCUS_DISTANCE = Math.max(5, graphLayout.radius * 0.32);
// Les nœuds techno/compétence sont plus petits : on peut s'en approcher
// davantage pour bien lire leur libellé et la vignette associée.
const SKILL_FOCUS_DISTANCE = PROJECT_FOCUS_DISTANCE * 0.6;
const ARRIVAL_EPSILON = 0.05;

/**
 * Anime la caméra et la cible des OrbitControls UNIQUEMENT pendant une
 * transition explicite : vers le nœud (projet OU techno/compétence) qui
 * vient d'être sélectionné, ou vers la vue d'ensemble quand rien n'est
 * sélectionné. Une fois la cible atteinte, la boucle cesse totalement de
 * toucher la caméra — les OrbitControls reprennent la main à 100% pour
 * l'orbite/zoom/pan libres (sans ce garde-fou, un lerp permanent "vers la
 * position par défaut" annulerait en continu toute rotation manuelle de
 * l'utilisateur).
 */
export function CameraRig({ controlsRef }: { controlsRef: RefObject<OrbitControlsImpl> }) {
    const { selectedProject, highlightedNode } = useGraphContext();
    const focusNode = selectedProject ?? highlightedNode;
    const { camera } = useThree();
    const desiredCamPos = useRef(new THREE.Vector3());
    const desiredTarget = useRef(new THREE.Vector3());
    const transitioning = useRef(false);

    useEffect(() => {
        transitioning.current = true;
    }, [selectedProject, highlightedNode]);

    useFrame(() => {
        const controls = controlsRef.current;
        if (!controls || !transitioning.current) return;

        if (focusNode) {
            const nodePos = new THREE.Vector3(focusNode.x, focusNode.y, focusNode.z);
            const dir = nodePos.lengthSq() > 0.0001 ? nodePos.clone().normalize() : new THREE.Vector3(0, 0, 1);
            const isProject = focusNode.type === "projet";
            const focusDistance = isProject ? PROJECT_FOCUS_DISTANCE : SKILL_FOCUS_DISTANCE;

            desiredCamPos.current
                .copy(nodePos)
                .add(dir.multiplyScalar(focusDistance))
                .add(new THREE.Vector3(0, focusDistance * 0.17, 0));

            if (isProject) {
                // Le panneau d'info (InfoPanel) occupe la partie droite de l'écran.
                // On décale le point de mire vers la droite du nœud : la caméra vise
                // alors un peu à côté, ce qui fait apparaître le nœud dans la zone
                // gauche encore visible plutôt que masqué derrière le panneau.
                const viewDir = nodePos.clone().sub(desiredCamPos.current).normalize();
                const worldUp = new THREE.Vector3(0, 1, 0);
                const right = new THREE.Vector3().crossVectors(viewDir, worldUp).normalize();
                desiredTarget.current.copy(nodePos).add(right.multiplyScalar(focusDistance * 0.32));
            } else {
                // La vignette d'une compétence est un petit encart 3D ancré près du
                // nœud (pas un panneau fixe plein écran) : pas besoin de décalage.
                desiredTarget.current.copy(nodePos);
            }
        } else {
            desiredCamPos.current.copy(DEFAULT_CAMERA_POSITION);
            desiredTarget.current.copy(DEFAULT_TARGET);
        }

        camera.position.lerp(desiredCamPos.current, 0.08);
        controls.target.lerp(desiredTarget.current, 0.08);
        controls.update();

        const arrived =
            camera.position.distanceTo(desiredCamPos.current) < ARRIVAL_EPSILON &&
            controls.target.distanceTo(desiredTarget.current) < ARRIVAL_EPSILON;
        if (arrived) transitioning.current = false;
    });

    return null;
}
