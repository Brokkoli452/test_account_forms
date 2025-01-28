<template>
  <div>
    <v-btn color="primary" @click="addAccount" class="mb-4">
      + Добавить учетную запись
    </v-btn>

    <v-card v-for="(account, index) in accounts" :key="index" class="mb-4">
      <v-card-text>
        <v-text-field
            v-model="account.label"
            label="Метка (необязательно)"
            placeholder="Введите метку"
            @blur="validateAccount(index)"
        ></v-text-field>

        <v-select
            v-model="account.type"
            :items="['LDAP', 'Локальная']"
            label="Тип записи"
            @change="validateAccount(index)"
        ></v-select>

        <v-text-field
            v-model="account.login"
            label="Логин"
            placeholder="Введите логин"
            :rules="[requiredRule]"
            @blur="validateAccount(index)"
        ></v-text-field>

        <v-text-field
            v-if="account.type === 'Локальная'"
            v-model="account.password"
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
            :rules="[requiredRule]"
            @blur="validateAccount(index)"
        ></v-text-field>

        <v-btn color="error" @click="removeAccount(index)">
          Удалить
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/accountStore';
import { ref } from 'vue';

const accountStore = useAccountStore();
const { accounts, addAccount, removeAccount, updateAccount } = accountStore;

const requiredRule = (value: string) => !!value || 'Обязательное поле';

const validateAccount = (index: number) => {
  const account = accounts[index];
  if (account.login === '' || (account.type === 'Локальная' && account.password === '')) {
    alert('Пожалуйста, заполните все обязательные поля.');
  } else {
    updateAccount(index, account);
  }
};
</script>

<style scoped>
/* Дополнительные стили, если нужны */
</style>