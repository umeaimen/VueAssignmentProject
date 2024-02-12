<template>
  <div class="vue-tempalte">
    <h2>Edit Password</h2>
    <form @submit.prevent="updatePassword">
       <div class="form-group">
        <label for="password">New Password</label>
        <input type="password" id="password" v-model="user.password" class="form-control" />
            <div v-if="errors.password">
                <p class="text-danger">{{errors.password[0]}}</p>
            </div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm New Password</label>
        <input type="password" id="confirmPassword" v-model="user.confirmPassword" class="form-control" />
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
const user = reactive(getUser);
</script>