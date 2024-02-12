import router from '@/router'
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { onBeforeMount } from 'vue'

const state = reactive({
  authenticated: false,
  user: {}
})

const errors = ref({})

const getAuthenticated = computed(() => state.authenticated)
const getUser = computed(() => state.user)

const setAuthenticate = (authenticated) => {
  state.authenticated = authenticated
}

const setUser = (user) => {
  state.user = user
}

const login = async (credentials) => {
  try {
    const response = await axios.post('api/login', credentials)
    const user = response.data
    localStorage.setItem('token', JSON.stringify(user))
    setAuthenticate(true)
    setUser(user)
    await router.push('/dashboard')
    toast('user logged in successfully', {
      autoClose: 1000
    })
  } catch (e) {
    if (e.response.status === 422) {
      errors.value = e.response.data.errors
    } else {
      toast(e.response.data.message, {
        autoClose: 1000
      })
    }
  }
}

const register = async (userData) => {
  try {
    const response = await axios.post('api/register', userData)
    const user = response.data
    localStorage.setItem('token', JSON.stringify(user))
    setAuthenticate(true)
    setUser(user)
    await router.push('/dashboard')
    toast('user registered successfully', {
      autoClose: 1000
    })
  } catch (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors
    } else {
      toast(e.response.data.message, {
        autoClose: 1000
      })
    }
  }
}

const logout = async () => {
  const bearToken = JSON.parse(localStorage.getItem('token'))
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${bearToken.token}`
    const response = await axios.post('/api/logout')
    localStorage.removeItem('token')
    setAuthenticate(false)
    setUser({})
    await router.push('/login')
    toast('user logout successfully', {
      autoClose: 1000
    })
  } catch (error) {
    toast(error.response.data.message, {
      autoClose: 1000
    })
  }
}

export default function useAuth() {
  return {
    login,
    register,
    getAuthenticated,
    getUser,
    errors,
    logout,
    setAuthenticate
  }
}
