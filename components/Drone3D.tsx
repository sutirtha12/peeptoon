"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const BODY = "#dce1ea";
const GREY = "#bcc3cf";
const NAVY = "#1c2a44";
const ORANGE = "#f4892a";
const GREEN = "#27b552";
const GOLD = "#d4af37";
const KRAFT = "#c79f63";
const TAPE = "#ddc190";

function Rotor({ position }: { position: [number, number, number] }) {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (blades.current) blades.current.rotation.y += dt * 34;
  });
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.52, 0.06, 16, 50]} />
        <meshStandardMaterial color={GREY} metalness={0.25} roughness={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.52, 0.02, 12, 50]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.35} metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.12, 24]} />
        <meshStandardMaterial color={NAVY} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.15, 24]} />
        <meshStandardMaterial color={ORANGE} metalness={0.55} roughness={0.35} />
      </mesh>
      <group ref={blades} position={[0, 0.12, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
            <boxGeometry args={[0.96, 0.018, 0.11]} />
            <meshStandardMaterial color={GREY} transparent opacity={0.45} metalness={0.2} roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function DroneModel() {
  const root = useRef<THREE.Group>(null);
  const box = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) root.current.rotation.y = -0.35 + Math.sin(t * 0.3) * 0.12;
    if (box.current) box.current.rotation.z = Math.sin(t * 0.8) * 0.04;
  });

  const rotorPos: [number, number, number][] = [
    [1.1, 0.06, 1.1],
    [1.1, 0.06, -1.1],
    [-1.1, 0.06, 1.1],
    [-1.1, 0.06, -1.1],
  ];

  return (
    <group ref={root} rotation={[0.12, -0.4, 0]}>
      {[Math.PI / 4, -Math.PI / 4].map((ry, i) => (
        <mesh key={i} rotation={[0, ry, 0]} position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[3.1, 0.12, 0.22]} />
          <meshStandardMaterial color={GREY} metalness={0.25} roughness={0.5} />
        </mesh>
      ))}

      <RoundedBox args={[1.75, 0.44, 1.15]} radius={0.15} smoothness={4} castShadow>
        <meshStandardMaterial color={BODY} metalness={0.3} roughness={0.42} />
      </RoundedBox>
      <RoundedBox args={[1.02, 0.38, 0.64]} radius={0.13} smoothness={4} position={[0, 0.21, 0.04]}>
        <meshStandardMaterial color={NAVY} metalness={0.45} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.07, 0.585]}>
        <boxGeometry args={[1.35, 0.08, 0.03]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.6} />
      </mesh>
      {([[1.5, 0.06, 0.0], [-1.5, 0.06, 0.0]] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07, 14, 14]} />
          <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.07, -0.585]}>
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.9} />
      </mesh>

      {/* camera gimbal */}
      <group position={[0, -0.32, 0.3]}>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.12]} />
          <meshStandardMaterial color={GREY} metalness={0.45} roughness={0.4} />
        </mesh>
        <mesh castShadow>
          <sphereGeometry args={[0.26, 26, 26]} />
          <meshStandardMaterial color={NAVY} metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.04, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.13, 0.2, 26]} />
          <meshStandardMaterial color="#10151f" metalness={0.65} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.04, 0.29]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.12, 0.022, 14, 30]} />
          <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.5} metalness={0.55} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.04, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 22]} />
          <meshStandardMaterial color="#9fe6ff" emissive="#2a90b8" emissiveIntensity={0.35} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {rotorPos.map((p, i) => (
        <Rotor key={i} position={p} />
      ))}

      {([[0.58, 0.38], [-0.58, 0.38], [0.58, -0.38], [-0.58, -0.38]] as [number, number][]).map(
        ([x, z], i) => (
          <mesh key={i} position={[x, -0.78, z]} rotation={[0, 0, x > 0 ? 0.04 : -0.04]}>
            <cylinderGeometry args={[0.015, 0.015, 1.1, 8]} />
            <meshStandardMaterial color="#9aa1ad" metalness={0.3} roughness={0.6} />
          </mesh>
        )
      )}

      <group ref={box} position={[0, -1.85, 0]}>
        <RoundedBox args={[1.25, 1.08, 1.08]} radius={0.04} smoothness={3} castShadow>
          <meshStandardMaterial color={KRAFT} roughness={0.82} metalness={0.04} />
        </RoundedBox>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.24, 0.02, 1.1]} />
          <meshStandardMaterial color={TAPE} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.55]}>
          <boxGeometry args={[0.24, 1.1, 0.02]} />
          <meshStandardMaterial color={TAPE} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.16, 0.555]}>
          <boxGeometry args={[0.56, 0.36, 0.008]} />
          <meshStandardMaterial color="#fbf8f1" roughness={0.6} />
        </mesh>
        <mesh position={[-0.05, 0.24, 0.56]}>
          <boxGeometry args={[0.4, 0.045, 0.006]} />
          <meshStandardMaterial color={GOLD} metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[-0.11, 0.14, 0.56]}>
          <boxGeometry args={[0.26, 0.03, 0.006]} />
          <meshStandardMaterial color="#a39a86" roughness={0.6} />
        </mesh>
        <mesh position={[0.14, 0.1, 0.56]}>
          <boxGeometry args={[0.16, 0.11, 0.006]} />
          <meshStandardMaterial color="#1c1a16" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function Drone3D() {
  return (
    <Canvas
      shadows
      camera={{ position: [1.2, 0.6, 6.8], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#ffffff", "#e7decb", 0.7]} />
      <directionalLight position={[5, 9, 6]} intensity={1.7} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 3, 2]} intensity={0.5} color="#ffe6b8" />
      <Float speed={1.3} rotationIntensity={0.22} floatIntensity={0.8}>
        <DroneModel />
      </Float>
      <ContactShadows position={[0, -3.2, 0]} opacity={0.32} scale={11} blur={2.6} far={6} color="#15233b" />
    </Canvas>
  );
}
