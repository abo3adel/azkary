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
    volume: 0.5,
};

export const CLICK_SOUND = '/assets/sound/zapsplat_click.mp3';

export async function loadConfigrations(
    self: any,
    addToSelect = ''
): Promise<User> {
    const toSelect = isPlatform('hybrid')
        ? 'sebhaAutoNext, sound, volume, vibration, hardKeys, touch' +
          addToSelect
        : 'sebhaAutoNext, sound, volume, keyboard, touch' + addToSelect;
    const res = (
        await (await db())
            .createQueryBuilder(UserEntity, 'user_set')
            .select(toSelect)
            .execute()
    )[0] as User;

    self.config.autoNext = res.sebhaAutoNext;
    self.config.sound = res.sound;
    self.config.volume = res.volume ?? 0.5;
    self.config.vibration = res.vibration;
    self.config.hardKeys = res.hardKeys;
    self.config.touch = res.touch;
    self.config.keyboard = res.keyboard;

    if (self.config.sound) {
        await sound.addFile(CLICK_SOUND, self.config.volume);
    }

    return res;
}
