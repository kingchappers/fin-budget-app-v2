import { useAuthenticator } from '@aws-amplify/ui-vue';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthenticator()
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);

    if (authRequired && auth.authStatus === 'authenticated') {
        return navigateTo('/login')
    }
})
