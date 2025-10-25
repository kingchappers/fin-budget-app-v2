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
    const auth = useAuthenticator();

    try {
        const session = await fetchAuthSession();
        
        if (session?.tokens) {
            // Check if tokens are expired
            const exp = session.tokens?.accessToken?.payload?.exp;
            if (!exp) {
                // If exp is missing treat session as invalid
                console.warn("Token has no exp claim, signing out");
                await auth.signOut();
                return navigateTo('/login');
            }

            const expiresAt = exp * 1000; // Convert to milliseconds
            const now = Date.now();

            if (now >= expiresAt) {
                console.log("Token expired, signing out");
                await auth.signOut();
                return navigateTo('/login');
            }

            // Valid session exists
            try {
                const { userId } = await getCurrentUser();
                const userStore = useUserStore();
                userStore.initStore(userId);
                console.log("Session valid, proceeding");
                return;
            } catch (userError) {
                console.error("Error getting current user:", userError);
                return navigateTo('/login');
            }
        }

        if (authRequired) {
            console.log("No valid session. Redirecting to login.");
            return navigateTo('/login');
        }
    } catch (error) {
        console.error("Auth session error:", error);
        if (authRequired) {
            return navigateTo('/login');
        }
    }
})