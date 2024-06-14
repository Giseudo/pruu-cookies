import { ref } from 'vue'
import { Vector3 } from 'three'
import { Tween, Easing } from '@tweenjs/tween.js'

export const useKnockback = () => {
  const scaleTween = ref(null)
  const positionTween = ref(null)
  const isBeingKnockedback = ref(false)

  const knockback = (origin, target) => {
    if (!target || !origin)
      return

    if (isBeingKnockedback.value)
      return

    isBeingKnockedback.value = true

    const position = target.position.clone()
    const direction = position.clone().sub(origin.position.clone()).normalize()
    const distance = 2
    const offset = direction.clone().multiplyScalar(distance)
    const newPosition = position.clone().add(offset)

    newPosition.clamp(new Vector3(-25, 0, -25), new Vector3(25, 0, 25))
    
    new Tween(target.position)
      .to(newPosition, 200)
      .onComplete(() => { isBeingKnockedback.value = false })
      .start()
  }

  const shake = (mesh) => {
    if (!mesh)
      return

    if (!positionTween.value)
      positionTween.value = new Tween(mesh.position)
        .to({ y: 1 }, 200)
        .yoyo(true)
        .repeat(1)

    if (!scaleTween.value)
      scaleTween.value = new Tween(mesh.scale)
        .to({ x: 1.5, y: 1.5, z: 1.5 }, 100)
        .easing(Easing.Bounce.Out)
        .yoyo(true)
        .repeat(3)

    mesh.scale.set(1, 1, 1)

    positionTween.value.start()
    scaleTween.value.start()
  }

  return { knockback, shake }
}
