<template>
  <div class="vue-tempalte">
    <h2>Edit Profile</h2>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="user.name" class="form-control" required />
        <div v-if="errors.name">
            <p class="text-danger">{{errors.name[0]}}</p>
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" class="form-control" required />
        <div v-if="errors.email">
            <p class="text-danger">{{errors.email[0]}}</p>
        </div>
      </div>
      <button type="submit"  class="btn btn-dark btn-lg btn-block mt-2">Update Profile</button>
    </form>
  </div>
</template>

<script setup>
import useAuth from "../../auth/useAuth.js";
import { reactive } from 'vue';

const { getUser, updateProfile, errors } = useAuth();
const user = reactive(getUser);
</script>