<template>
  <Renderer
    ref="renderer"
    resize="window"
    shadow
    :orbit-ctrl="orbitControls"
  >
    <Camera ref="camera" :position="{ x: 40, y: 25, z: -40 }" :fov="60" />

    <Scene>
      <HelloWorld />
    </Scene>
  </Renderer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Clock } from 'three'
import { useGameStore } from './stores/game'
import HelloWorld from './scenes/HelloWorld.vue'

const isLoading = ref(true)
const renderer = ref(null)
const camera = ref(null)
const clock = new Clock()

const { setRenderer, setDelta, setTime, setCamera } = useGameStore()

const orbitControls = { enableDamping: true, dampingFactor: 0.05 }

onMounted(() => {
  setRenderer(renderer.value)
  setCamera(camera.value.camera)

  renderer.value.onBeforeRender(() => {
    setDelta(clock.getDelta())
    setTime(clock.getElapsedTime())
  })

  isLoading.value = false
})
</script>

<style>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
