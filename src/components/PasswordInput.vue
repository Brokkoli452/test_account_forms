<template>
  <v-text-field
      v-model="passRef"
      @blur="send()"
      :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
      :type="visible ? 'text' : 'password'"
      @click:append-inner="visible = !visible"
  ></v-text-field>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useAccountStore} from "../../stores/accountStore";
import {storeToRefs} from "pinia";
import {computed, onMounted} from "vue";
const {updateAccount} = useAccountStore();
const $refs =  storeToRefs(useAccountStore())
const accounts = computed(() => $refs.accounts.value)

const passRef = ref('')
const visible = ref(false)

const props = defineProps({
  account: Object,
  index: Number,
})

function send() {
  const password = passRef.value
  // Валидация
  if (password.length <= 100 && password.length > 0) {
    updateAccount(props.index, 'password', password)
  }
}

onMounted(() => passRef.value = props.account?.password || '')
</script>

<style scoped>

</style>