<template>
  <div class="inner-block mt-4">
    <div class="vue-tempalte">
      <h3>Edit Password</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="old_password">Old Password</label>
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
        <div class="text-center">
          <button type="submit" class="btn btn-dark btn-lg btn-block mt-2" :disabled="isUpdating">
            <span v-if="isUpdating" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Update Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useAuth from "../../auth/useAuth.js";
import { reactive, ref } from 'vue';

const { updatePassword, errors } = useAuth();
const form = reactive({
  old_password: '',
  password: '',
  confirmPassword: '',
});
const isUpdating = ref(false);

async function handleSubmit() {
  try {
    isUpdating.value = true;
    await updatePassword(form);
    form.old_password = '';
    form.password = '';
    form.confirmPassword = '';
  } catch (error) {
    console.error('Password update failed:', error);
  } finally {
    isUpdating.value = false;
  }
}
</script>