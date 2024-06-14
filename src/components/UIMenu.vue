<template>
  <Transition name="menu">
    <div v-show="isOpened" class="ui-menu" :style="{ top, left }">
      <UIButton @click="emit('pigeon')">
        PRUUU
      </UIButton>

      <UIButton @click="emit('cookie')">
        Cookie
      </UIButton>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import UIButton from './UIButton.vue'

const left = ref('0px')
const top = ref('0px')

const props = defineProps({
  isOpened: Boolean,

  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
  }
})

watch(() => props.isOpened, (value) => {
  if (!value)
    return

  top.value = `${props.position.y}px`
  left.value = `${props.position.x}px`
})

const emit = defineEmits([ 'pigeon', 'cookie' ])
</script>

<style lang="scss">
.ui-menu {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;

  .ui-button { margin: 20px; }
}

.menu-enter-active,
.menu-leave-active {
  transition: transform 0.15s cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.menu-enter-from,
.menu-leave-to {
  transform: translate(-50%, -50%) scale(0);
}
</style>
