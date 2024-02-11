import router from '@/router';
import axios from 'axios'; 
import { computed, reactive, ref } from 'vue'; 
import { toast } from 'vue3-toastify'; 
import 'vue3-toastify/dist/index.css'

const state = reactive({
    authenticated: false,
    user: {}
});

const errors = ref({}); 

const getAuthenticated = computed(() => state.authenticated);
const getUser = computed(() => state.user);

const setAuthenticate = (authenticated) => {
    state.authenticated = authenticated;
};

const setUser = (user) => {
    state.user = user;
};

const attempt = async () => {
    try {
        const bearToken = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`;
        let user = await axios.get('/api/user');
        setAuthenticate(true);
        setUser(user.data);
        return user;   
    } catch(e) {
        setAuthenticate(false);
        setUser({});
    }
};

const login = async (credentials) => {
    try {
        const response = await axios.post('api/login', credentials);
        const user = response.data.data;
        localStorage.setItem('token', JSON.stringify(user));
        await attempt();
        await router.push('/dashboard');
        toast('user logged in successfully',{
          autoClose: 1000,
        })
        console.log('Login successful:', response.data);
    } catch (e) {
        console.log(e);
        if (e.response.status === 422) {
            errors.value = e.response.data.errors;
        }
    }
};

const register = async (userData) => {
    try {
        const response = await axios.post('api/register', userData);
        const user = response.data.data;
        localStorage.setItem('token', JSON.stringify(user));
        console.log('Registration successful:', response.data);
        await login({ email: userData.email, password: userData.password });
        toast('user registered successfully',{
            autoClose: 1000,
          })
    } catch (error) {
        console.log('Registration failed:', error.response.data);
        if (error.response.status === 422) {
            errors.value = error.response.data.errors;
        }
    }
};

const logout = async () => {
    const bearToken = localStorage.getItem('token')
    console.log('bear',bearToken);
       try {
            const response = await axios.post('/api/logout', {
                headers: {
                    Authorization: `Bearer  ${bearToken.token}`
                }
            });
            localStorage.removeItem('token');
            setAuthenticate(false);
            setUser({});
            await router.push('/login');
            toast('user logout successfully',{
                autoClose: 1000,
              })
            console.log('Logged out successfully');
        } catch (error) {
            console.log('Error logging out:', error);
            throw error; // Re-throw the error for the caller to handle
        }
};  

const updateProfile = async () => {
    try {
      const response = await axios.post('/api/user/update-profile', getUser.value);
      setUser(response.data);
      console.log('Profile updated successfully:', response.data);
      // You might want to navigate the user to another page after updating the profile
    } catch (error) {
      console.log('Error updating profile:', error.response.data);
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

export default function useAuth() {
    return {
        login,
        register,
        getAuthenticated,
        getUser,
        attempt,
        updateProfile,
        errors,
        logout
    };
}
