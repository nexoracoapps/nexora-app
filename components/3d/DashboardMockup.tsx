'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

function Screen({ position, rotation, color, label }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  label: string;
}) {
  return (
    <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.1}>
      <group position={position} rotation={rotation}>
        {/* Screen frame */}
        <RoundedBox args={[2.4, 1.5, 0.08]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#0f1120" roughness={0.3} metalness={0.8} />
        </RoundedBox>

        {/* Screen glow */}
        <RoundedBox args={[2.15, 1.28, 0.01]} radius={0.04} smoothness={4} position={[0, 0, 0.045]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.25}
            roughness={0.9}
            transparent
            opacity={0.95}
          />
        </RoundedBox>

        {/* UI bar at top */}
        <RoundedBox args={[2.0, 0.12, 0.015]} radius={0.02} smoothness={4} position={[0, 0.52, 0.055]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </RoundedBox>

        {/* Fake chart bars */}
        {[[-0.6, 0.2], [-0.3, 0.38], [0, 0.28], [0.3, 0.45], [0.6, 0.32]].map(([x, h], i) => (
          <RoundedBox
            key={i}
            args={[0.18, h, 0.015]}
            radius={0.02}
            smoothness={4}
            position={[x, -0.2 + h / 2, 0.055]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? '#3b82f6' : '#dc2626'}
              emissive={i % 2 === 0 ? '#3b82f6' : '#dc2626'}
              emissiveIntensity={0.6}
            />
          </RoundedBox>
        ))}

        {/* Stat pills */}
        {[[-0.65, -0.56], [0, -0.56], [0.65, -0.56]].map(([x, y], i) => (
          <RoundedBox key={i} args={[0.5, 0.18, 0.015]} radius={0.04} smoothness={4} position={[x, y, 0.055]}>
            <meshStandardMaterial
              color="#1d2035"
              emissive={i === 1 ? '#1d4ed8' : '#7f1d1d'}
              emissiveIntensity={0.3}
            />
          </RoundedBox>
        ))}
      </group>
    </Float>
  );
}

function FloatingCard({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={1.5} floatIntensity={0.8}>
        <RoundedBox args={[1.1, 0.7, 0.07]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#161828" roughness={0.4} metalness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.9, 0.08, 0.012]} radius={0.02} smoothness={4} position={[0, 0.22, 0.042]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.06, 0.01]} radius={0.02} smoothness={4} position={[0, 0.08, 0.042]}>
          <meshStandardMaterial color="#1d2035" emissive="#3b82f6" emissiveIntensity={0.2} />
        </RoundedBox>
        <RoundedBox args={[0.55, 0.06, 0.01]} radius={0.02} smoothness={4} position={[-0.08, -0.05, 0.042]}>
          <meshStandardMaterial color="#1d2035" emissive="#7f1d1d" emissiveIntensity={0.2} />
        </RoundedBox>
      </Float>
    </group>
  );
}

function SceneGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main screen */}
      <Screen
        position={[0, 0.2, 0]}
        rotation={[0.05, 0, 0]}
        color="#0a1628"
        label="Dashboard"
      />
      {/* Side screens */}
      <Screen
        position={[-2.2, -0.3, -0.8]}
        rotation={[0, 0.45, 0]}
        color="#120a10"
        label="Analytics"
      />
      <Screen
        position={[2.2, -0.3, -0.8]}
        rotation={[0, -0.45, 0]}
        color="#0a1628"
        label="Reports"
      />

      {/* Floating cards */}
      <FloatingCard position={[-1.4, 1.2, 0.5]} color="#1d4ed8" />
      <FloatingCard position={[1.4, 1.1, 0.3]} color="#7f1d1d" />
      <FloatingCard position={[0, -1.3, 0.6]} color="#1d4ed8" />
    </group>
  );
}

export default function DashboardMockup() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 6]} intensity={2.5} color="#3b82f6" />
      <pointLight position={[-4, -2, 4]} intensity={2} color="#dc2626" />
      <pointLight position={[0, 6, 2]} intensity={1.5} color="#ffffff" />

      <SceneGroup />
    </Canvas>
  );
}
