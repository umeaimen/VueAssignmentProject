<template>
  <div class="vue-tempalte">
      <form v-on:submit.prevent="registerUser">
          <h3>Sign Up</h3>

          <div class="form-group">
              <label>Full Name</label>
               <input v-model="name" type="text" class="form-control form-control-lg"/>
          </div>

          <div class="form-group">
              <label>Email address</label>
              <input v-model="email" type="email" class="form-control form-control-lg"/>
          </div>

          <div class="form-group">
              <label>Password</label>
               <input v-model="password" type="password" class="form-control form-control-lg"/>
          </div>

          <div class="form-group">
              <label>Confirm Password</label>
               <input v-model="confirmPassword" type="password" class="form-control form-control-lg"/>
          </div>

          <button type="submit" class="btn btn-dark btn-lg btn-block mt-2">Sign Up</button>

          <p class="forgot-password text-right">
              Already registered 
              <router-link :to="{name: 'login'}">sign in?</router-link>
          </p>
      </form>
  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const registerUser = async () => {
    try {
      const response = await axios.post('api/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        c_password: confirmPassword.value
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Registration successful:', response.data);
      // Redirect or perform other actions upon successful registration
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };
</script>
