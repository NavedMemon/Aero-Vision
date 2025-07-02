"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function AirplaneModel() {
  const { scene } = useGLTF("/models/airplane.gltf"); // or .glb
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Floating animation
    modelRef.current.position.y = Math.sin(t) * 0.2;

    // Slow rotation animation
    modelRef.current.rotation.y += 0.002;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[0.8, 0.8, 0.8]} // 🔍 Smaller size
      position={[0, -0.5, 0]} // 🔼 Lowered slightly
      rotation={[0.1, Math.PI, 0.1]} // ↩️ Angled for style
    />
  );
}

export default function AirplaneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 70] }}
      style={{ width: "100%", height: "80%" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <AirplaneModel />
      {/* Optional: disable controls if not needed */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}
