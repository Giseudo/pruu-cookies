<template>
  <button class="ui-button" :class="classes">
    <slot />
  </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  theme: {
    type: String,
    default: 'primary'
  }
})

const classes = computed(() => ({
  '-primary': props.theme === 'primary',
  '-secondary': props.theme === 'secondary',
  '-accent': props.theme === 'accent',
}))
</script>

<style lang="scss">
.ui-button {
  width: 200px;
  height: 200px;
  border-radius: 200px;
  border: 0;
  color: white;
  font-size: 42px;
  font-weight: 600;
  transition: transform 0.15s cubic-bezier(0.64, 0.57, 0.67, 1.53);

  &.-primary {
    background: orange;
  }

  &.-secondary {
    background: purple;
  }

  &.-accent {
    background: deepskyblue;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 600px) {
    width: 80px;
    height: 80px;
    font-size: 18px;
  }
}
</style>
