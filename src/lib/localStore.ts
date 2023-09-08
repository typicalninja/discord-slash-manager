
import { persisted } from 'svelte-local-storage-store'

export enum StoreKeys {
    auth = 'manager.authentication',
    appInfo = 'manager.application'
}

export const authStore = persisted(StoreKeys.auth, {
    accessToken: '',
    clientId: '',
    clientSecret: '',
});

export const applicationInfo = persisted(StoreKeys.appInfo, {
    username: '',
    id: '',
    // for forseeable future discriminator is staying for bots
    discriminator: '',
})
