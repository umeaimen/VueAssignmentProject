import router from '@/router';
import axios from 'axios'; 
import { computed, reactive, ref } from 'vue'; // Import ref from 'vue'

const state = reactive({
    authenticated : false,
    user: {}
})

export default function useAuth() {
    const errors = ref({}) // Define errors as a ref
    const getAuthenticated = computed(() => state.authenticated)
    const getUser = computed(() => state.user)

    const setAuthenticate = (authenticated) => {
        state.authenticated = authenticated
    }

    const setUser = (user) => {
        state.user = user
    }

    const attempt = async () => {
        try {
            const bearToken = JSON.parse(localStorage.getItem('token'));
            axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`;
            let user = await axios.get('/api/user');
            setAuthenticate(true)
            setUser(user.data)
            return user;   
        } catch(e) {
            setAuthenticate(false)
            setUser({})
        }
    }

    const login = async (credentials) => {
        try {
            const response = await axios.post('api/login', credentials);
            const user = response.data.data;
            localStorage.setItem('token', JSON.stringify(user));
            await attempt() // Await attempt() here
            await router.push('/dashboard');
            console.log('Login successful:', response.data);
        } catch (e) {
            console.log(e.response.status);
            if (e.response.status === 404) {
                errors.value = e.response.data.data
            }
        }
    }

    const logout = async () => {
        // try {
            localStorage.removeItem('token');
            setAuthenticate(false);
            setUser({});
            await router.push('/login');
        //     console.log(bearToken.token);
        //     const response = await axios.post('/api/logout', {
        //         headers: {
        //             Authorization: `Bearer  ${bearToken.token}`
        //         }
        //     });
    
        //     setAuthenticate(false);
        //     setUser({});
        //     console.log('Logged out successfully');
        // } catch (error) {
        //     console.log('Error logging out:', error);
        //     throw error; // Re-throw the error for the caller to handle
        // }
    };    

    return {
        login,
        getAuthenticated,
        getUser,
        attempt,
        errors,
        logout
    }
}
