<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg shadow bg-white fixed-top">
      <div class="container">
        <a class="navbar-brand float-left"> Product Feedback </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item mx-2">
            <RouterLink class="nav-link pr-3" to="/">Home</RouterLink>
          </li>
          <template v-if="authenticated">
            <li class="nav-item mx-2 dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <img alt="Vue logo" class="logo" src="@/assets/avatar.svg" width="25" height="25" />
              </a>
              <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <RouterLink class="dropdown-item" to="/Profile">User Profile</RouterLink>
                <RouterLink class="dropdown-item" to="/change-password">Change Password</RouterLink>
                <!-- <RouterLink class="dropdown-item" to="/feedback">User Feedbacks</RouterLink> -->
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="logout">Logout</button>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="nav-item mx-2">
              <RouterLink class="btn btn-outline-dark " v-if="!authenticated" to="/login">Sign In</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="btn btn-outline-dark pr-3" v-if="!authenticated" to="/register">Sign Up</RouterLink>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
          <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
 import { RouterLink, RouterView } from 'vue-router'
 import useAuth from './auth/useAuth.js'
  import { onBeforeMount } from 'vue';
  const {getAuthenticated: authenticated, logout, setAuthenticate,setUser,getUser} = useAuth()
  
  onBeforeMount(() => {
    if(localStorage.getItem('token')){
      const data = JSON.parse(localStorage.getItem('token'))
      setUser(data.user); 
      setAuthenticate(true)
    }else{
      setAuthenticate(false)
    }
  })

</script>