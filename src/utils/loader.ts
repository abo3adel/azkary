import { Plugins } from '@capacitor/core';
import { loadingController } from '@ionic/vue';

const {Storage} = Plugins;

export const LOADER_MESSAGE_AR = 'يرجى الإنتظار ...';
export const LOADER_MESSAGE_EN = 'please wait ...';

export class Loader {
    private loader!: HTMLIonLoadingElement | null;
    private timeout = 8000; // 8 sec
    private locale = 'ar';

    public constructor() {
        Storage.get({ key: 'lang' }).then((r) => (this.locale = r.value ?? this.locale));
    }

    public async show(locale = this.locale): Promise<void> {
        const message = locale === 'ar' ? LOADER_MESSAGE_AR : LOADER_MESSAGE_EN;
        if (!this.loader) {
            this.loader = await loadingController.create({
                duration: this.timeout,
                message: message,
                //   translucent: true,
                cssClass: 'ion-loader',
                backdropDismiss: false,
            });
            await this.loader.present();
        }

        setTimeout(async () => {
            if (this.loader) {
                await this.loader.dismiss();
                this.loader = null;
            }
        }, this.timeout);
    }

    public async hide() {
        if (this.loader) {
            await this.loader.dismiss();
            this.loader = null;
        }
    }
}

const loader = new Loader();
export default loader;
