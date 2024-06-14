import { ref, onMounted } from 'vue'
import { useUpdate } from './useUpdate'

export const useBouncing = (root, speed = 20, height = 1) => {
  const offset = ref(0)

  onMounted(() => {
    offset.value = Date.now()
  })

  useUpdate((_, time) => {
    if (!root.value.o3d)
      return

    const t = (Math.sin(offset.value + time * speed) + 1.0) / 2.0

    root.value.o3d.position.y = (t * t * t) * height
    root.value.o3d.scale.x = 1 + (1 - (t * t * t)) * 0.75
    root.value.o3d.scale.z = 1 + (1 - (t * t * t)) * 0.75
  })
}
