import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    mousePosition: { x: 0, y :0 },
    isMenuOpened: false,
  }),

  actions: {
    showMenu(value) {
      this.isMenuOpened = value
    },

    setMousePosition(value) {
      this.mousePosition = value
    },
  }
})
