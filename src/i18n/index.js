import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.js'
import en from './locales/en.js'

const LOCALE_KEY = 'lightinfra-locale'

// 读取持久化的语言；无则默认简体中文
function resolveInitialLocale() {
  try {
    const saved = localStorage.getItem(LOCALE_KEY)
    if (saved === 'en' || saved === 'zh-CN') return saved
  } catch (e) {
    /* localStorage 不可用时忽略 */
  }
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    'en': en
  }
})

export { LOCALE_KEY }
export default i18n
