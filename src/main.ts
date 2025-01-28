import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import 'vuetify/styles';
import vuetify from "../plugins/vuetify";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(vuetify);
app.mount('#app')
