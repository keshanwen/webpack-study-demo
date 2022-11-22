import { createApp } from 'vue'
import store from './store'
import router from './router'
import APP from './App.vue'

const app = createApp(APP)

app.use(store)
app.use(router)
app.mount('#app')