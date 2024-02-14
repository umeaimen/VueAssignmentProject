<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" >
           Product Feedback
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item mx-2">
            <RouterLink class="nav-link pr-3"  to="/">Home</RouterLink>
          </li>
          <template v-if="authenticated">
            <li class="nav-item">
              <button class="btn btn-outline-dark" @click="logout">logout</button>
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
  const {getAuthenticated: authenticated, logout, setAuthenticate} = useAuth()
  
  onBeforeMount(() => {
    localStorage.getItem('token') ? setAuthenticate(true) : setAuthenticate(false)
  })

</script>