import UIButton from './UIButton.vue'
import UIMenu from './UIMenu.vue'

export const registerComponents = {
  install(app) {
    app.component('UIButton', UIButton)
    app.component('UIMenu', UIMenu)
  }
}
