<template>
<div class="inner-block ">
  <div class="vue-tempalte">
      <form @submit.prevent="handleSubmit">
          <h3>Sign Up</h3>
          <div class="form-group">
              <label class="mb-2">Full Name</label>
               <input v-model="form.name" type="text" class="form-control form-control-lg" placeholder="Enter name"/>
                <div v-if="errors.name">
                    <p class="text-danger">{{errors.name[0]}}</p>
                </div>
          </div>

          <div class="form-group">
              <label class="my-2">Email address</label>
              <input v-model="form.email" type="email" class="form-control form-control-lg" placeholder="Enter email"/>
               <div v-if="errors.email">
                    <p class="text-danger">{{errors.email[0]}}</p>
                </div>
          </div>

          <div class="form-group">
              <label class="my-2">Password</label>
               <input v-model="form.password" type="password" class="form-control form-control-lg" placeholder="Enter password"/>
                <div v-if="errors.password">
                    <p class="text-danger">{{errors.password[0]}}</p>
                </div>
          </div>

          <div class="form-group">
              <label class="my-2">Confirm Password</label>
               <input v-model="form.confirmPassword" type="password" class="form-control form-control-lg" placeholder="Enter Condirm password"/>
               <div v-if="errors.confirmPassword">
                    <p class="text-danger">{{errors.confirmPassword[0]}}</p>
                </div>
          </div>
         <div class="text-end my-2">
            <button type="submit" class="btn btn-dark btn-lg btn-block" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Sign Up
            </button>

            <p class="forgot-password text-end">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
         </div>
      </form>
  </div>
</div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import useAuth from "../../auth/useAuth.js";
  const { register, errors } = useAuth();
  const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const isSubmitting = ref(false);

  async function handleSubmit() {
    try {
      isSubmitting.value = true;
      await register(form);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      isSubmitting.value = false;
    }
  }
</script>