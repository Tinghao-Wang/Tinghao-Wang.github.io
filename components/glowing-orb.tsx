"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface GlowingOrbProps {
  targetPosition: [number, number, number]
}

const BASE_INTENSITY = 9
const INTENSITY_VARIATION = 2.5
const BASE_SCALE = 0.45
const SCALE_VARIATION = 0.12
const LIGHT_DISTANCE = 16
const LIGHT_DECAY = 1.6

export function GlowingOrb({ targetPosition }: GlowingOrbProps) {
  const orbRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const currentPos = useRef(new THREE.Vector3(...targetPosition))
  const targetPos = useRef(new THREE.Vector3(...targetPosition))

  useFrame((state) => {
    if (orbRef.current && lightRef.current) {
      // Smooth lerp to target position
      targetPos.current.set(...targetPosition)
      currentPos.current.lerp(targetPos.current, 0.05)

      orbRef.current.position.copy(currentPos.current)
      lightRef.current.position.copy(currentPos.current)

      // Floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 2) * 0.1
      orbRef.current.position.y += floatY
      lightRef.current.position.y += floatY

      // Pulsing animation
      const pulse = BASE_SCALE + Math.sin(state.clock.elapsedTime * 3) * SCALE_VARIATION
      orbRef.current.scale.setScalar(pulse)
      lightRef.current.intensity = BASE_INTENSITY + Math.sin(state.clock.elapsedTime * 3) * INTENSITY_VARIATION
    }
  })

  return (
    <>
      <mesh ref={orbRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#66ddff" emissive="#66ddff" emissiveIntensity={2.2} transparent opacity={0.8} />
      </mesh>
      <pointLight
        ref={lightRef}
        color="#66ddff"
        intensity={BASE_INTENSITY}
        distance={LIGHT_DISTANCE}
        decay={LIGHT_DECAY}
      />
    </>
  )
}
