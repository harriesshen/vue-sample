import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhTw from './zhTw.json'

export const languagesList = ['en', 'zhTw']

const localeMessage = { en: en, zhTw: zhTw }

type MessageType = typeof en

export const i18n = createI18n<[MessageType], 'en' | 'zhTw'>({
  legacy: false,
  locale: 'zhTw', // 設定預設語系
  fallbackLocale: 'en', // 設定備用語系
  messages: localeMessage,
})
