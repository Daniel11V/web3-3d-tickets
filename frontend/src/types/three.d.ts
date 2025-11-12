/// <reference types="@react-three/fiber" />

// Esto extiende el JSX para reconocer los elementos de Three.js usados por react-three-fiber.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      spotLight: any;
      color: any;
      primitive: any;
      group: any;
    }
  }
}

export {};
