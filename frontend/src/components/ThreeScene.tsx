"use client";

import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function ThreeScene() {
  const cubeRef = useRef<Mesh>(null!);

  return (
    <Canvas style={{ height: "100vh", width: "100%" }}>
      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />

      {/* Cubo 3D */}
      <mesh ref={cubeRef} rotation={[0.4, 0.4, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="royalblue" />
      </mesh>
    </Canvas>
  );
}
