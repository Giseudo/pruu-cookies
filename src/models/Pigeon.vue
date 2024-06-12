<template>
  <Group ref="root" >
    <Sphere :radius="1" :position="{ y: 1 }" cast-shadow @click="onClick">
      <PhongMaterial color="#3700ff" />
    </Sphere>
  </Group>
</template>

<script setup>
import { ref, onMounted, defineExpose, defineEmits, getCurrentInstance } from 'vue'
import { useUpdate } from '../composables'

const root = ref(null)
const offset = ref(0)

const speed = 20
const height = 1
const emit = defineEmits([ 'click' ])

const onClick = function () {
  emit('click', this)
}

const peck = () => {
  console.log('peck!')
}

onMounted(() => {
  offset.value = Date.now()
  root.value = root.value.o3d
})

useUpdate((delta, time) => {
  const t = (Math.sin(offset.value + time * speed) + 1.0) / 2.0

  root.value.position.y = (t * t * t) * height
})

defineExpose({ ...getCurrentInstance(), peck, root })
</script>
