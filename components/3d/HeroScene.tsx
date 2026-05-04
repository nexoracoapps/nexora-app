'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Trail, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Floating glowing orb ── */
function GlowOrb({
  position,
  color,
  size = 0.4,
  speed = 1,
  distort = 0.4,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
  distort?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

/* ── Animated neural network nodes ── */
function NeuralNet() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 18; i++) {
      pts.push([
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
      ]);
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const lines: [[number, number, number], [number, number, number]][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.4) lines.push([nodes[i], nodes[j]]);
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const start = new THREE.Vector3(...a);
        const end = new THREE.Vector3(...b);
        const mid = start.clone().lerp(end, 0.5);
        const len = start.distanceTo(end);
        const dir = end.clone().sub(start).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir
        );
        const isBlue = i % 3 !== 0;
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.008, 0.008, len, 6]} />
            <meshBasicMaterial
              color={isBlue ? '#1d4ed8' : '#7f1d1d'}
              transparent
              opacity={0.35}
            />
          </mesh>
        );
      })}
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.3}>
          <Sphere args={[0.07 + Math.random() * 0.06, 16, 16]} position={pos}>
            <meshStandardMaterial
              color={i % 3 === 0 ? '#dc2626' : '#3b82f6'}
              emissive={i % 3 === 0 ? '#dc2626' : '#3b82f6'}
              emissiveIntensity={0.8}
              roughness={0.1}
              metalness={0.5}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

/* ── Rotating torus knot ── */
function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <Float speed={0.8} floatIntensity={0.6} rotationIntensity={0.2}>
      <mesh ref={meshRef} position={[2.8, 0, -1]}>
        <torusKnotGeometry args={[0.7, 0.22, 128, 16]} />
        <meshStandardMaterial
          color="#1d4ed8"
          emissive="#1a40a8"
          emissiveIntensity={0.3}
          roughness={0.15}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Icosahedron ── */
function IcoSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-3.2, 0.5, -0.5]}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color="#7f1d1d"
          emissive="#6b1212"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.7}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Main exported Canvas ── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#dc2626" />
      <pointLight position={[0, 5, 2]} intensity={1} color="#ffffff" />

      <Stars
        radius={30}
        depth={30}
        count={800}
        factor={1.2}
        saturation={0.5}
        fade
        speed={0.5}
      />

      <NeuralNet />
      <TorusKnot />
      <IcoSphere />

      <GlowOrb position={[0, 2.5, 0]} color="#1d4ed8" size={0.3} speed={1.4} />
      <GlowOrb position={[-1.5, -1.8, 1]} color="#dc2626" size={0.22} speed={0.9} distort={0.6} />
      <GlowOrb position={[2, -1.5, 0.5]} color="#3b82f6" size={0.18} speed={1.8} />
    </Canvas>
  );
}
