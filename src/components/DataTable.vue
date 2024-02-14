<template>
  <div>
    <div class="d-flex justify-content-between">
      <form>
        <label>Search</label>
        <div class="mb-2">
          <input type="text" @input="search" placeholder="Search" class="form-control w-75" />
        </div>
      </form>
      <div class="">
         <label>Sort By:</label>
          <select v-model="sortBy" @change="sortItems" class="form-select w-75">
            <option value="latest">Latest</option>
            <option value="old">Old</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
      </div>
    </div>
    <table id="tableComponent" class="table table-bordered table-striped" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th v-for="field in fields" :key="field" @click="sortTable(field)">
            <span>{{ field }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in paginatedItems" :key="item.id">
          <td v-for="field in fields" :key="field">{{ item[field] }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination controls -->
    <nav aria-label="Pagination">
      <ul class="pagination">
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber">
          <a class="page-link" @click="setCurrentPage(pageNumber)">{{ pageNumber }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  feedbackData: {
    type: Array,
    required: true
  },
  fields: {
    type: Array,
    required: true
  }
})

const searchFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 2 
const sortBy = ref('latest') 

const filteredItems = computed(() => {
      let filtered = props.feedbackData
 if (searchFilter.value !== '') {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        item.description.toLowerCase().includes(searchFilter.value.toLowerCase())
    )
  }
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    case 'old':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'asc':
      filtered.sort((a, b) => a.created_at.localeCompare(b.created_at))
      break
    case 'desc':
      filtered.sort((a, b) => b.created_at.localeCompare(a.created_at))
      break
    default:
      break
  }
   return filtered
})

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredItems.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const search = (e) => {
  const search = e.target.value
  searchFilter.value = search
}

const sortTable = (field) => {
  if (sortByField === field) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
  } else {
    sortDirection = 'asc'
  }
  sortByField = field
  filteredItems.value.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[field].localeCompare(b[field])
    } else {
      return b[field].localeCompare(a[field])
    }
  })
}

const setCurrentPage = (pageNumber) => {
  currentPage.value = pageNumber
}
</script>

