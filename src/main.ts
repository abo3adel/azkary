// import { User } from './entities/User';
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
import { User, UserEntity } from './schema/UserEntity';

const { Storage } = Plugins;

let app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(i18n);

router.isReady().then(async () => {
    if (isPlatform('desktop')) {
        // db();
    }
    // const { value } = await Storage.get({ key: 'firstDone' });
    // if (!value || value === 'undefined') {
    await loader.show();
    const user = (
        await (await db())
            .createQueryBuilder(UserEntity, 'user_ent')
            .select('dark, lang, fontSize, fontType, theme, azkarCount')
            .execute()
    )[0];
    // @ts-ignore
    // await Storage.set({ key: 'dark', value: user?.dark });

    // await Storage.set({ key: 'lang', value: user?.lang as string });
    // await Storage.set({ key: 'fontSize', value: `${user?.fontSize}` });
    // await Storage.set({ key: 'fontType', value: user?.fontType as string });
    // await Storage.set({ key: 'theme', value: user?.theme as string });

    Storage.set({ key: 'firstDone', value: 'yes' });
    // }

    app = app
        .provide('lang', user?.lang ?? 'ar')
        .provide('dark', user?.dark ?? false)
        .provide('fontSize', user?.fontSize ?? 1)
        .provide('fontType', user?.fontType ?? 'Cairo')
        .provide('theme', user?.theme ?? 'primary');

    app.mount('#app');
    await loader.hide();

    // Call the element loader after the platform has been bootstrapped
    defineCustomElements(window);
});
