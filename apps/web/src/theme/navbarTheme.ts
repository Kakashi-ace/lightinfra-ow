import type { PageTheme } from '@/router'

// 导航栏各主题下的 CSS 变量表：数据与组件分离，AppNavbar.vue 只负责把 resolveNavbarVars 的结果绑到根节点。
// 文字/下拉框配色始终跟随页面自身的 dark/light 主题（不受滚动状态影响，下拉框是实体浮层，
// 任何时候打开都要匹配所在页面的主题）；滚动状态只影响导航栏本体的背景是否透明。
const NAVBAR_THEME_VARS: Record<PageTheme, Record<string, string>> = {
  dark: {
    '--nav-bg': '#121212',
    '--nav-backdrop': 'blur(12px)',
    '--nav-shadow': 'none',
    '--nav-text': '#BBBBBB',
    '--nav-text-hover': '#FFFFFF',
    '--nav-active-text': '#FFFFFF',
    '--nav-active-bg': 'rgba(255, 255, 255, 0.14)',
    '--nav-btn-text': '#FFFFFF',
    '--nav-btn-border': 'rgba(255, 255, 255, 0.5)',
    '--nav-btn-border-hover': '#FFFFFF',
    '--nav-btn-hover-bg': 'rgba(255, 255, 255, 0.1)',
    '--nav-dropdown-bg': '#121212',
    '--nav-dropdown-padding': '12px',
    '--nav-dropdown-text': '#BBBBBB',
    '--nav-dropdown-selected-text': '#FFFFFF',
    '--nav-dropdown-hover-bg': 'rgba(255, 255, 255, 0.05)'
  },
  light: {
    '--nav-bg': '#FFFFFF',
    '--nav-backdrop': 'blur(12px)',
    '--nav-shadow': '0 1px 0 rgba(0, 0, 0, 0.06)',
    '--nav-text': '#020952',
    '--nav-text-hover': '#000000',
    '--nav-active-text': '#0073FF',
    '--nav-active-bg': 'rgba(0, 0, 0, 0.06)',
    '--nav-btn-text': '#1E1E1E',
    '--nav-btn-border': 'rgba(0, 0, 0, 0.35)',
    '--nav-btn-border-hover': '#000000',
    '--nav-btn-hover-bg': 'rgba(0, 0, 0, 0.06)',
    '--nav-dropdown-bg': '#FFFFFF',
    '--nav-dropdown-padding': '12px',
    '--nav-dropdown-text': '#000000',
    '--nav-dropdown-selected-text': '#0073FF',
    '--nav-dropdown-hover-bg': 'rgba(0, 0, 0, 0.05)'
  }
}

// 未滚动时导航栏本体透明悬浮在页面顶部内容之上；其他配色（文字/下拉框）仍按页面主题解析，不在这里覆盖
const TRANSPARENT_CHROME: Record<string, string> = {
  '--nav-bg': 'transparent',
  '--nav-backdrop': 'none',
  '--nav-shadow': 'none'
}

export function resolveNavbarVars(theme: PageTheme, isScrolled: boolean): Record<string, string> {
  const themeVars = NAVBAR_THEME_VARS[theme] ?? NAVBAR_THEME_VARS.dark
  if (isScrolled) return themeVars
  return { ...themeVars, ...TRANSPARENT_CHROME }
}
