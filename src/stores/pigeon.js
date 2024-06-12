import { defineStore } from 'pinia'
import { shallowReactive } from 'vue'

const generate_uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export const usePigeonStore = defineStore('pigeon', {
  state: () => ({
    pigeons: shallowReactive({}),
    cookies: shallowReactive({}),
  }),

  actions: {
    addPigeon (startPosition) {
      const uid = generate_uid()

      this.pigeons[uid] = { uid, startPosition }
    },

    removePigeon (uid) {
      delete this.pigeons[uid]
    },

    addCookie (startPosition) {
      const uid = generate_uid()

      this.cookies[uid] = { uid, startPosition }
    },

    removeCookie (uid) {
      delete this.cookies[uid]
    },
  }
})
