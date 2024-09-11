import { getCurrentUser } from '@aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { useUserStore } from '~/server/stores/userStore';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on initial client load
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered)
        return

    const auth = await useAuthenticator()
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && auth.authStatus !== 'authenticated') {
        return navigateTo('/login')
    }

    if (auth.authStatus == 'authenticated') {
        const { userId } = await getCurrentUser()
        const userStore = useUserStore();
        userStore.initStore(userId)
    }

})
