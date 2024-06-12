import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useGameStore } from '../stores/game'

export const useUpdate = (onUpdate = () => {}) => {
  const callback = () => {
    const { delta, time } = useGameStore()

    return onUpdate(delta, time)
  }

  onMounted(() => {
    nextTick(() => {
      const { renderer } = useGameStore()

      renderer.onBeforeRender(callback)
    })
  })

  onBeforeUnmount(() => {
    const { renderer } = useGameStore()

    renderer.offBeforeRender(callback)
  })
}

export default useUpdate
