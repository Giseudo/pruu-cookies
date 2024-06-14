<template>
  <Group ref="root">
    <Plane
      ref="screen"
      v-if="showScreen"
      :position="{ y: 1.05, z: -1.05 }"
      :rotation="{ x: -Math.PI / 14 }"
      :width="2.05"
      :height="1.5"
    >
      <BasicMaterial :props="{ map: screenTexture }" />
    </Plane>

    <GltfModel :src="computerModel" @load="onLoadModel" />
  </Group>
</template>

<script setup>
import { ref, defineExpose, defineProps, defineEmits, getCurrentInstance } from 'vue'
import { TextureLoader } from 'three'
import { useBite, useSpawn } from '../../composables'
import conveniaLogo from './Convenia.png?url'
import computerModel from './Computer.glb?url'

const loader = new TextureLoader()
const screenTexture = loader.load(conveniaLogo)

const root = ref(null)
const showScreen = ref(true)
const emit = defineEmits([ 'click', 'eaten' ])

const props = defineProps({
  bites: {
    type: Number,
    default: 5
  }
})

const onDestroy = (source) => emit('eaten', source)

const onBeforeDestroy = () => showScreen.value = false

const { bite, eaten } = useBite(root, props.bites, onDestroy, onBeforeDestroy)
const { onLoadModel } = useSpawn(root)

defineExpose({ ...getCurrentInstance(), bite, eaten, root })
</script>
