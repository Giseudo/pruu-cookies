<template>
  <Group ref="root">
    <GltfModel :src="cookieModel" @load="onLoadModel" />
  </Group>
</template>

<script setup>
import { ref, defineExpose, defineEmits, getCurrentInstance } from 'vue'
import { useBite, useSpawn } from '../../composables'
import cookieModel from './Cookie.glb?url'

const root = ref(null)
const emit = defineEmits([ 'click', 'eaten' ])

const props = defineProps({
  bites: {
    type: Number,
    default: 5
  }
})


const onDestroy = (source) => emit('eaten', source)

const { bite, eaten } = useBite(root, props.bites, onDestroy)
const { onLoadModel } = useSpawn(root)

defineExpose({ ...getCurrentInstance(), bite, eaten, root })
</script>
