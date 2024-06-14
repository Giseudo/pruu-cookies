<template>
  <GltfModel ref="root" :src="pigeonModel" @load="onReady" @click="onClick" />
</template>

<script setup>
import { ref, onMounted, defineExpose, defineEmits, getCurrentInstance } from 'vue'
import { useUpdate } from '../../composables'
import { useGameStore } from '../../stores'
import pigeonModel from './Pigeon.glb?url'

const root = ref(null)
const offset = ref(0)
const lastBiteTime = ref(0)

const speed = 20
const height = 1
const emit = defineEmits([ 'click' ])

const gameStore = useGameStore()

const onReady = ({ scene }) => {
  scene.traverse(o => {
    if (!o.isMesh)
      return

    o.castShadow = true
  })
}

const onClick = function () {
  emit('click', this)
}

const eat = function (food) {
  if (lastBiteTime.value + 1.5 > gameStore.time)
    return

  lastBiteTime.value = gameStore.time

  setTimeout(() => {
    food.bite(this)
  }, 500)
}

onMounted(() => {
  offset.value = Date.now()
})

useUpdate((_, time) => {
  const t = (Math.sin(offset.value + time * speed) + 1.0) / 2.0

  root.value.position.y = (t * t * t) * height
})

defineExpose({ ...getCurrentInstance(), eat, root })
</script>
