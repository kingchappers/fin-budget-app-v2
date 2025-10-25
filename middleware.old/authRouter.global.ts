import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { useUserStore } from '~/server/stores/userStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on initial client load
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered)
        return

    // Check if user is authenticated using Amplify Auth
    // New code I'm trying
    try {
        const currentSession = await fetchAuthSession();
        if (currentSession) {
            // User is authenticated
            console.log("Session found!");
        } else {
            // User is not authenticated
            console.log("No session found.");
        }
    } catch (error) {
        console.error("Error fetching auth session:", error);
    }

    const auth = await useAuthenticator()
    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);

    // if (authRequired && auth.authStatus !== 'authenticated') {
    //     return navigateTo('/login')
    // }

    // if (auth.authStatus == 'authenticated') {
    //     const { userId } = await getCurrentUser()
    //     const userStore = useUserStore();
    //     userStore.initStore(userId)
    // }

})
