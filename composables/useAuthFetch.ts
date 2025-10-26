import { useAuth } from "./useAuth"

export const useAuthFetch = () => {
  const { authState, checkAuth } = useAuth()

  return async (url: string, options: any = {}) => {
    // Ensure we have tokens (try to refresh/resolve if possible)
    if (!authState.value.tokens) {
      try {
        await checkAuth()
      } catch (e) {
        // swallow — checkAuth already logs
      }
    }

    const headers = { ...options.headers }
    if (authState.value.tokens?.accessToken) {
      headers.Authorization = `Bearer ${authState.value.tokens.accessToken}`
    }

    // Use $fetch (returns a resolved value) so callers don't need to deal with the
    // reactive return value from useFetch.
    return $fetch(url, { ...options, headers })
  }
}