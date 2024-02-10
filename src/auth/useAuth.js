import router from '@/router';
import axios from 'axios'; 
import { computed, reactive, ref } from 'vue'; 

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
            console.log('Logged out successfully');
        } catch (error) {
            console.log('Error logging out:', error);
            throw error; // Re-throw the error for the caller to handle
        }
};    

export default function useAuth() {
    return {
        login,
        register,
        getAuthenticated,
        getUser,
        attempt,
        errors,
        logout
    };
}
