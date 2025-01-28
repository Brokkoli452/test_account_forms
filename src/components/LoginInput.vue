<template>
  <v-text-field
      v-model="loginRef"
      @blur="send()"
  ></v-text-field>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useAccountStore} from "../../stores/accountStore";
import {storeToRefs} from "pinia";

const {updateAccount} = useAccountStore();
const $refs =  storeToRefs(useAccountStore())
const accounts = computed(() => $refs.accounts.value)

const loginRef = ref('')

const props = defineProps({
  account: Object,
  index: Number,
})

function send() {
  const login = loginRef.value
  // Валидация
  if (login.length <= 100 && login.length > 0) {
    updateAccount(props.index, 'login', login)
  }
}

onMounted(() => loginRef.value = props.account?.login || '')
</script>

<style scoped>

</style>