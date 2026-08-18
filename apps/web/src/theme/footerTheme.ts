import type { PageTheme } from '@/router'

// 页脚各主题下的 CSS 变量表：数据与组件分离，AppFooter.vue 只负责把 resolveFooterVars 的结果绑到根节点
const FOOTER_THEME_VARS: Record<PageTheme, Record<string, string>> = {
  dark: {
    '--footer-bg': '#121212',
    '--footer-border': '#323232',
    '--footer-text': '#FFFFFF',
    '--footer-text-secondary': '#FFFFFF',
    '--footer-link-hover': 'var(--brand-accent)',
    '--footer-qr-bg': '#D9D9D9'
  },
  light: {
    '--footer-bg': '#F5F5F5',
    '--footer-border': '#E5E5E5',
    '--footer-text': '#1E1E1E',
    '--footer-text-secondary': '#4A4A4A',
    '--footer-link-hover': 'var(--brand-accent)',
    '--footer-qr-bg': '#EFEFEF'
  }
}

export function resolveFooterVars(theme: PageTheme): Record<string, string> {
  return FOOTER_THEME_VARS[theme] ?? FOOTER_THEME_VARS.dark
}
