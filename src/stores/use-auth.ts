import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const userEmail = ref<string | null>(null)

  const login = (email: string, _password: string) => {
    // Demo login: accept any non-empty credentials
    if (email.trim().length > 0) {
      isAuthenticated.value = true
      userEmail.value = email
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    userEmail.value = null
  }

  return { isAuthenticated, userEmail, login, logout }
})
