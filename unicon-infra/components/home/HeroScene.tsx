"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GoldParticles({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#c8a96a"
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

function GoldRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    ringRef.current.rotation.x = 1.3 + Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });
  return (
    <mesh ref={ringRef} position={[0, 0, -2]}>
      <torusGeometry args={[3.4, 0.008, 16, 200]} />
      <meshBasicMaterial color="#e4cfa0" transparent opacity={0.5} />
    </mesh>
  );
}

function InnerRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = -state.clock.elapsedTime * 0.12;
    ringRef.current.rotation.x = 1.1;
  });
  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[2.2, 0.005, 16, 200]} />
      <meshBasicMaterial color="#c8a96a" transparent opacity={0.35} />
    </mesh>
  );
}

export default function HeroScene({ particleCount = 900 }: { particleCount?: number }) {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <GoldParticles count={particleCount} />
          <GoldRing />
          <InnerRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
