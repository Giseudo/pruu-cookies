import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { TroisJSVuePlugin } from 'troisjs'
import { useGameStore, usePigeonStore } from './stores'
import App from './App.vue'

const app = createApp(App)

app.use(TroisJSVuePlugin)
app.use(createPinia())

useGameStore()
usePigeonStore()

app.mount('#app')
