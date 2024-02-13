<template>
  <div class="vue-tempalte">
    <h2>Edit Password</h2>
    <form @submit.prevent="updatePassword(form)">
       <div class="form-group">
        <label for="password">Old Password</label>
        <input type="password" id="old_password" v-model="form.old_password" class="form-control" />
            <div v-if="errors.old_password">
                <p class="text-danger">{{errors.old_password[0]}}</p>
            </div>
      </div>
       <div class="form-group">
        <label for="password">New Password</label>
        <input type="password" id="password" v-model="form.password" class="form-control" />
            <div v-if="errors.password">
                <p class="text-danger">{{errors.password[0]}}</p>
            </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm New Password</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" class="form-control" />
            <div v-if="errors.confirmPassword">
                <p class="text-danger">{{errors.confirmPassword[0]}}</p>
            </div>
      </div>
      <button type="submit"  class="btn btn-dark btn-lg btn-block mt-2">Update Password</button>
    </form>
  </div>
</template>

<script setup>
import useAuth from "../../auth/useAuth.js";
import { reactive } from 'vue';

const { getUser, updatePassword, errors } = useAuth();
 const form = reactive({
    old_password: '',
    password: '',
    confirmPassword: '',
   })
</script>