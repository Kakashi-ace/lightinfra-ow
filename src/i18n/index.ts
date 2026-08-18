import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import en from './locales/en'
import type { MessageSchema } from './locales/zh-CN'

export type AppLocale = 'zh-CN' | 'en'

export const LOCALE_KEY = 'lightinfra-locale'

function isAppLocale(value: string | null): value is AppLocale {
  return value === 'en' || value === 'zh-CN'
}

// 读取持久化的语言；无则默认简体中文
function resolveInitialLocale(): AppLocale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (isAppLocale(saved)) return saved
  } catch {
    /* localStorage 不可用时忽略 */
  }
  return 'zh-CN'
}

const i18n = createI18n<[MessageSchema], AppLocale, false>({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    en,
  },
})

export default i18n
