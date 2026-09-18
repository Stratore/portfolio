"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cameraSignal } from "@/lib/cameraSignal";

/** Écrit la position/orientation caméra dans cameraSignal à chaque frame - ne rend rien. */
export function MiniMapTracker() {
    const { camera } = useThree();
    const dir = useRef(new THREE.Vector3());

    useFrame(() => {
        camera.getWorldDirection(dir.current);
        cameraSignal.x = camera.position.x;
        cameraSignal.y = camera.position.y;
        cameraSignal.z = camera.position.z;
        cameraSignal.dirX = dir.current.x;
        cameraSignal.dirZ = dir.current.z;
    });

    return null;
}
