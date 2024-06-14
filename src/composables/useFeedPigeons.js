import { useUpdate } from './useUpdate'
import { Vector3 } from 'three'

const findClosestFood = (pigeon, foods = []) => {
  let minDistance = Number.MAX_VALUE
  let closest = null

  foods.forEach(food => 
    Object.values(food)
      .map(({ instance }) => instance)
      .forEach(food => {
        const pigeonPosition = pigeon.root.position
        const foodPosition = food.root.position
        const distance = pigeonPosition.distanceToSquared(foodPosition)

        if (distance < minDistance) {
          minDistance = distance
          closest = food
        }
      })
  )

  return closest
}

export const useFeedPigeons = (pigeons, foods = []) => {
  useUpdate(() => {
    Object.values(pigeons)
      .map(({ instance }) => instance)
      .forEach(pigeon => {
        const closestFood = findClosestFood(pigeon, foods)

        let targetPosition = closestFood?.root.position

        if (!closestFood) {
          const forward = pigeon.root.o3d?.getWorldDirection(new Vector3(0, 0, 1)) || new Vector3()

          forward.multiplyScalar(5)

          targetPosition = pigeon.root.position.clone()
            .add(forward)
            .clamp(new Vector3(-25, 0, -25), new Vector3(25, 0, 25))
        }

        const distance = targetPosition.distanceTo(pigeon.root.position)

        if (distance < 2 && closestFood)
          return pigeon.eat(closestFood)

        const direction = targetPosition.clone()
          .sub(pigeon.root.position)
          .normalize()

        const lookPosition = targetPosition.clone()
          .add(new Vector3(0, -1, 0))

        pigeon.move(direction)
        pigeon.lookAt(lookPosition)
      })
  })
}
