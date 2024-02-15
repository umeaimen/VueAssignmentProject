<template>
  <div class="inner-block">
    <div class="vue-template">
      <div class="row">
        <div class="col-md-12 mb-2"  v-if="authenticated">
          <RouterLink class="btn btn-dark btn-sm float-end" to="/create-feedback">Add Feedback</RouterLink>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div v-for="feedback in paginatedFeedbackList" :key="feedback.id" class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-1 px-4 py-4">
                <img
                  alt="Card image"
                  class="logo"
                  src="@/assets/avatar.svg"
                  width="70"
                  height="70"
                />
              </div>
              <div class="col-md-11 px-4 py-2">
                <div class="card-body">
                  <div class="text-muted d-flex justify-content-between align-items-start">
                    <div>
                      <h5 class="card-title">Submitted by: {{ feedback.username }}</h5>
                    </div>
                    <div>{{ feedback.created_at }}</div>
                  </div>
                  <div class="text-muted d-flex justify-content-between align-items-start">
                    <div>
                      <p class="card-text">{{ feedback.description }}</p>
                    </div>
                    <div v-if="authenticated">
                      <RouterLink :to="`/edit-feedback/${feedback.id}`"
                        ><i class="bi bi-pencil-square"></i>
                      </RouterLink>
                      <a @click="confirmDelete(feedback.id)"><i class="bi bi-trash"></i></a>
                    </div>
                  </div>
                  <p class="card-text">
                    <small class="text-muted">Category: {{ feedback.category }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <nav aria-label="Pagination">
            <ul class="pagination">
              <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber">
                <a class="page-link" @click="setCurrentPage(pageNumber)">{{ pageNumber }}</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import axios from 'axios'
import useAuth from '../auth/useAuth.js'
import Swal from 'sweetalert2'

const feedbackList = ref([])
const itemsPerPage = 5 
const currentPage = ref(1)
const { getAuthenticated: authenticated } = useAuth()
const token = localStorage.getItem('token')

const fetchFeedbackData = async () => {
  try {
    let response
    if (token) {
      const bearToken = JSON.parse(localStorage.getItem('token'))
      axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken.token}`
      response = await axios.get('/api/user/feedback')
    } else {
      response = await axios.get('/api/feedback/index')
    }
    feedbackList.value = response.data
  } catch (error) {
    console.error('Error fetching feedback:', error)
  }
}

// Fetch feedback data when the component is mounted
fetchFeedbackData()

// Calculate total number of pages
const totalPages = computed(() => Math.ceil(feedbackList.value.length / itemsPerPage))

// Slice feedbackList to get the current page's data
const paginatedFeedbackList = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return feedbackList.value.slice(startIndex, endIndex)
})

// Set current page
const setCurrentPage = (pageNumber) => {
  currentPage.value = pageNumber
}

const confirmDelete = (feedbackId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteFeedback(feedbackId)
    }
  })
}
const deleteFeedback = async (feedbackId) => {
  try {
    const response = await axios.delete(`/api/feedback/${feedbackId}`)
    fetchFeedbackData() // Refresh feedback data after deletion
    Swal.fire('Deleted!', 'Your feedback has been deleted.', 'success')
  } catch (error) {
    console.error('Error deleting feedback:', error)
    Swal.fire('Error!', 'Failed to delete feedback.', 'error')
  }
}
</script>
<style scoped>
.inner-block {
  width: 1200px;
}
</style>
