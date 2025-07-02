"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import SmokeTrail from "./SmokeTrail";
import "./airplaneCanvas.css";

function AirplaneModel() {
  const { scene } = useGLTF("/models/airplane.gltf");
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = 1.5;
    const amplitude = 2.5;
    const x = Math.sin(t * speed) * amplitude;
    const y = Math.sin(t) * 0.3;

    modelRef.current.position.set(x, y, 0);
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[0.8, 0.8, 0.8]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

export default function AirplaneCanvas() {
  return (
    <div className="airplane-canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <SmokeTrail />
        <AirplaneModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
