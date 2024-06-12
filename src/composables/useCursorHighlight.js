import { onMounted, onBeforeUnmount } from 'vue'
import { Raycaster, Vector2 } from 'three'
import { useGameStore, useMenuStore } from '../stores'

export const useCursorHighlight = (highlight, ground) => {
  const gameStore = useGameStore()
  const menuStore = useMenuStore()

  const raycaster = new Raycaster()
  const onPointerMove = event => {
    if (menuStore.isMenuOpened)
      return

    const camera = gameStore.camera
    const pointer = new Vector2()

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)

    const intersects = raycaster.intersectObjects([ ground.value.mesh ])

    for (let i = 0; i < intersects.length; i ++) {
      const intersect = intersects[i]
      const { normal } = intersect.face
      const { x, y, z } = intersect.point

      if (intersect.object.up.dot(normal) <= 0)
        return

      highlight.value.mesh.position.set(x, y, z)
    }
  }

  onMounted(() => {
    window.addEventListener('pointermove', onPointerMove)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onPointerMove)
  })
}
