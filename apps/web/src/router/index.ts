import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import HomeView from '@/views/home/HomeView.vue'
import ProductsView from '@/views/products/ProductsView.vue'
import ProductsListView from '@/views/products/list/ProductsListView.vue'
import OpticsGPTProductView from '@/views/products/opticgpt/OpticsGPTProductView.vue'
import IFTSProductView from '@/views/products/ifts/IftsProductView.vue'
import InstrumentProductView from '@/views/products/instrument/InstrumentProductView.vue'
import AboutView from '@/views/about/AboutView.vue'
import ContactView from '@/views/contact/ContactView.vue'
import NewsView from '@/views/news-research/NewsResearchView.vue'
import NewsListView from '@/views/news-research/news/NewsListView.vue'
import ResearchListView from '@/views/news-research/research/ResearchListView.vue'
import ArticleDetailView from '@/views/news-research/detail/ArticleDetailView.vue'

// 让 to.meta.title 有类型，而不是 any
// 页面主题：驱动导航栏/页脚配色，定义放在这里作为唯一来源，theme/ 目录下的配色表都引用它
export type PageTheme = 'dark' | 'light'

declare module 'vue-router' {
  interface RouteMeta {
    /** 浏览器标签页标题。嵌套路由下取最深一层定义了此项的 meta */
    title?: string
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
          meta: { title: '首页 - LightInfra', theme: 'dark' }
        },
        {
          path: 'products',
          component: ProductsView,
          meta: { theme: 'dark' },
          children: [
            {
              path: '',
              redirect: { name: 'products-list' }
            },
            {
              path: 'list',
              name: 'products-list',
              component: ProductsListView,
              meta: { title: '产品 - LightInfra' }
            },
            {
              path: 'opticsgpt',
              name: 'opticsgpt-product',
              component: OpticsGPTProductView,
              meta: { title: 'OpticsGPT - 产品 - LightInfra' }
            },
            {
              path: 'ifts',
              name: 'ifts-product',
              component: IFTSProductView,
              meta: { title: 'IFTS - 产品 - LightInfra' }
            },
            {
              path: 'instruments',
              name: 'instrument-product',
              component: InstrumentProductView,
              meta: { title: '智能仪器仪表 - 产品 - LightInfra' }
            }
          ]
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
          meta: { title: '关于我们 - LightInfra', theme: 'light' }
        },
        {
          path: 'contact',
          name: 'contact',
          component: ContactView,
          meta: { title: '联系我们 - LightInfra', theme: 'light' }
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
              meta: { title: '新闻动态 - LightInfra' }
            },
            {
              path: 'research-list',
              name: 'research-list',
              component: ResearchListView,
              meta: { title: '前沿研究 - LightInfra' }
            },
            {
              path: 'detail/:id',
              name: 'news-detail',
              component: ArticleDetailView,
              meta: { title: '研究详情 - LightInfra' }
            }
          ]
        }
      ]
    }
  ]
})

// 从匹配到的路由记录中，取最深一层定义了 title 的 meta，支持嵌套路由标题继承
function resolvePageTitle(to: RouteLocationNormalized): string {
  for (let i = to.matched.length - 1; i >= 0; i--) {
    const title = to.matched[i]?.meta?.title
    if (title) return title
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

// 每次路由切换完成后，实时更新浏览器标签页标题
router.afterEach((to) => {
  document.title = resolvePageTitle(to)
})

export default router
