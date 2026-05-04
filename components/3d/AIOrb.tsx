'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Stars } from '@react-three/drei';
import * as THREE from 'three';

function PulsingCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
      meshRef.current.scale.setScalar(s);
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1} floatIntensity={0.4}>
      <Sphere ref={meshRef} args={[1.1, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1d4ed8"
          emissive="#1a40c8"
          emissiveIntensity={0.5}
          distort={0.35}
          speed={2.5}
          roughness={0}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRing({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <Ring args={[radius, radius + 0.025, 128]} >
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>
    </mesh>
  );
}

function OrbitDot({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t) * radius * Math.cos(tilt);
      ref.current.position.z = Math.sin(t) * radius * Math.sin(tilt);
    }
  });

  return (
    <group ref={ref}>
      <Sphere args={[0.08, 16, 16]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          roughness={0}
          metalness={0.5}
        />
      </Sphere>
    </group>
  );
}

export default function AIOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#3b82f6" />
      <pointLight position={[-5, -3, -3]} intensity={2} color="#dc2626" />
      <pointLight position={[0, 0, 4]} intensity={1} color="#ffffff" />

      <Stars radius={20} depth={20} count={400} factor={1} saturation={0.3} fade speed={0.3} />

      <PulsingCore />

      <OrbitRing radius={1.7} speed={0.4} tilt={0.4} color="#3b82f6" />
      <OrbitRing radius={2.2} speed={-0.25} tilt={1.2} color="#dc2626" />
      <OrbitRing radius={2.6} speed={0.18} tilt={0.9} color="#6366f1" />

      <OrbitDot radius={1.7} speed={0.8} tilt={0.4} color="#60a5fa" />
      <OrbitDot radius={1.7} speed={-0.6} tilt={0.4} color="#93c5fd" />
      <OrbitDot radius={2.2} speed={0.5} tilt={1.2} color="#f87171" />
      <OrbitDot radius={2.2} speed={-0.7} tilt={1.2} color="#fca5a5" />
      <OrbitDot radius={2.6} speed={0.35} tilt={0.9} color="#a78bfa" />
    </Canvas>
  );
}
