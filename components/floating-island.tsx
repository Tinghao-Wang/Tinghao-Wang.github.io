"use client"

import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const MODEL_PATH = "/models/floating-island.glb"

useGLTF.preload(MODEL_PATH)

export function FloatingIsland() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)
  const baseRotation = useRef(Math.PI * 1.5)
  const basePosition = useRef(new THREE.Vector3(-15, -1.5, 0))

  useEffect(() => {
    scene.traverse((child) => {
      if ("castShadow" in child) {
        child.castShadow = true
      }
      if ("receiveShadow" in child) {
        child.receiveShadow = true
      }
    })
  }, [scene])

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = baseRotation.current
      groupRef.current.position.copy(basePosition.current)
    }
  }, [])

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      groupRef.current.rotation.y = baseRotation.current + Math.sin(time * 0.05) * 0.08
      groupRef.current.position.y = basePosition.current.y + Math.sin(time * 0.3) * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={12} dispose={null} />
    </group>
  )
}
