'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox, Torus, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  useMemo(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener('mousemove', onMove);
    return () => canvas.removeEventListener('mousemove', onMove);
  }, [gl]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.4 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

function CentralDevice() {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <Float speed={1.4} floatIntensity={0.4} rotationIntensity={0.05}>
      <group>
        {/* Laptop base */}
        <RoundedBox args={[3.2, 0.12, 2.0]} radius={0.06} smoothness={6} position={[0, -0.86, 0.3]}>
          <meshStandardMaterial color="#0d0f1e" metalness={0.9} roughness={0.15} />
        </RoundedBox>
        {/* Hinge */}
        <mesh position={[0, -0.78, -0.68]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 3.0, 16]} />
          <meshStandardMaterial color="#1a1d30" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Screen panel */}
        <group position={[0, 0.18, -0.68]} rotation={[-0.18, 0, 0]}>
          <RoundedBox args={[3.2, 2.0, 0.1]} radius={0.07} smoothness={6}>
            <meshStandardMaterial color="#080a14" metalness={0.85} roughness={0.2} />
          </RoundedBox>
          {/* Screen glow */}
          <RoundedBox ref={screenRef} args={[2.9, 1.75, 0.01]} radius={0.04} smoothness={6} position={[0, 0, 0.056]}>
            <meshStandardMaterial
              color="#050818"
              emissive="#1d4ed8"
              emissiveIntensity={0.3}
              roughness={1}
            />
          </RoundedBox>
          {/* UI header bar */}
          <RoundedBox args={[2.75, 0.1, 0.012]} radius={0.02} smoothness={4} position={[0, 0.76, 0.063]}>
            <meshStandardMaterial color="#1d4ed8" emissive="#3b82f6" emissiveIntensity={0.8} />
          </RoundedBox>
          {/* Sidebar */}
          <RoundedBox args={[0.45, 1.5, 0.01]} radius={0.02} smoothness={4} position={[-1.12, -0.02, 0.063]}>
            <meshStandardMaterial color="#0a0e20" emissive="#1d4ed8" emissiveIntensity={0.15} />
          </RoundedBox>
          {/* Chart area */}
          {[0, 1, 2, 3, 4].map((i) => {
            const heights = [0.35, 0.55, 0.42, 0.65, 0.48];
            const h = heights[i];
            return (
              <RoundedBox
                key={i}
                args={[0.22, h, 0.012]}
                radius={0.03}
                smoothness={4}
                position={[-0.45 + i * 0.42, -0.38 + h / 2, 0.063]}
              >
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#1d4ed8' : '#7f1d1d'}
                  emissive={i % 2 === 0 ? '#3b82f6' : '#dc2626'}
                  emissiveIntensity={0.7}
                />
              </RoundedBox>
            );
          })}
          {/* Stat cards */}
          {[-0.7, 0.1, 0.9].map((x, i) => (
            <RoundedBox key={i} args={[0.58, 0.28, 0.012]} radius={0.04} smoothness={4} position={[x, 0.36, 0.063]}>
              <meshStandardMaterial
                color="#0d1225"
                emissive={i === 1 ? '#1d4ed8' : '#7f1d1d'}
                emissiveIntensity={0.25}
              />
            </RoundedBox>
          ))}
          {/* Camera dot */}
          <mesh position={[0, 0.92, 0.062]}>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshStandardMaterial color="#1d4ed8" emissive="#3b82f6" emissiveIntensity={1} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function OrbitRing({ radius, speed, color, tilt }: { radius: number; speed: number; color: string; tilt: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <Torus args={[radius, 0.012, 8, 80]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
        </Torus>
        {/* Orbiting dot */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingDataNode({ position, color, size = 0.12 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  return (
    <Float speed={2} floatIntensity={0.6} rotationIntensity={0.3}>
      <mesh position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 60;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#3b82f6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[2.6, 1.2, 0]}>
      <sphereGeometry args={[0.32, 32, 32]} />
      <MeshDistortMaterial
        color="#1d4ed8"
        emissive="#3b82f6"
        emissiveIntensity={0.6}
        distort={0.4}
        speed={2}
        metalness={0.4}
        roughness={0.2}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <MouseTracker>
      <Particles />
      <CentralDevice />
      <OrbitRing radius={2.1} speed={0.35} color="#3b82f6" tilt={[0.4, 0.1, 0]} />
      <OrbitRing radius={2.7} speed={-0.22} color="#dc2626" tilt={[1.1, 0.3, 0.2]} />
      <OrbitRing radius={1.6} speed={0.55} color="#7f1d1d" tilt={[0.2, 0.8, 0.1]} />
      <FloatingDataNode position={[-2.8, 1.0, 0.3]} color="#3b82f6" size={0.14} />
      <FloatingDataNode position={[2.9, -0.6, 0.2]} color="#dc2626" size={0.11} />
      <FloatingDataNode position={[-1.8, -1.5, 0.5]} color="#3b82f6" size={0.09} />
      <FloatingDataNode position={[1.5, 1.6, -0.3]} color="#7f1d1d" size={0.12} />
      <CoreOrb />
    </MouseTracker>
  );
}

export default function DashboardMockup() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 4, 5]} intensity={3} color="#3b82f6" />
      <pointLight position={[-5, -3, 3]} intensity={2.5} color="#dc2626" />
      <pointLight position={[0, 6, 2]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -4, 4]} intensity={1.2} color="#1d4ed8" />
      <Scene />
    </Canvas>
  );
}
