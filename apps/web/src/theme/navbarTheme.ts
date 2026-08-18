import type { PageTheme } from '@/router'

// 导航栏各状态下的 CSS 变量表：数据与组件分离，AppNavbar.vue 只负责把 resolveNavbarVars 的结果绑到根节点。
// 未滚动时统一使用 transparent 一档（各页面 Hero 顶部都是深色蒙层/纯色/渐变，浅色文字足够可读）；
// 滚动固化后按页面主题在 dark / light 二档间切换。
const NAVBAR_THEME_VARS: Record<'transparent' | PageTheme, Record<string, string>> = {
  transparent: {
    '--nav-bg': 'transparent',
    '--nav-backdrop': 'none',
    '--nav-shadow': 'none',
    '--nav-text': '#BBBBBB',
    '--nav-text-hover': '#FFFFFF',
    '--nav-active-text': '#FFFFFF',
    '--nav-active-bg': 'rgba(255, 255, 255, 0.14)',
    '--nav-btn-text': '#FFFFFF',
    '--nav-btn-border': 'rgba(255, 255, 255, 0.5)',
    '--nav-btn-border-hover': '#FFFFFF',
    '--nav-btn-hover-bg': 'rgba(255, 255, 255, 0.1)'
  },
  dark: {
    '--nav-bg': 'rgba(18, 18, 18, 0.82)',
    '--nav-backdrop': 'blur(12px)',
    '--nav-shadow': 'none',
    '--nav-text': '#BBBBBB',
    '--nav-text-hover': '#FFFFFF',
    '--nav-active-text': '#FFFFFF',
    '--nav-active-bg': 'rgba(255, 255, 255, 0.14)',
    '--nav-btn-text': '#FFFFFF',
    '--nav-btn-border': 'rgba(255, 255, 255, 0.5)',
    '--nav-btn-border-hover': '#FFFFFF',
    '--nav-btn-hover-bg': 'rgba(255, 255, 255, 0.1)'
  },
  light: {
    '--nav-bg': 'rgba(255, 255, 255, 0.85)',
    '--nav-backdrop': 'blur(12px)',
    '--nav-shadow': '0 1px 0 rgba(0, 0, 0, 0.06)',
    '--nav-text': '#5C5C5C',
    '--nav-text-hover': '#000000',
    '--nav-active-text': '#000000',
    '--nav-active-bg': 'rgba(0, 0, 0, 0.06)',
    '--nav-btn-text': '#1E1E1E',
    '--nav-btn-border': 'rgba(0, 0, 0, 0.35)',
    '--nav-btn-border-hover': '#000000',
    '--nav-btn-hover-bg': 'rgba(0, 0, 0, 0.06)'
  }
}

export function resolveNavbarVars(theme: PageTheme, isScrolled: boolean): Record<string, string> {
  if (!isScrolled) return NAVBAR_THEME_VARS.transparent
  return NAVBAR_THEME_VARS[theme] ?? NAVBAR_THEME_VARS.dark
}
