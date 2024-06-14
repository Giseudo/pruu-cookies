<template>
  <GltfModel ref="root" :src="pigeonModel" @load="onReady" />
</template>

<script setup>
import { ref, onMounted, defineProps, defineExpose, getCurrentInstance } from 'vue'
import { useUpdate, useMovement } from '../../composables'
import { useGameStore } from '../../stores'
import pigeonModel from './Pigeon.glb?url'

const root = ref(null)
const offset = ref(0)
const lastBiteTime = ref(0)

const props = defineProps({
  speed: {
    type: Number,
    default: 2
  }
})

const { move, stop, lookAt} = useMovement(root, props)

const bounceSpeed = 20
const bounceHeight = 1

const gameStore = useGameStore()

const onReady = ({ scene }) => {
  scene.traverse(o => {
    if (!o.isMesh)
      return

    o.castShadow = true
  })
}

const eat = function (food) {
  stop()

  if (lastBiteTime.value + 1.5 > gameStore.time)
    return

  lastBiteTime.value = gameStore.time

  setTimeout(() => food.bite(this) , 500)
}

onMounted(() => {
  offset.value = Date.now()
})

const bouncing = (time) => {
  if (!root.value.o3d)
    return

  const t = (Math.sin(offset.value + time * bounceSpeed) + 1.0) / 2.0

  root.value.o3d.position.y = (t * t * t) * bounceHeight
  root.value.o3d.scale.x = 1 + (1 - (t * t * t)) * 0.75
  root.value.o3d.scale.z = 1 + (1 - (t * t * t)) * 0.75
}

useUpdate((_, time) => {
  bouncing(time)
})

defineExpose({ ...getCurrentInstance(), eat, move, lookAt, root })
</script>
