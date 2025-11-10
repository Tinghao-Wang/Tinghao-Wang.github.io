"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Stars } from "@react-three/drei"
import { FloatingIsland } from "./floating-island"
import { GlowingOrb } from "./glowing-orb"
import { Rocket } from "./rocket"
import { Suspense, useEffect, useRef } from "react"
import * as THREE from "three"

interface SceneProps {
  currentSection: number
  cameraPositions: Array<[number, number, number]>
  orbPositions: Array<[number, number, number]>
}

function SceneContent({ currentSection, cameraPositions, orbPositions }: SceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const controlsRef = useRef<any>(null)
  const spotlightRef = useRef<THREE.SpotLight>(null)
  const spotlightTargetRef = useRef(new THREE.Object3D())

  const computeSpotlightPosition = (cameraPosition: THREE.Vector3, targetPosition: THREE.Vector3) => {
    const cameraDirection = cameraPosition.clone().sub(targetPosition)
    const heightOffset = Math.max(cameraDirection.length() * 0.35, 2.5)
    const distanceOffset = Math.max(cameraDirection.length() * 0.6, 3.5)

    if (cameraDirection.length() === 0) {
      return targetPosition.clone().add(new THREE.Vector3(0, heightOffset, 0))
    }

    const direction = cameraDirection.normalize().multiplyScalar(distanceOffset)
    return targetPosition.clone().add(direction).add(new THREE.Vector3(0, heightOffset, 0))
  }

  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      const targetPos = new THREE.Vector3(...cameraPositions[currentSection])
      const currentPos = cameraRef.current.position.clone()
      const startTarget = controlsRef.current.target.clone()
      const endTarget = new THREE.Vector3(...orbPositions[currentSection])
      const startSpotlightPos = spotlightRef.current ? spotlightRef.current.position.clone() : new THREE.Vector3()
      const startSpotlightTarget = spotlightTargetRef.current.position.clone()
      const endSpotlightPos = computeSpotlightPosition(targetPos, endTarget)

      // Smooth camera transition
      const duration = 1500
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease in-out
        const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

        if (cameraRef.current) {
          cameraRef.current.position.lerpVectors(currentPos, targetPos, eased)
        }

        if (controlsRef.current) {
          controlsRef.current.target.lerpVectors(startTarget, endTarget, eased)
          controlsRef.current.update()
        }

        if (spotlightRef.current) {
          spotlightRef.current.position.lerpVectors(startSpotlightPos, endSpotlightPos, eased)
          spotlightTargetRef.current.position.lerpVectors(startSpotlightTarget, endTarget, eased)
          spotlightRef.current.target = spotlightTargetRef.current
          spotlightRef.current.distance = endSpotlightPos.distanceTo(endTarget) * 1.4
          spotlightRef.current.intensity = 8 + endSpotlightPos.distanceTo(endTarget) * 0.35
          spotlightRef.current.target.updateMatrixWorld()
        }

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }, [currentSection, cameraPositions, orbPositions])

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current || !spotlightRef.current) return
    const initialPos = new THREE.Vector3(...cameraPositions[currentSection])
    cameraRef.current.position.copy(initialPos)
    const target = new THREE.Vector3(...orbPositions[currentSection])
    controlsRef.current.target.copy(target)
    controlsRef.current.update()
    const initialSpotlightPos = computeSpotlightPosition(initialPos, target)
    spotlightRef.current.position.copy(initialSpotlightPos)
    spotlightTargetRef.current.position.copy(target)
    spotlightRef.current.target = spotlightTargetRef.current
    spotlightRef.current.distance = initialSpotlightPos.distanceTo(target) * 1.4
    spotlightRef.current.intensity = 8 + initialSpotlightPos.distanceTo(target) * 0.35
    spotlightRef.current.target.updateMatrixWorld()
  }, [])

  return (
    <>
      <color attach="background" args={["#050218"]} />
      <PerspectiveCamera ref={cameraRef} makeDefault position={cameraPositions[0]} fov={50} />
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 6}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[25, 30, 20]} intensity={1.2} castShadow color="#ffd9a5" />
      <directionalLight position={[-20, 12, -15]} intensity={0.4} color="#9bb7ff" />
      <hemisphereLight args={["#8ec5ff", "#88cc77", 0.4]} />
      <Stars
        radius={140}
        depth={80}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.35}
      />
      <spotLight
        ref={spotlightRef}
        angle={Math.PI / 1}
        penumbra={0.75}
        distance={40}
        decay={1.2}
        intensity={12}
        power={1800}
        color="#fff3d6"
        castShadow
      >
        <primitive object={spotlightTargetRef.current} />
      </spotLight>

      <Suspense fallback={null}>
        <Environment preset="night" />
        <FloatingIsland />
        <GlowingOrb targetPosition={orbPositions[currentSection]} />
        <Rocket currentSection={currentSection} />
      </Suspense>

    </>
  )
}

export function Scene({ currentSection, cameraPositions, orbPositions }: SceneProps) {
  return (
    <Canvas shadows className="w-full h-screen">
      <SceneContent currentSection={currentSection} cameraPositions={cameraPositions} orbPositions={orbPositions} />
    </Canvas>
  )
}
