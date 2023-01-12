// plugins/router.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$router.options.scrollBehavior = (to: any, from: any, savedPosition: { left: any; top: any; }) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    left: savedPosition?.left || 0,
                    top: savedPosition?.top || 0,
                    behavior: 'instant',
                });
            }, 250);
        });
    }
});
