export function setStyles(theme: string, fontType: string, fontSize: string) {
    const st = document.createElement('style');
    st.innerHTML = `#app {--ion-color-primary: var(--ion-color-${theme});--ion-color-primary-rgb: var(--ion-color-${theme}-rgb);--ion-color-primary-contrast: var(--ion-color-${theme}-contrast);--ion-color-primary-contrast-rgb: var(--ion-color-${theme}-contrast-rgb);--ion-color-primary-shade: var(--ion-color-${theme}-shade);--ion-color-primary-tint: var(--ion-color-${theme}-tint);--ion-default-font: '${fontType}', 'Roboto', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica;}
    `;

    if (parseFloat(fontSize) !== 1.0) {
        st.innerHTML += `*:not(ion-icon) {font-size: ${fontSize}rem;}ion-button , ion-button ion-label {font-size: ${parseFloat(fontSize)-.1}rem;}`;
    }

    st.id = 'custom-styles';

    (document.documentElement.querySelector(
        'head'
    ) as HTMLHeadElement).appendChild(st);
}
