import { useUpdate } from './useUpdate'

const findClosestFood = (pigeon, foods) => {
  let minDistance = Number.MAX_VALUE
  let closest = null

  Object.values(foods)
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

  return closest
}

export const useFeedPigeons = (pigeons = [], foods = []) => {
  useUpdate((delta) => {
    Object.values(pigeons)
      .map(({ instance }) => instance)
      .forEach(pigeon => {
        const closestFood = findClosestFood(pigeon, foods)

        if (!closestFood)
          return

        const direction = closestFood.root.position.clone()
          .sub(pigeon.root.position)
          .normalize()

        pigeon.root.position.add(direction.multiplyScalar(delta * 2.0))
      })
  })
}
