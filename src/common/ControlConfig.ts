import db from '@/utils/db';
import { User, UserEntity } from './../schema/UserEntity';
import { isPlatform } from '@ionic/vue';
import sound from '@/utils/sound';

export const Controls = {
    autoNext: true,
    sound: false,
    vibration: true,
    hardKeys: false,
    touch: true,
    keyboard: true,
};

export const CLICK_SOUND = '/assets/sound/zapsplat_click.mp3';

export async function loadConfigrations(self: any): Promise<void> {
    const toSelect = isPlatform('hybrid')
        ? 'sebhaAutoNext, sound, vibration, hardKeys, touch'
        : 'sebhaAutoNext, sound, keyboard, touch';
    const res = (
        await (await db())
            .createQueryBuilder(UserEntity, 'user_set')
            .select(toSelect)
            .execute()
    )[0] as User;

    self.config.autoNext = res.sebhaAutoNext;
    self.config.sound = res.sound;
    self.config.vibration = res.vibration;
    self.config.hardKeys = res.hardKeys;
    self.config.touch = res.touch;
    self.config.keyboard = res.keyboard;

    if (self.config.sound) {
        await sound.addFile(CLICK_SOUND, 'click');
    }

    return;
}