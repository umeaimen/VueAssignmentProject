<template>
<div class="inner-block mt-4">
   <div class="vue-tempalte">
        <form @submit.prevent="handleSubmit">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="form.email" type="email" class="form-control form-control-lg" placeholder="Enter email"/>
                <div v-if="errors.email">
                    <p class="text-danger">{{errors.email[0]}}</p>
                </div>
            </div>

            <div class="form-group">
                <label>Password</label>
                 <input v-model="form.password" type="password" class="form-control form-control-lg" placeholder="Enter password"/>
                 <div v-if="errors.password">
                    <p class="text-danger">{{errors.password[0]}}</p>
                </div>
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-dark btn-lg btn-block mt-2" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Sign In
                </button>
            </div>
        </form>
    </div>
</div>
</template>

<script setup>
   import { reactive,ref} from 'vue';
   import useAuth from "../../auth/useAuth.js";
   const {login, getUser: user, getAuthenticated: authenticated,errors} = useAuth()
   const form = reactive({
    email: '',
    password: '',
   })
   const isSubmitting = ref(false);
  
async function handleSubmit() {
  try {
    isSubmitting.value = true;
     await login(form);
  } catch (error) {
     isSubmitting.value = false;
    console.error('Login failed:', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>