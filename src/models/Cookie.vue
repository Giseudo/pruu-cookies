<template>
  <Group ref="root">
    <Torus
      ref="torus"
      :radius="1"
      :tubular-segments="16"
      :radial-segments="24"
      :tube="1"
      :position="{ y: .5 }"
      :rotation="{ x: Math.PI / 2 }"
      :scale="{ z: .5 }"
    >
      <PhongMaterial color="orange" />
    </Torus>
  </Group>
</template>

<script setup>
import { ref, defineExpose, getCurrentInstance } from 'vue'

const torus = ref(null)
const root = ref(null)

defineExpose({ ...getCurrentInstance(), root })
</script>
