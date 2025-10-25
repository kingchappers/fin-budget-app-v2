// import { fetchAuthSession, getCurrentUser } from '@aws-amplify/auth';
// import { useAuthenticator } from '@aws-amplify/ui-vue';
// import { useUserStore } from '~/server/stores/userStore';

// export default defineNuxtRouteMiddleware(async (to, from) => {
//     // skip middleware on initial client load
//     const nuxtApp = useNuxtApp()
//     if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered)
//         return

//     // Check if user is authenticated using Amplify Auth
//     // New code I'm trying
//     try {
//         const currentSession = await fetchAuthSession();
//         if (currentSession) {
//             // User is authenticated
//             console.log("Session found!");
//         } else {
//             // User is not authenticated
//             console.log("No session found.");
//         }
//     } catch (error) {
//         console.error("Error fetching auth session:", error);
//     }

//     const auth = await useAuthenticator()
//     const publicPages = ['/login', '/'];
//     const authRequired = !publicPages.includes(to.path);

//     if (authRequired && auth.authStatus !== 'authenticated') {
//         return navigateTo('/login')
//     }

//     if (auth.authStatus == 'authenticated') {
//         const { userId } = await getCurrentUser()
//         const userStore = useUserStore();
//         userStore.initStore(userId)
//     }

// })


import { getCurrentUser, fetchAuthSession } from '@aws-amplify/auth'
import { useAuthenticator } from '@aws-amplify/ui-vue'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server-side to avoid hydration issues
  if (process.server) return

  const auth = useAuthenticator()
  
  // Define public pages that don't require authentication
  const publicPages = ['/', '/login']
  const requiresAuth = !publicPages.includes(to.path)

  try {
    // Check authentication status
    const session = await fetchAuthSession()
    const isAuthenticated = auth.authStatus === 'authenticated' && session.tokens

    if (requiresAuth && !isAuthenticated) {
      // Redirect to login if authentication is required but user is not authenticated
      return navigateTo('/login')
    }

    // If authenticated, initialize user data
    if (isAuthenticated) {
      const user = await getCurrentUser()
      // You can store user data in a store here if needed
      console.log('Authenticated user:', user.userId)
    }

  } catch (error) {
    console.error('Auth check error:', error)
    // Redirect to login on error if page requires authentication
    if (requiresAuth) {
      return navigateTo('/login')
    }
  }
})