<template>
  <GltfModel ref="root" :src="cookieModel" @load="onReady" @click="onClick" />
</template>

<script setup>
import { ref, defineExpose, defineEmits, getCurrentInstance } from 'vue'
import { Tween, Easing } from '@tweenjs/tween.js'
import { Vector3 } from 'three'
import cookieModel from './Cookie.glb?url'

const root = ref(null)
const emit = defineEmits([ 'click', 'eaten' ])
const bites = ref(5)

const onReady = ({ scene }) => {
  scene.traverse(o => {
    if (!o.isMesh)
      return

    o.castShadow = true
  })
}

const scaleTween = ref(null)
const positionTween = ref(null)
const isBeingKnockedBack = ref(false)

const shake = () => {
  if (!root.value?.o3d)
    return

  const [ mesh ] = root.value.o3d.children

  if (!positionTween.value)
    positionTween.value = new Tween(mesh.position)
      .to({ y: 1 }, 200)
      .yoyo(true)
      .repeat(1)

  if (!scaleTween.value)
    scaleTween.value = new Tween(mesh.scale)
      .to({ x: 1.5, y: 1.5, z: 1.5 }, 100)
      .easing(Easing.Bounce.Out)
      .yoyo(true)
      .repeat(3)

  mesh.scale.set(1, 1, 1)

  positionTween.value.start()
  scaleTween.value.start()
}

const knockBack = (origin, target) => {
  if (isBeingKnockedBack.value)
    return

  isBeingKnockedBack.value = true

  const position = target.position.clone()
  const direction = position.clone().sub(origin.position.clone()).normalize()
  const distance = 2
  const offset = direction.clone().multiplyScalar(distance)
  const newPosition = position.clone().add(offset)

  newPosition.clamp(new Vector3(-25, 0, -25), new Vector3(25, 0, 25))
  
  new Tween(target.position)
    .to(newPosition, 200)
    .onComplete(() => { isBeingKnockedBack.value = false })
    .start()
}

const bite = function (source) {
  shake()
  knockBack(source.root, root.value)

  if (bites.value - 1 < 0)
    return emit('eaten', source)

  bites.value -= 1
}

const onClick = function () {
  emit('click', this)
}

defineExpose({ ...getCurrentInstance(), bite, root })
</script>
