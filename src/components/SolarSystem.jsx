import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SolarSystem(props) {
    const group = useRef();

    // Orbiting system (with baked orbits)
    const { scene: orbitScene, animations } = useGLTF("/models/Orbiting solar system.glb");
    // Planet material library
    const { materials } = useGLTF("/models/Planet.glb");

    const mixerRef = useRef(null);
    const spinningPlanets = useRef([]);

    useEffect(() => {
        if (!orbitScene) return;

        // Setup AnimationMixer for baked orbits
        if (animations && animations.length) {
            const mixer = new THREE.AnimationMixer(orbitScene);
            mixerRef.current = mixer;

            animations.forEach((clip) => {
                mixer.clipAction(clip).reset().play();
            });
        }

        const goldMaterial = materials?.["Material.002"]?.clone();
        const whiteMaterial = materials?.["Material.001"]?.clone();

        let planetIndex = 0;
        spinningPlanets.current = [];

        orbitScene.traverse((child) => {
            if (!child.isMesh) return;

            const name = child.name.toLowerCase();

            // 🌞 Sun
            if (name.includes("sun") || name.includes("star") || name.includes("center")) {
                if (goldMaterial) child.material = goldMaterial;
                if (child.material) {
                    child.material.emissive = new THREE.Color(1, 0.75, 0.2);
                    child.material.emissiveIntensity = 6;
                }
                child.castShadow = true;
                child.receiveShadow = true;
                child.frustumCulled = false;
                return;
            }

            // 🪐 Planets: apply alternating materials from Planet.glb
            if (goldMaterial && whiteMaterial) {
                child.material = planetIndex % 2 === 0 ? goldMaterial : whiteMaterial;
            }

            child.castShadow = true;
            child.receiveShadow = true;
            child.frustumCulled = false;

            spinningPlanets.current.push(child);
            planetIndex++;
        });

        return () => {
            if (mixerRef.current) mixerRef.current.stopAllAction();
        };
    }, [orbitScene, animations, materials]);

    useFrame((_, delta) => {
        // Update baked Blender orbit animations
        if (mixerRef.current) mixerRef.current.update(delta);

        // Axial spin on planets only
        spinningPlanets.current.forEach((planet, i) => {
            planet.rotation.y += delta * (0.3 + i * 0.05);
        });
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={orbitScene} />
        </group>
    );
}

useGLTF.preload("/models/Orbiting solar system.glb");
useGLTF.preload("/models/Planet.glb");
