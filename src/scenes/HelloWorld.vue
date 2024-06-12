<template>
  <AmbientLight color="white" :intensity="0.5" />
  <PointLight :position="{ x: 0, y: 50, z: 0 }" :intensity="0.5" cast-shadow />

  <Sphere ref="highlight" :radius="0.25">
    <BasicMaterial color="red" />
  </Sphere>

  <Box
    ref="ground"
    :position="{ y: -10 }"
    :width="60"
    :height="20"
    :depth="60"
    receive-shadow
    @click="onGroundClick"
  >
    <PhongMaterial color="#0ad194" />
  </Box>

  <Cookie
    v-for="(cookie, uid) in cookies"
    :ref="instance => cookie.instance = instance"
    :key="uid"
    :position="cookie.startPosition"
  />

  <Pigeon
    v-for="(pigeon, uid) in pigeons"
    :ref="instance => pigeon.instance = instance"
    :key="uid"
    :position="pigeon.startPosition"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore, usePigeonStore } from '../stores'
import { useFeedPigeons, useCursorHighlight } from '../composables'

const ground = ref(null)
const highlight = ref(null)

const menuStore = useMenuStore()
const pigeonStore = usePigeonStore()

const { pigeons, cookies, setSpawnPoint } = pigeonStore
const { showMenu } = menuStore

useFeedPigeons(pigeons, cookies)
useCursorHighlight(highlight, ground)

const onGroundClick = event => {
  if (menuStore.isMenuOpened)
    return showMenu(false)

  const { intersect } = event
  const { object, face, point } = intersect
  const { normal } = face

  if (object.up.dot(normal) <= 0)
    return

  showMenu(true)
  setSpawnPoint(point)
}
</script>
