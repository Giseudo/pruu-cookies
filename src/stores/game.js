import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    renderer: null,
    camera: null,
    delta: 0,
    time: 0,
  }),

  actions: {
    setRenderer(value) {
      this.renderer = value
    },

    setCamera(value) {
      this.camera = value
    },

    setDelta(value) {
      this.delta = value
    },

    setTime(value) {
      this.time = value
    },
  }
})
