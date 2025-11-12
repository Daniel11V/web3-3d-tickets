"use client";

import { TEvent } from "@/models/event";

// --- INICIO: Código 3D Comentado ---
// Hemos comentado todas las importaciones de R3F y Three.js
// para detener el error de build de 'BatchedMesh'.

// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Text,
//   Float,
//   OrbitControls,
//   SpotLight,
// } from "@react-three/drei";
// import { Mesh, SpotLight as SpotLightType, Vector3 } from "three";
// --- FIN: Código 3D Comentado ---

// 1. Mantenemos la interfaz de props que espera 'page.tsx'
interface ThreeSceneProps {
	event: TEvent;
}

// 2. Componente de reemplazo (CSS Puro con Tailwind)
export default function ThreeScene({ event }: ThreeSceneProps) {
	return (
		// Contenedor principal que centra el ticket
		<div className="w-full h-full flex items-center justify-center p-4">
			{/* El Ticket CSS */}
			<div
				className="
          w-full max-w-sm h-56 
          bg-gray-800/80 backdrop-blur-sm 
          rounded-2xl 
          shadow-2xl shadow-teal-500/10 
          ring-1 ring-white/10
          flex flex-col justify-center items-center 
          p-6
          transition-all duration-300 ease-in-out
          hover:shadow-teal-400/20 hover:ring-white/20
          hover:scale-105
          cursor-pointer
        "
			>
				<h3 className="text-2xl font-bold text-white text-center mb-4">
					{event.name}
				</h3>

				<div className="border-t border-dashed border-gray-600 w-full my-2"></div>

				<p className="text-lg font-mono text-teal-400 mt-2">
					CODE: {event.code}
				</p>
			</div>
		</div>

		/* --- INICIO: Implementación de Canvas 3D comentada ---
    <Canvas
      style={{ height: "100%", width: "100%" }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <TicketCard event={event} />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
    --- FIN: Implementación de Canvas 3D comentada ---
    */
	);
}

// --- INICIO: Componente TicketCard 3D comentado ---
/*
function TicketCard({ event }: ThreeSceneProps) {
  const meshRef = useRef<Mesh>(null!);
  const spotLightRef = useRef<SpotLightType>(null!);

  useFrame((state) => {
    if (spotLightRef.current) {
      const targetPosition = new Vector3(
        state.pointer.x * 5,
        state.pointer.y * 5,
        spotLightRef.current.target.position.z
      );
      spotLightRef.current.target.position.lerp(targetPosition, 0.1);
      spotLightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.3, 2.1, 0.05]} />
        <meshStandardMaterial
          color="#1A202C"
          metalness={0.8}
          roughness={0.3}
        />
        <Text
          position={[0, 0.3, 0.026]}
          fontSize={0.25}
          color="#E2E8F0"
          anchorX="center"
          anchorY="middle"
        >
          {event.name}
        </Text>
        <Text
          position={[0, -0.3, 0.026]}
          fontSize={0.15}
          color="#0d9488"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff"
        >
          CODE: {event.code}
        </Text>
      </mesh>
      <SpotLight
        ref={spotLightRef}
        penumbra={1}
        distance={20}
        angle={0.8}
        attenuation={5}
        anglePower={5}
        intensity={100}
        color="#0D9488"
        position={[0, 5, 5]}
      />
    </Float>
  );
}
*/
// --- FIN: Componente TicketCard 3D comentado ---
