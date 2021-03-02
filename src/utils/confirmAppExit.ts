import { Plugins } from '@capacitor/core';
const { Modals, App } = Plugins;

export default async function confirmAppExit(self: any) {
    const confirmRet = await Modals.confirm({
        title: self.$t('app.confirmExit'),
        message: '',
        okButtonTitle: self.$t('zikr.del.okBtn'),
        cancelButtonTitle: self.$t('zikr.del.cancelBtn'),
    });

    if (confirmRet?.value) {
        App.exitApp();
    }
}
