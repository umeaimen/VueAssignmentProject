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

const clearErrors = () => {
  for (const key in errors.value) {
    errors.value[key] = [];
  }
}
const login = async (credentials) => {
  try {
    const response = await axios.post('api/login', credentials)
    const user = response.data
    localStorage.setItem('token', JSON.stringify(user))
    setAuthenticate(true)
    setUser(user)
    await router.push('/')
    clearErrors();
    toast('user logged in successfully', {
      autoClose: 1000
    })
  }  catch (e) {
    if (e.response.status === 422) {
      errors.value = e.response.data.errors
    } else if( e.response.status === 401){
      errors.value = { email: ['User is not authorized'] };
    }else {
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
    clearErrors()
    await router.push('/')
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

const updateProfile = async () => {
    try {
      const bearToken = JSON.parse(localStorage.getItem('token'))
      axios.defaults.headers.common["Authorization"] = `Bearer ${bearToken.token}`
      const response = await axios.post('/api/user/update-profile', getUser.value);
      setUser(response.data.user);
      clearErrors();
      toast('user profile updated successfully', {
        autoClose: 1000
      })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }else{
        toast(e.response.data.message, {
          autoClose: 1000
        })
      }
    }
};

const updatePassword = async (userData) => {
  try {
    const bearToken = JSON.parse(localStorage.getItem('token'))
    axios.defaults.headers.common["Authorization"] = `Bearer ${bearToken.token}`
    const response = await axios.post('/api/user/update-password',userData);
    setUser(response.data.user);
    clearErrors();
    toast('user password updated successfully', {
      autoClose: 1000
    })
  } catch (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors;
    }else{
      toast(e.response.data.message, {
        autoClose: 1000
      })
    }
  }
};

export default function useAuth() {
  return {
    login,
    register,
    getAuthenticated,
    getUser,
    errors,
    clearErrors,
    logout,
    setAuthenticate,
    setUser,
    updateProfile,
    updatePassword
  }
}
