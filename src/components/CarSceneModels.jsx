import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Road(props) {
  const { nodes, materials } = useGLTF("/models/car.glb");
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Road.geometry}
      material={materials.PaletteMaterial001}
      position={[-2.937, -0.006, 0.013]}
      scale={5.892}
      {...props}
    />
  );
}

// Animated tree sways gently left and right
export function Tree({ sway = 1, offset = 0, position, scale }) {
  const { nodes, materials } = useGLTF("/models/car.glb");
  const treeRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (treeRef.current) {
      // Z-axis sway, gentle, offset for each tree
      treeRef.current.rotation.z = Math.sin(t * 0.9 + offset) * 0.015 * sway;
    }
  });
  return (
    <mesh
      ref={treeRef}
      castShadow
      receiveShadow
      geometry={nodes.Tree_01.geometry}
      material={materials["tripo_mat_5b24e581-d9f0-451e-9dd2-44c9afa03e7b"]}
      position={position || [-3.576, 1.626, 1.197]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={scale || 4.236}
    />
  );
}

export function ToyCar({ carPos, carOpacity }) {
  const { nodes, materials } = useGLTF("/models/car.glb");
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Toy_Car.geometry}
      material={materials["tripo_mat_ba71da31-372d-45a7-80f4-f9e8b1dd4675"]}
      position={carPos}
      rotation={[Math.PI / 2, 0, -2.97]}
      scale={1.623}
      material-transparent
      material-opacity={carOpacity}
    />
  );
}

useGLTF.preload("/models/car.glb");
