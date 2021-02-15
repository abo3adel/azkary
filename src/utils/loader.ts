import { loadingController } from '@ionic/vue';

export const LOADER_MESSAGE = 'برجاء الإنتظار...';

export class Loader {
    private loader!: HTMLIonLoadingElement | null;
    private timeout = 50000;

    public async show(
        message = LOADER_MESSAGE,
        timeout = this.timeout
    ): Promise<void> {
        if (!this.loader) {
            this.loader = await loadingController.create({
                duration: timeout,
                message: message,
                //   translucent: true,
                cssClass: 'ion-loader',
                backdropDismiss: false,
            });
        }

        await this.loader.present();

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
