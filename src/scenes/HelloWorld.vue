<template>
  <AmbientLight color="white" :intensity="0.5" />
  <PointLight :position="{ x: 0, y: 50, z: 0 }" :intensity="0.5" cast-shadow />

  <Box
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
    @click="removePigeon(uid)"
  />
</template>

<script setup>
import { Pigeon, Cookie } from '../components'
import { usePigeonStore } from '../stores'

const { pigeons, cookies, addPigeon, removePigeon, addCookie } = usePigeonStore()

const onGroundClick = event => {
  const { intersect } = event
  const { object, face, point } = intersect
  const { normal } = face

  if (object.up.dot(normal) <= 0)
    return

  addPigeon(point)
  addCookie(point)
}
</script>
