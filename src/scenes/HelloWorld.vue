<template>
  <AmbientLight color="white" :intensity="0.5" />

  <PointLight color="white" :position="{ x: 50, y: 50, z: 50 }" :intensity="0.5" cast-shadow />

  <Sphere ref="highlight" :radius="3.0">
    <BasicMaterial color="white" :props="{ transparent: true, opacity: 0.25 }" />
  </Sphere>

  <Box
    ref="ground"
    :position="{ y: -2.5 }"
    :width="60"
    :height="5"
    :depth="60"
    receive-shadow
    @click="onGroundClick"
  >
    <StandardMaterial color="#7dd17d" />
  </Box>

  <Cookie
    v-for="(cookie, uid) in cookies"
    :ref="instance => cookie.instance = instance"
    :key="uid"
    :bites="3"
    :position="cookie.startPosition"
    @eaten="onEatCookie(cookie)"
  />

  <Computer
    v-for="(ticket, uid) in tickets"
    :ref="instance => ticket.instance = instance"
    :key="uid"
    :bites="5"
    :position="ticket.startPosition"
    @eaten="onFinishTicket(ticket)"
  />

  <Pigeon
    v-for="(pigeon, uid) in pigeons"
    :ref="instance => pigeon.instance = instance"
    :key="uid"
    :speed="3"
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

const { pigeons, tickets, cookies, setSpawnPoint, removeCookie, removeTicket } = pigeonStore
const { showMenu } = menuStore

useFeedPigeons(pigeons, [ cookies, tickets ])
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

const onEatCookie = (cookie) => {
  removeCookie(cookie.uid)
}

const onFinishTicket = (ticket) => {
  removeTicket(ticket.uid)
}
</script>
