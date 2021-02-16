import { User } from './entities/User';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { IonicVue, isPlatform } from '@ionic/vue';

import i18n from './i18n';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './assets/tailwind.css';
import db from './utils/db';
import loader from './utils/loader';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(i18n);

router.isReady().then(async () => {
    if (isPlatform('desktop')) {
        // db();
    }
    const {value} = await Storage.get({key: 'fontSize'});
    if (!value || value === 'undefined') {
        await loader.show();
        const user = await (await db()).getRepository(User).findOne();
        await Storage.set({key: 'fontSize', value: `${user?.fontSize}`});
        await Storage.set({key: 'theme', value: user?.theme as string});
        await Storage.set({key: 'user', value: JSON.stringify(user)});
    }

    app.mount('#app');
    await loader.hide();

    // Call the element loader after the platform has been bootstrapped
    defineCustomElements(window);
});
