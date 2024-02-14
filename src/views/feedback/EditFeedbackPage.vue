<template>
  <div class="vue-tempalte">
    <div class="inner-block mt-5">
      <div class="text-center">
        <h3>Edit Feedback</h3>
      </div>
      <form @submit.prevent="handleSubmit" v-if="feedback">
        <div class="form-group mt-2">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="feedback.title"
            class="form-control"
            placeholder="Enter title"
          />
          <div v-if="feedbackErrors.title">
            <p class="text-danger">{{ feedbackErrors.title[0] }}</p>
          </div>
        </div>
        <div class="form-group mt-2">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="feedback.description"
            class="form-control"
            required
            placeholder="Enter description"
          ></textarea>
          <div v-if="feedbackErrors.description">
            <p class="text-danger">{{ feedbackErrors.description[0] }}</p>
          </div>
        </div>
        <div class="form-group mt-2">
          <label for="category">Category</label>
          <select
            id="category"
            v-model="feedback.category"
            class="form-control"
            placeholder="Select Category"
          >
            <option value="">Select Category</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
          </select>
          <div v-if="feedbackErrors.category">
            <p class="text-danger">{{ feedbackErrors.category[0] }}</p>
          </div>
        </div>
        <div class="form-group mt-2">
          <label for="attachments">Attachments</label>
          <input
            type="file"
            class="form-control"
            id="attachments"
            @change="handleFileUpload($event, feedback)"
            placeholder="Attach file" accept="image/*"
          />
          <div v-if="feedbackErrors.attachments">
            <p class="text-danger">{{ feedbackErrors.attachments[0] }}</p>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-dark btn-lg btn-block mt-2" :disabled="isSubmitting">
            <span
              v-if="isSubmitting"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  getFeedbackById,
  updateFeedback,
  handleFileUpload,
  feedbackErrors
} from '../../api/feedback.js'

const router = useRouter()
const feedbackId = router.currentRoute.value.params.id
const feedback = ref(null)
const isSubmitting = ref(false)

const fetchData = async () => {
  try {
    feedback.value = await getFeedbackById(feedbackId)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    // Handle error
  }
}

fetchData()

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await updateFeedback(feedback.value)
  } catch (error) {
    console.error('Error updating feedback:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
