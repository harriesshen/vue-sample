<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

function onSubmit() {
  error.value = ''
  const ok = auth.login(email.value, password.value)
  if (ok) {
    router.replace({ path: '/dashboard' })
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<template>
  <div class="relative w-full max-w-md">
    <div
      class="pointer-events-none absolute -inset-x-6 -top-6 h-40 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent">
    </div>
    <div class="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
      <div class="mb-6 flex items-center gap-3">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-px">
          <div class="h-full w-full rounded-lg bg-slate-950"></div>
        </div>
        <div>
          <div class="text-xs uppercase tracking-widest text-cyan-400/80">Welcome</div>
          <div class="text-xl font-semibold">Sign in</div>
        </div>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="mb-1 block text-xs text-slate-300">Email</label>
          <input v-model="email" type="email" required autocomplete="username"
            class="w-full rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500"
            placeholder="you@example.com" />
        </div>
        <div>
          <label class="mb-1 block text-xs text-slate-300">Password</label>
          <input v-model="password" type="password" required autocomplete="current-password"
            class="w-full rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500"
            placeholder="••••••••" />
        </div>
        <div v-if="error" class="text-xs text-rose-400">{{ error }}</div>
        <button type="submit"
          class="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:from-cyan-400 hover:to-fuchsia-400">Sign
          in</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
