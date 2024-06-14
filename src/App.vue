<template>
  <Renderer
    ref="renderer"
    resize="window"
    shadow
    :orbit-ctrl="orbitControls"
  >
    <Camera ref="camera" :position="{ x: 20, y: 50, z: 20 }" :fov="60" />

    <Scene background="#00b5ff">
      <HelloWorld />
    </Scene>
  </Renderer>

  <UIMenu
    :is-opened="menuStore.isMenuOpened"
    :position="menuStore.mousePosition"
    @pigeon="onAddPigeon"
    @cookie="onAddCookie"
    @ticket="onAddTicket"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Clock } from 'three'
import { useGameStore, useMenuStore, usePigeonStore } from './stores'
import * as TWEEN from '@tweenjs/tween.js'

import HelloWorld from './scenes/HelloWorld.vue'

const renderer = ref(null)
const camera = ref(null)

const gameStore = useGameStore()
const pigeonStore = usePigeonStore()
const menuStore = useMenuStore()

const { addPigeon, addCookie, addTicket } = pigeonStore
const { setRenderer, setDelta, setTime, setCamera } = gameStore
const { showMenu, setMousePosition } = menuStore

const orbitControls = { enableDamping: true, dampingFactor: 0.05 }

const onAddPigeon = () => {
  addPigeon(pigeonStore.spawnPoint)

  showMenu(false)
}

const onAddCookie = () => {
  addCookie(pigeonStore.spawnPoint)

  showMenu(false)
}

const onAddTicket = () => {
  addTicket(pigeonStore.spawnPoint)

  showMenu(false)
}

const onMouseMove = event => {
  const { clientX: x, clientY: y } = event

  setMousePosition({ x, y })
}

onMounted(() => {
  const clock = new Clock()

  setRenderer(renderer.value)
  setCamera(camera.value.camera)

  renderer.value.onBeforeRender(() => {
    setDelta(clock.getDelta())
    setTime(clock.getElapsedTime())
    TWEEN.update()
  })

  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: red;
  z-index: 100;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
