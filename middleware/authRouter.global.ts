import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { useUserStore } from '~/server/stores/userStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
    // skip middleware on server side
    if (import.meta.server) return

    // skip middleware on initial client load during hydration
    const nuxtApp = useNuxtApp()
    if (nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return

    const publicPages = ['/login', '/'];
    const authRequired = !publicPages.includes(to.path);

    try {
        // Check for valid session first
        const session = await fetchAuthSession();
        if (session?.tokens) {
            // Valid session exists
            const { userId } = await getCurrentUser()
            const userStore = useUserStore();
            userStore.initStore(userId)
            console.log("Session found!");
            return; // Allow navigation to proceed
        } 
        
        if (authRequired) {
            // No valid session and auth is required
            console.log("No valid session. Redirecting to login.");
            return navigateTo('/login');
        }
    } catch (error) {
        console.error("Auth sessions error:", error);
        if (authRequired) {
            return navigateTo('/login');
        }
    }
})
