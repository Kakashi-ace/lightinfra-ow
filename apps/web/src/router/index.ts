import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import i18n from '@/i18n'
import AppLayout from '@/layouts/AppLayout.vue'
import HomeView from '@/views/home/HomeView.vue'
import ProductsView from '@/views/products/ProductsView.vue'
import OpticsGPTProductView from '@/views/products/opticgpt/OpticsGPTProductView.vue'
import IFTSProductView from '@/views/products/ifts/IftsProductView.vue'
import InstrumentProductView from '@/views/products/instrument/InstrumentProductView.vue'
import AboutView from '@/views/about/AboutView.vue'
import JoinUsView from '@/views/contact/join/JoinUsView.vue'
import ContactUsView from '@/views/contact/contact-us/ContactUsView.vue'
import NewsView from '@/views/news-research/NewsResearchView.vue'
import NewsListView from '@/views/news-research/news/NewsListView.vue'
import ResearchListView from '@/views/news-research/research/ResearchListView.vue'
import ArticleDetailView from '@/views/news-research/detail/ArticleDetailView.vue'

// 让 to.meta.titleKey 有类型，而不是 any
// 页面主题：驱动导航栏/页脚配色，定义放在这里作为唯一来源，theme/ 目录下的配色表都引用它
export type PageTheme = 'dark' | 'light'

declare module 'vue-router' {
  interface RouteMeta {
    /** 浏览器标签页标题对应的 i18n key（相对 `meta.` 命名空间），随语言切换实时更新。嵌套路由下取最深一层定义了此项的 meta */
    titleKey?: string
    /** 页面主题，驱动导航栏/页脚配色。嵌套路由下取最深一层定义了此项的 meta，未定义时按 dark 处理 */
    theme?: PageTheme
  }
}

const DEFAULT_TITLE = 'LightInfra'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 切换路由时回到页面顶部；浏览器前进/后退保留原滚动位置
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { titleKey: 'home', theme: 'dark' }
        },
        {
          path: 'products',
          component: ProductsView,
          meta: { theme: 'dark' },
          children: [
            {
              path: 'opticsgpt',
              name: 'opticsgpt-product',
              component: OpticsGPTProductView,
              meta: { titleKey: 'opticsgptProduct' }
            },
            {
              path: 'ifts',
              name: 'ifts-product',
              component: IFTSProductView,
              meta: { titleKey: 'iftsProduct' }
            },
            {
              path: 'instruments',
              name: 'instrument-product',
              component: InstrumentProductView,
              meta: { titleKey: 'instrumentProduct' }
            }
          ]
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
          meta: { titleKey: 'about', theme: 'light' }
        },
        {
          path: 'join',
          name: 'join',
          component: JoinUsView,
          meta: { titleKey: 'join', theme: 'light' }
        },
        {
          path: 'contact',
          name: 'contact',
          component: ContactUsView,
          meta: { titleKey: 'contact', theme: 'light' }
        },
        {
          path: 'news-research',
          component: NewsView,
          meta: { theme: 'light' },
          children: [
            {
              path: '',
              redirect: { name: 'news-list' }
            },
            {
              path: 'news-list',
              name: 'news-list',
              component: NewsListView,
              meta: { titleKey: 'newsList' }
            },
            {
              path: 'research-list',
              name: 'research-list',
              component: ResearchListView,
              meta: { titleKey: 'researchList' }
            },
            {
              path: 'detail/:id',
              name: 'research-detail',
              component: ArticleDetailView,
              meta: { titleKey: 'researchDetail' }
            }
          ]
        }
      ]
    }
  ]
})

// 从匹配到的路由记录中，取最深一层定义了 titleKey 的 meta，支持嵌套路由标题继承
function resolvePageTitle(to: RouteLocationNormalized): string {
  for (let i = to.matched.length - 1; i >= 0; i--) {
    const titleKey = to.matched[i]?.meta?.titleKey
    if (titleKey) return `${i18n.global.t(`meta.${titleKey}`)} - ${DEFAULT_TITLE}`
  }
  return DEFAULT_TITLE
}

// 从匹配到的路由记录中，取最深一层定义了 theme 的 meta，支持嵌套路由主题继承；未定义时按 dark 处理
export function resolvePageTheme(to: RouteLocationNormalized): PageTheme {
  for (let i = to.matched.length - 1; i >= 0; i--) {
    const theme = to.matched[i]?.meta?.theme
    if (theme) return theme
  }
  return 'dark'
}

// 每次路由切换完成后，实时更新浏览器标签页标题；同时记住当前路由，供语言切换时重新解析标题用
let currentRoute: RouteLocationNormalized | null = null

router.afterEach((to) => {
  currentRoute = to
  document.title = resolvePageTitle(to)
})

// 纯切换语言（无路由跳转）时，afterEach 不会重新触发，这里单独监听 locale 变化来刷新标签页标题
watch(i18n.global.locale, () => {
  if (currentRoute) document.title = resolvePageTitle(currentRoute)
})

export default router
