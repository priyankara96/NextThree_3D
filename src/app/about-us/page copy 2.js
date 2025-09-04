"use client";

import React, { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// --- Model Component ---
function Model(props) {
  // Only load the 'scene' from the GLB. This always works.
  const { scene } = useGLTF("/models/car.glb");
  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  );
}
useGLTF.preload("/models/car.glb");

// --- Class Component Wrapper ---
class ThreeScene extends Component {
  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas camera={{ position: [-8.13, 2.5, -4.14], fov: 50 }} shadows>
          {/* Your original light setup */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Model />
          {/* Extra Lights */}
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1.5}
            castShadow
          />
          <directionalLight position={[-10, 5, -10]} intensity={0.8} />
          <OrbitControls target={[-2, 1.5, 1]} enablePan={false} />
        </Canvas>
      </div>
    );
  }
}

export default ThreeScene;
