import { fetchAuthSession, getCurrentUser, type AuthTokens, type AuthUser } from '@aws-amplify/auth'

export const useAuth = () => {
    const authState = useState('auth', () => ({
        isAuthenticated: false,
        isLoading: true,
        user: null as AuthUser | null,
        tokens: null as AuthTokens | null,
        error: null as string | null
    }))

    const checkAuth = async () => {
        authState.value.isLoading = true
        authState.value.error = null

        try {
            // Try to load tokens from storage first
            const storedTokens = localStorage.getItem('auth_tokens')
            if (storedTokens) {
                const parsed = JSON.parse(storedTokens)
                if (parsed?.accessToken && parsed?.idToken) {
                    authState.value.tokens = parsed
                    authState.value.isAuthenticated = true
                }
            }

            // Always verify with Amplify
            const session = await fetchAuthSession()
            const user = await getCurrentUser()

            authState.value.isAuthenticated = !!session.tokens
            authState.value.tokens = session.tokens ?? null
            authState.value.user = user

            // Persist tokens and user
            if (session.tokens) {
                localStorage.setItem('auth_tokens', JSON.stringify(session.tokens))
                const cookie = useCookie('auth_token', { 
                    maxAge: 3600,
                    path: '/',
                    secure: true
                })
                cookie.value = session.tokens.accessToken.toString()

                // Also store idToken for API calls that need it
                const idTokenCookie = useCookie('auth_id_token', {
                    maxAge: 3600,
                    path: '/',
                    secure: true
                })
                idTokenCookie.value = session.tokens.idToken.toString()
            }

            return session.tokens
        } catch (error) {
            console.error('Auth check error:', error)
            authState.value.isAuthenticated = false
            authState.value.user = null
            authState.value.tokens = null
            authState.value.error = error instanceof Error ? error.message : 'Authentication failed'
            
            // Clear stored tokens on error
            localStorage.removeItem('auth_tokens')
            const cookie = useCookie('auth_token')
            const idTokenCookie = useCookie('auth_id_token')
            cookie.value = null
            idTokenCookie.value = null
        } finally {
            authState.value.isLoading = false
        }
    }

    return {
        authState,
        checkAuth
    }
}