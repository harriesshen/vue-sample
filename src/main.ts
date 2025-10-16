import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import messages from './locales'
const app = createApp(App)

console.log('locale messages', messages)
const i18n = createI18n({
  legacy: false,
  locale: 'zhTW', // 設定預設語系
  fallbackLocale: 'en', // 設定備用語系
  messages,
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
