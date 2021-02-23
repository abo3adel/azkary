import { isPlatform } from '@ionic/vue';
import { Plugins } from '@capacitor/core';

const { NativeAudio } = Plugins;

class Sound {
    private audio: any;

    constructor() {
        this.audio = isPlatform('hybrid') ? NativeAudio : null;
    }

    public async addFile(path: string, id: string) {
        if (isPlatform('hybrid')) {
            await this.audio.preloadSimple({
                assetPath: path,
                assetId: id,
            });
        } else {
            this.audio = new Audio(path);
        }
    }

    public play(id: string) {
        this.audio.play(id);
    }
}

const sound = new Sound();
export default sound;
