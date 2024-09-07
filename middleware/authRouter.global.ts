import { useAuthenticator } from '@aws-amplify/ui-vue';

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on initial client load
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered)
        return

    const auth = useAuthenticator()
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && auth.authStatus !== 'authenticated') {
        return navigateTo('/login')
    }
    console.log(auth.authStatus)
})
