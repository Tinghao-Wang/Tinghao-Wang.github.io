import { useEffect, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Sparkles, useGLTF } from "@react-three/drei"
import * as THREE from "three"

type AnimationState = "entering" | "idle" | "exiting" | "hidden"

interface RocketProps {
  currentSection: number
}

const entranceStart = new THREE.Vector3(-60, 5, -18)
const entranceTarget = new THREE.Vector3(-30, 15, -8)
const exitTarget = new THREE.Vector3(10, 60, -26)

const modelRotationOffset = new THREE.Euler(0, THREE.MathUtils.degToRad(270), 0)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInCubic = (t: number) => t * t * t

export function Rocket({ currentSection }: RocketProps) {
  const rocketRef = useRef<THREE.Group>(null)
  const [animationState, setAnimationState] = useState<AnimationState>("entering")
  const progressRef = useRef(0)
  const previousSectionRef = useRef(currentSection)
  const { scene } = useGLTF("/models/cute rocket 3d model.glb")
  const engineGlowRefs = useRef<Array<THREE.Mesh | null>>([])
  const thrusterOffsets = useMemo<Array<[number, number, number]>>(
    () => [
      [0, -0.46, 0.02],
      [0.12, -0.48, 0.12],
      [-0.12, -0.48, 0.12],
    ],
    [],
  )

  const engineLightRef = useRef<THREE.PointLight>(null)
  const rimLightRef = useRef<THREE.PointLight>(null)
  const orbitRefs = useRef<Array<THREE.Group | null>>([])
  const orbitSphereRefs = useRef<Array<THREE.Mesh | null>>([])
  const orbitLightRefs = useRef<Array<THREE.PointLight | null>>([])

  const orbitConfigs = useMemo(
    () => [
      {
        radius: 0.85,
        height: 0.42,
        speed: 0.9,
        offset: 0,
        color: "#ff6b81",
        lightColor: "#ff84a1",
        baseScale: 0.14,
        baseIntensity: 2.8,
        intensityVariance: 0.9,
      },
      {
        radius: 1.1,
        height: 0.16,
        speed: -0.65,
        offset: Math.PI * 0.6,
        color: "#63ff7c",
        lightColor: "#6bffc6",
        baseScale: 0.18,
        baseIntensity: 2.4,
        intensityVariance: 0.7,
      },
    ],
    [],
  )

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    scene.rotation.copy(modelRotationOffset)
  }, [scene])

  const resetToEntrance = () => {
    if (!rocketRef.current) return
    rocketRef.current.visible = true
    rocketRef.current.position.copy(entranceStart)
    rocketRef.current.rotation.set(0, Math.PI / 4, -Math.PI / 4)
    progressRef.current = 0
    setAnimationState("entering")
  }

  useEffect(() => {
    resetToEntrance()
  }, [])

  useEffect(() => {
    const prev = previousSectionRef.current
    previousSectionRef.current = currentSection

    if (!rocketRef.current) return

    if (currentSection === 0 && prev !== 0) {
      resetToEntrance()
      return
    }

    if (currentSection > 0 && prev === 0) {
      progressRef.current = 0
      setAnimationState("exiting")
    }
  }, [currentSection])

  useFrame((state, delta) => {
    if (!rocketRef.current) {
      return
    }

    const rocket = rocketRef.current
    const time = state.clock.elapsedTime

    engineGlowRefs.current.forEach((glow, index) => {
      if (!glow) return
      const pulse = 1 + Math.sin(time * 8 + index) * 0.24
      glow.scale.set(1.05 + pulse * 0.25, 1.6 + pulse * 0.4, 1.05 + pulse * 0.25)
      if (!Array.isArray(glow.material)) {
        const material = glow.material as THREE.MeshBasicMaterial
        material.opacity = THREE.MathUtils.clamp(0.4 + Math.sin(time * 6 + index) * 0.28, 0.18, 0.78)
      }
    })

    if (engineLightRef.current) {
      engineLightRef.current.intensity = 11 + Math.sin(time * 5) * 4.5
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = 4 + Math.sin(time * 2.4) * 1.5
    }

    orbitRefs.current.forEach((orbit, index) => {
      if (!orbit) return
      const config = orbitConfigs[index]
      if (!config) return
      const angle = time * config.speed + config.offset
      const bob = Math.sin(time * 1.8 + index) * 0.08
      orbit.position.set(Math.cos(angle) * config.radius, config.height + bob, Math.sin(angle) * config.radius)
      orbit.rotation.y = angle
    })

    orbitSphereRefs.current.forEach((sphere, index) => {
      if (!sphere) return
      const config = orbitConfigs[index]
      if (!config) return
      const pulse = 1 + Math.sin(time * 3 + index) * 0.2
      const scale = config.baseScale * pulse
      sphere.scale.set(scale, scale, scale)
    })

    orbitLightRefs.current.forEach((light, index) => {
      if (!light) return
      const config = orbitConfigs[index]
      if (!config) return
      light.intensity = config.baseIntensity + Math.sin(time * 2 + index) * config.intensityVariance
    })

    if (animationState === "entering") {
      progressRef.current = Math.min(progressRef.current + delta / 2.1, 1)
      const eased = easeOutCubic(progressRef.current)
      rocket.position.lerpVectors(entranceStart, entranceTarget, eased)
      rocket.rotation.z = THREE.MathUtils.lerp(-Math.PI / 4, -Math.PI / 5, eased) + Math.sin(eased * Math.PI) * 0.05
      rocket.rotation.y = THREE.MathUtils.lerp(Math.PI / 4, Math.PI / 6, eased)

      if (progressRef.current >= 1) {
        progressRef.current = 0
        setAnimationState("idle")
      }
      return
    }

    if (animationState === "idle") {
      const hover = Math.sin(state.clock.elapsedTime * 2) * 0.25
      const sway = Math.sin(state.clock.elapsedTime * 1.5) * 0.08
      rocket.position.copy(entranceTarget)
      rocket.position.y += hover
      rocket.rotation.set(0.12, Math.PI / 6, -Math.PI / 5 + sway * 0.6)
      return
    }

    if (animationState === "exiting") {
      progressRef.current = Math.min(progressRef.current + delta / 1.6, 1)
      const eased = easeInCubic(progressRef.current)
      rocket.visible = true
      rocket.position.lerpVectors(entranceTarget, exitTarget, eased)
      rocket.rotation.z =
        THREE.MathUtils.lerp(-Math.PI / 5, -Math.PI / 3, eased) - Math.sin(eased * Math.PI) * 0.08
      rocket.rotation.y = THREE.MathUtils.lerp(Math.PI / 6, -Math.PI / 3, eased)

      if (progressRef.current >= 1) {
        rocket.visible = false
        setAnimationState("hidden")
      }
      return
    }
  })

  engineGlowRefs.current.length = thrusterOffsets.length
  orbitRefs.current.length = orbitConfigs.length
  orbitSphereRefs.current.length = orbitConfigs.length
  orbitLightRefs.current.length = orbitConfigs.length

  return (
    <group ref={rocketRef} scale={5} position={entranceStart.toArray()}>
      <primitive object={scene} rotation={[0, Math.PI, 0]} />
      <pointLight ref={engineLightRef} position={[0, -0.32, 0]} color="#ffb347" distance={28} decay={2} intensity={12} castShadow />
      <pointLight ref={rimLightRef} position={[0.15, 0.18, 0.28]} color="#4fd5ff" distance={14} decay={2.5} intensity={4.2} />
      {thrusterOffsets.map((offset, index) => (
        <group key={index} position={offset}>
          <mesh ref={(mesh) => (engineGlowRefs.current[index] = mesh)} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.08, 0.22, 24]} />
            <meshBasicMaterial color="#ffd166" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <sphereGeometry args={[0.07, 18, 18]} />
            <meshBasicMaterial color="#fff3c4" transparent opacity={0.62} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <sphereGeometry args={[0.1, 18, 18]} />
            <meshBasicMaterial color="#ffe6b3" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}
      {orbitConfigs.map((config, index) => (
        <group key={`orbit-${index}`} ref={(group) => (orbitRefs.current[index] = group)}>
          <mesh ref={(mesh) => (orbitSphereRefs.current[index] = mesh)}>
            <sphereGeometry args={[config.baseScale, 18, 18]} />
            <meshStandardMaterial
              color={config.color}
              emissive={config.color}
              emissiveIntensity={2.2}
              roughness={0.1}
              metalness={0.2}
            />
          </mesh>
          <pointLight
            ref={(light) => (orbitLightRefs.current[index] = light)}
            color={config.lightColor}
            intensity={config.baseIntensity}
            distance={4.2}
            decay={2.1}
          />
        </group>
      ))}
      <Sparkles count={50} scale={[0.9, 1.2, 0.9]} size={4.5} speed={0.7} color="#ffe6a7" noise={[0.2, 0.6, 0.2]} />
    </group>
  )
}

useGLTF.preload("/models/cute rocket 3d model.glb")


