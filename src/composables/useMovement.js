import { Vector3 } from 'three'
import { useUpdate } from './useUpdate'

export const useMovement = (root, props) => {
  const direction = new Vector3(0, 0, 0)

  const move = ({ x, y, z }) => {
    direction.set(x, y, z)
  }

  const stop = () => {
    direction.set(0, 0, 0)
  }

  const lookAt = (position) => {
    if (!root.value?.o3d)
      return

    root.value.o3d.lookAt(position)
  }

  const applyVelocity = (delta) => {
    if (direction.length() < 0.1)
      return

    const velocity = direction.clone().multiplyScalar(props.speed)

    root.value.position.add(velocity.multiplyScalar(delta))
  }

  useUpdate((delta) => {
    applyVelocity(delta)
  })

  return { move, stop, lookAt }
}
