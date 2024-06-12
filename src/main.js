import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { TroisJSVuePlugin } from 'troisjs'
import { useGameStore, usePigeonStore } from './stores'
import { registerModels } from './models'
import { registerComponents } from './components'
import App from './App.vue'

const app = createApp(App)

app.use(TroisJSVuePlugin)
app.use(createPinia())
app.use(registerModels)
app.use(registerComponents)

useGameStore()
usePigeonStore()

app.mount('#app')
