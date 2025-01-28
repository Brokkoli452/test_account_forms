<template>
  <v-text-field
      v-model="labelRef"
      @blur="send()"
  />
</template>

<script setup lang="ts">
import {useAccountStore} from "../../stores/accountStore";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";

const {updateAccount} = useAccountStore();
const $refs =  storeToRefs(useAccountStore())
const accounts = computed(() => $refs.accounts.value)

const labelRef = ref('')
const visible = ref(false)

const props = defineProps({
  account: Object,
  index: Number,
})

function send() {
  let label = labelRef.value
  const labelArr = label.split(';').map(x => ({text: x.trim()}))
  // Валидация
  if (label.length <= 50) {
    updateAccount(props.index, 'labels', labelArr)
  }
}
const labels = props.account?.labels.reduce((acc: string[], val: {text: string}) => [...acc, val.text], []).join('; ')
onMounted(() => labelRef.value = labels || '')
</script>

<style scoped>

</style>