<template>
<div class="inner-block">
  <div class="vue-tempalte">
    <h3>Edit Profile</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label class="mb-2" for="name">Name</label>
        <input type="text" id="name" v-model="user.name" class="form-control" required />
        <div v-if="errors.name">
            <p class="text-danger">{{errors.name[0]}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="my-2" for="email">Email</label>
        <input type="email" id="email" v-model="user.email" class="form-control" required />
        <div v-if="errors.email">
            <p class="text-danger">{{errors.email[0]}}</p>
        </div>
      </div>
      <div class="text-end my-2">
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
import { onBeforeMount, reactive, ref } from 'vue';

const { getUser,setUser, updateProfile, errors } = useAuth();
const user = ref(null);
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
onBeforeMount(() => {
    if(localStorage.getItem('token')){
      const data = JSON.parse(localStorage.getItem('token'))
      user.value = data.user
    }
})
</script>
