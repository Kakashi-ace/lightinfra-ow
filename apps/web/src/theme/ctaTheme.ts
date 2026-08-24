import type { PageTheme } from '@/router'

// CTA 各主题下的 CSS 变量表：数据与组件分离，CtaSection.vue 只负责把 resolveCtaVars 的结果绑到根节点
const CTA_THEME_VARS: Record<PageTheme, Record<string, string>> = {
  dark: {
    '--cta-bg': '#121212',
    '--cta-title-color': '#FFFFFF',
    '--cta-subtitle-color': '#AFAFAF',
    '--cta-btn-border': '#FFFFFF',
    '--cta-btn-color': '#FFFFFF',
    '--cta-glow': 'radial-gradient(circle, #0073FF 0%, rgba(19, 19, 19, 0) 70%)',
    '--cta-blend': 'screen'
  },
  light: {
    '--cta-bg': '#FFFFFF',
    '--cta-title-color': '#121212',
    '--cta-subtitle-color': '#555555',
    '--cta-btn-border': '#121212',
    '--cta-btn-color': '#121212',
    '--cta-glow': 'radial-gradient(circle, #0073FF 0%, rgba(0, 115, 255, 0) 70%)',
    '--cta-blend': 'normal'
  }
}

export function resolveCtaVars(theme: PageTheme): Record<string, string> {
  return CTA_THEME_VARS[theme] ?? CTA_THEME_VARS.dark
}
