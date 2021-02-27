import { isPlatform } from '@ionic/vue';
import { SocialSharing } from '@ionic-native/social-sharing';
import toast from './toast';
import { Plugins } from '@capacitor/core';
const { Share, Clipboard } = Plugins;

/**
 * share using native devise share and 
 * fallback to web share api or just copy body
 * 
 * @param body
 * @param title
 */
export default async function share(
    self: any,
    body: string,
    title?: string,
): Promise<void> {
    if (isPlatform('hybrid')) {
        await SocialSharing.share(body, title);
        return;
    }

    // desktop
    try {
        await Share.share({
            title,
            text: body,
            url: '',
            dialogTitle: title,
        });
    } catch (e) {
        await Clipboard.write({
            string: body,
        });
        toast(self.$t('copied.done'));
    }
}
