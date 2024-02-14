<template>
<div class="inner-block mt-4">
  <div class="vue-tempalte">
    <h3>Edit Profile</h3>
    <form @submit.prevent="handleSubmit">
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
      <div class="text-center">
        <button type="submit" class="btn btn-dark btn-lg btn-block mt-2" :disabled="isUpdating">
          <span v-if="isUpdating" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Update Profile
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script setup>
import useAuth from "../../auth/useAuth.js";
import { reactive, ref } from 'vue';

const { getUser, updateProfile, errors } = useAuth();
const user = reactive(getUser);
const isUpdating = ref(false);

async function handleSubmit() {
  try {
    isUpdating.value = true;
    await updateProfile(user);
  } catch (error) {
    console.error('Profile update failed:', error);
  } finally {
    isUpdating.value = false;
  }
}
</script>
