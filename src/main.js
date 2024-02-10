import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import useAuth from './auth/useAuth'

const { attempt } = useAuth()
axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.withCredentials = true
const app = createApp(App)

app.use(createPinia())
app.use(router)

attempt().then(() => {
    app.mount('#app')
})


