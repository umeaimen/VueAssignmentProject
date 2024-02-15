<template>
  <div class="vue-tempalte">
    <div class="inner-block">
      <div class="table-responsive">
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