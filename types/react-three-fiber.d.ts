import "@react-three/fiber"
import type { Object3DNode } from "@react-three/fiber"
import type { SpotLight } from "three"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      spotLight: Object3DNode<SpotLight, typeof SpotLight>
    }
  }
}

declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher, Vector3 } from "three"

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement)
    target: Vector3
    update(): void
  }
}

declare module "three-stdlib/controls/OrbitControls" {
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  export { OrbitControls }
  export default OrbitControls
}
import type { ThreeElements } from "@react-three/fiber"

declare global {
  namespace JSX {
    type IntrinsicElements = ThreeElements
  }
}

export {}

