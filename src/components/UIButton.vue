<template>
  <button class="ui-button">
    <slot />
  </button>
</template>

<script setup>
</script>

<style lang="scss">
.ui-button {
  width: 200px;
  height: 200px;
  border-radius: 200px;
  border: 0;
  background: orange;
  color: white;
  font-size: 42px;
  font-weight: 600;
  transition: transform 0.15s cubic-bezier(0.64, 0.57, 0.67, 1.53);

  &:hover {
    transform: scale(1.1);
  }
}
</style>
