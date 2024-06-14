<template>
  <Group ref="root">
    <GltfModel ref="model" :src="pigeonModel" @load="onLoadModel" />
  </Group>
</template>

<script setup>
import { ref, defineProps, defineExpose, getCurrentInstance } from 'vue'
import { useMovement, useSpawn, useBouncing } from '../../composables'
import { useGameStore } from '../../stores'
import pigeonModel from './Pigeon.glb?url'

const root = ref(null)
const model = ref(null)
const lastBiteTime = ref(0)

const props = defineProps({
  speed: {
    type: Number,
    default: 2
  }
})

const { move, stop, lookAt} = useMovement(root, props)
const { onLoadModel } = useSpawn(root)

const gameStore = useGameStore()

useBouncing(model)

const eat = function (food) {
  stop()

  if (lastBiteTime.value + 1.5 > gameStore.time)
    return

  lastBiteTime.value = gameStore.time

  setTimeout(() => food.bite(this) , 500)
}

defineExpose({ ...getCurrentInstance(), eat, move, lookAt, root })
</script>
