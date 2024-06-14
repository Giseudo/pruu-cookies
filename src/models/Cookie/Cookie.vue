<template>
  <Group ref="root">
    <GltfModel :src="cookieModel" @load="onReady" />
  </Group>
</template>

<script setup>
import { ref, defineExpose, defineEmits, getCurrentInstance } from 'vue'
import { useBite } from '../../composables'
import cookieModel from './Cookie.glb?url'

const root = ref(null)
const emit = defineEmits([ 'click', 'eaten' ])

const props = defineProps({
  bites: {
    type: Number,
    default: 5
  }
})

const onReady = ({ scene }) => {
  scene.traverse(o => {
    if (!o.isMesh)
      return

    o.castShadow = true
  })
}

const onDestroy = (source) => emit('eaten', source)

const { bite, eaten } = useBite(root, props.bites, onDestroy)

defineExpose({ ...getCurrentInstance(), bite, eaten, root })
</script>
