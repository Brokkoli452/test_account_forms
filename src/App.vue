<template>
  <v-app>
    <v-container class="d-flex flex-column" style="width: 70%">
      <AccountForm/>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import AccountForm from './components/AccountForm.vue';
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>