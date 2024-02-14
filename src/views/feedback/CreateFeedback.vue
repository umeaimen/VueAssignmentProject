<template>
  <div class="vue-tempalte">
    <div class="inner-block mt-5">
      <div class="text-center">
        <h3>Submit Feedback</h3>
      </div>
      <form @submit.prevent="handleSubmitFeedback">
        <div class="form-group mt-2">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="feedbackData.title"
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
            v-model="feedbackData.description"
            class="form-control"
            placeholder="Enter description"
          ></textarea>
          <div v-if="feedbackErrors.description">
            <p class="text-danger">{{ feedbackErrors.description[0] }}</p>
          </div>
        </div>
        <div class="form-group mt-2">
          <label for="category">Category</label>
          <select id="category" v-model="feedbackData.category" class="form-control">
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
          <label for="attachment">Attachment</label>
          <input
            type="file"
            class="form-control"
            id="attachment"
            @change="handleFileUpload($event, feedbackData)"
            placeholder="Attach file"
          />
          <div v-if="feedbackErrors.attachment">
            <p class="text-danger">{{ feedbackErrors.attachment[0] }}</p>
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
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import {
  handleFileUpload,
  submitFeedback,
  feedbackErrors,
  clearFeedbackErrors
} from '../../api/feedback.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const feedbackData = ref({
  title: '',
  description: '',
  category: '',
  attachment: null
})

const isSubmitting = ref(false)
router.beforeEach(() => {
  clearFeedbackErrors()
})
const handleSubmitFeedback = async () => {
  isSubmitting.value = true
  try {
    await submitFeedback(feedbackData.value)
  } catch (error) {
    console.error('Error submitting feedback:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
