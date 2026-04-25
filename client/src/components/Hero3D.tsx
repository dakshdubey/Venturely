"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Geometry - Transparent Glassy Sphere
        const geometry = new THREE.IcosahedronGeometry(2, 2);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x00e0eb,
            metalness: 0,
            roughness: 0.1,
            transmission: 0.9, // Glass effect
            thickness: 0.5,
            wireframe: true,
            transparent: true,
            opacity: 0.1,
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Particles - Brighter for light theme
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 3000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 12;
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.008,
            color: 0x7000ff,
            transparent: true,
            opacity: 0.4,
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00e0eb, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            sphere.rotation.x += 0.0015;
            sphere.rotation.y += 0.002;
            particlesMesh.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };

        animate();

        // Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-white" />
    );
}
