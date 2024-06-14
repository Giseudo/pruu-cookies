import { ref } from 'vue'
import { useKnockback } from './useKnockback'
import { Tween } from '@tweenjs/tween.js'

export const useBite = (root, maxBites, onDestroy = () => {}, onBeforeDestroy = () => {}) => {
  const { knockback, shake } = useKnockback()

  const eaten = ref(false)
  const bites = ref(maxBites)

  const bite = function (source) {
    if (eaten.value)
      return

    const [ mesh ] = [ root.value?.group ] || root.value.o3d.children

    knockback(source.root, root.value)
    shake(mesh)

    if (bites.value - 1 <= 0) {
      eaten.value = true

      onBeforeDestroy()

      return new Tween(mesh.scale)
        .to({ x: 0, y: 0, z: 0 }, 500)
        .delay(500)
        .onComplete(() => onDestroy(source))
        .start()
    }

    bites.value -= 1
  }

  return { bite, eaten }
}
