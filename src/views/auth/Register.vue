<template>
  <div class="vue-tempalte">
      <form v-on:submit.prevent="register(form)">
          <h3>Sign Up</h3>
          <div class="form-group">
              <label>Full Name</label>
               <input v-model="form.name" type="text" class="form-control form-control-lg"/>
                <div v-if="errors.name">
                    <p class="text-danger">{{errors.name[0]}}</p>
                </div>
          </div>

          <div class="form-group">
              <label>Email address</label>
              <input v-model="form.email" type="email" class="form-control form-control-lg"/>
               <div v-if="errors.email">
                    <p class="text-danger">{{errors.email[0]}}</p>
                </div>
          </div>

          <div class="form-group">
              <label>Password</label>
               <input v-model="form.password" type="password" class="form-control form-control-lg"/>
                <div v-if="errors.password">
                    <p class="text-danger">{{errors.password[0]}}</p>
                </div>
          </div>

          <div class="form-group">
              <label>Confirm Password</label>
               <input v-model="form.confirmPassword" type="password" class="form-control form-control-lg"/>
                <div v-if="errors.confirmPassword">
                    <p class="text-danger">{{errors.confirmPassword[0]}}</p>
                </div>
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
  import { reactive} from 'vue';
   import useAuth from "../../auth/useAuth.js";
   const {register,errors} = useAuth()
   const form = reactive({
    name: '',
    email: '',
    password: '',
   })
</script>
