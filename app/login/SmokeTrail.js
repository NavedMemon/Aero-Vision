"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function SmokeTrail() {
  const pointsRef = useRef();
  const maxPoints = 100;
  const positions = useMemo(() => new Float32Array(maxPoints * 3), []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const x = Math.sin(time * 1.5) * 2.5;
    const y = Math.sin(time) * 0.3;

    positions.copyWithin(3, 0);
    positions[0] = x;
    positions[1] = y;
    positions[2] = 0;

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxPoints}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00c2ff"
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}
