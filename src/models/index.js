import Pigeon from './Pigeon.vue'
import Cookie from './Cookie.vue'

export const registerModels = {
  install(app) {
    app.component('Pigeon', Pigeon)
    app.component('Cookie', Cookie)
  }
}
