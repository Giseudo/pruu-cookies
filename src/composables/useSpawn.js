import { onMounted } from 'vue'
import { Tween, Easing } from '@tweenjs/tween.js'

export const useSpawn = (root) => {
  const onLoadModel = ({ scene }) => {
    new Tween(root.value.group.scale)
      .to({ x: 1, y: 1, z: 1 }, 500)
      .easing(Easing.Bounce.Out)
      .start()

    scene.traverse(o => {
      if (!o.isMesh)
        return

      o.castShadow = true
    })
  }

  onMounted(() => {
    root.value.group.scale.set(0, 0, 0)
  })

  return { onLoadModel }
}
