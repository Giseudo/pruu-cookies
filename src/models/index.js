import Pigeon from './Pigeon/Pigeon.vue'
import Cookie from './Cookie/Cookie.vue'
import Computer from './Computer/Computer.vue'

export const registerModels = {
  install(app) {
    app.component('Pigeon', Pigeon)
    app.component('Cookie', Cookie)
    app.component('Computer', Computer)
  }
}
