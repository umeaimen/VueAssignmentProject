<template>
  <div class="vue-tempalte">
    <div class="inner-block mt-5">
      <div class="table-responsive my-5">
        <DataTable :fields="fields" :feedbackData="feedbackData"></DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { feedbackData, fields, fetchFeedbackData } from '../../api/feedback';
import DataTable from '../../components/DataTable.vue';


fetchFeedbackData();
</script>
<style scoped>
 .inner-block{
    width: 1200px;
 }

</style>