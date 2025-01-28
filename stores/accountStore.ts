import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Account {
    labels: string[];
    type: 'LDAP' | 'Локальная';
    login: string;
    password: string | null;
}

export const useAccountStore = defineStore('account', () => {
    const accounts = ref<Account[]>([]);

    const addAccount = () => {
        accounts.value.push({
            labels: [],
            type: 'Локальная',
            login: '',
            password: null,
        });
    };

    const removeAccount = (index: number) => {
        accounts.value.splice(index, 1);
    };

    const updateAccount = (index: number, param: string, newVal: string) => {
        const account = accounts.value[index];
        accounts.value[index] = {...account, [param]: newVal};
    };

    return { accounts, addAccount, removeAccount, updateAccount };
}, {persist: true});