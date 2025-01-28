import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Импортируем Material Design Icons
import '@mdi/font/css/materialdesignicons.css'; // Подключаем стили

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // Указываем набор иконок по умолчанию
        aliases,
        sets: {
            mdi,
        },
    },
});