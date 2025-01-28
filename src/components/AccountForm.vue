<template>


  <div class="d-flex align-center">
    <h1 class="text-h5 text-black">Учётные записи</h1>
    <!-- Кнопка добавления новой записи -->
    <v-btn @click="addAccount" size="50" variant="outlined" class="opacity-60 ma-2">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
  <div style="width: max-content; background-color: rgba(0,200,255,0.1)" class="mb-4 pr-2 d-flex align-center"><v-icon>mdi-help-circle-outline</v-icon> Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</div>

  <v-card class="overflow-visible d-flex w-100">
    <v-card-text>
      <!-- Подписи колонок -->
      <v-row class="font-weight-bold">
        <v-col cols="3" class="w-25 d-flex justify-center opacity-50">Метка</v-col>
        <v-col cols="2" class="d-flex justify-center opacity-50">Тип записи</v-col>
        <v-col cols="3" class="d-flex justify-center opacity-50">Логин</v-col>
        <v-col cols="3" class="d-flex justify-center opacity-50">Пароль</v-col>
        <v-col cols="1" class="d-flex justify-center opacity-50"></v-col>
      </v-row>

      <!-- Список записей -->
      <v-row v-for="(account, index) in accounts" :key="index" class="mt-2">
        <!-- Метка -->
        <v-col cols="3"
               class="d-flex align-center"
        >
          <LabelInput
              :account="account"
              :index="index"
              :rules="[value => value.length <= 50 || 'Максимум 50 символов!']"
              density="compact"
              variant="outlined"
              placeholder="Значение"
              dense
          />
        </v-col>

        <!-- Тип записи -->
        <v-col cols="2"
               class="d-flex align-center"
        >
          <v-select
              density="compact"
              variant="outlined"
              v-model="account.type"
              @update:model-value="(account.type === 'LDAP') ? account.password = null : ''"
              :items="['LDAP', 'Локальная']"
              dense
          ></v-select>
        </v-col>
        <!-- Логин -->
        <v-col :cols="(account.type === 'Локальная') ? 3 : 6"
               class="d-flex align-center"
        >
          <LoginInput
              :account="account"
              :index="index"
              :rules="[value => !!value || 'Необходимое поле', value => value.length <= 100 || 'Максимум 100 символов!']"
              density="compact"
              variant="outlined"
              placeholder="Значение"
              dense
              spellcheck="false"
          />
        </v-col>

        <!-- Пароль -->
        <v-col
            cols="3"
            v-if="account.type === 'Локальная'"
            class="d-flex align-center"
        >
          <PasswordInput
              :account="account"
              :index="index"
              :rules="[value => !!value || 'Необходимое поле', value => value.length <= 100 || 'Максимум 100 символов!']"
              density="compact"
              variant="outlined"
              placeholder="Пароль"
          />
        </v-col>
        <!-- Кнопка удаления -->
        <v-col style="height: 60px; width: 60px; padding: 12px" cols="1" class="d-flex align-center justify-center">
          <v-btn @click="removeAccount(index)" variant="plain" icon>
            <v-icon color="black">mdi-delete</v-icon>
          </v-btn>
        </v-col>

      </v-row>

      <!-- Блок появляется, если список записей пуст -->
      <v-row v-if="accounts.length === 0" class="mt-2">
        <!-- Метка -->
        <v-col cols="3"
               class="d-flex align-center justify-center opacity-50"
        >
          -
        </v-col>

        <!-- Тип записи -->
        <v-col cols="3"
               class="d-flex align-center justify-center opacity-50"
        >
          -
        </v-col>
        <!-- Логин -->
        <v-col cols="3"
               class="d-flex align-center justify-center opacity-50"
        >
          -
        </v-col>

        <!-- Пароль -->
        <v-col cols="3"
               class="d-flex align-center justify-center opacity-50"
        >
          -
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useAccountStore} from "../../stores/accountStore";
import {storeToRefs} from "pinia";
import PasswordInput from "@/components/PasswordInput.vue";
import LoginInput from "@/components/LoginInput.vue";
import LabelInput from "@/components/LabelInput.vue";

const {removeAccount, addAccount} = useAccountStore();
const $refs =  storeToRefs(useAccountStore())
const accounts = computed(() => $refs.accounts.value)


</script>

<style scoped>
.v-text-field,
.v-select {
  width: 100%;
}
</style>