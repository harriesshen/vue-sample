import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: (): {
    isAuthenticated: boolean
    userEmail: string | null
  } => ({
    isAuthenticated: false,
    userEmail: null,
  }),
  getters: {},
  actions: {
    login(email: string, _password: string) {
      // Demo login: accept any non-empty credentials
      if (email.trim().length > 0) {
        this.isAuthenticated = true
        this.userEmail = email
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      this.userEmail = null
    },
  },
})
