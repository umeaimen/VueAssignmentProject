<template>
   <div class="vue-tempalte">
    {{errors}}
    {{user}}
    {{authenticated}}
        <form v-on:submit.prevent="login(form)">
            <h3>Sign In</h3>

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

            <button type="submit" class="btn btn-dark btn-lg btn-block mt-2">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <!-- <router-link to="/forgot-password">Forgot password ?</router-link> -->
            </p>

        </form>
    </div>
</template>

<script setup>
   import { reactive} from 'vue';
   import useAuth from "../../auth/useAuth.js";
   const {login, getUser: user, getAuthenticated: authenticated,errors} = useAuth()
   const form = reactive({
    email: '',
    password: '',
   })
</script>
