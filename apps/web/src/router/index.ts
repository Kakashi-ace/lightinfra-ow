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
import NewsView from '@/views/news/NewsView.vue'
import NewsListView from '@/views/news/list/NewsListView.vue'
import ResearchListView from '@/views/news/research/ResearchListView.vue'
import ArticleDetailView from '@/views/news/detail/ArticleDetailView.vue'

// 让 to.meta.title 有类型，而不是 any
declare module 'vue-router' {
  interface RouteMeta {
    /** 浏览器标签页标题。嵌套路由下取最深一层定义了此项的 meta */
    title?: string
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
          meta: { title: '首页 - LightInfra' }
        },
        {
          path: 'products',
          component: ProductsView,
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
          meta: { title: '关于我们 - LightInfra' }
        },
        {
          path: 'contact',
          name: 'contact',
          component: ContactView,
          meta: { title: '联系我们 - LightInfra' }
        },
        {
          path: 'news-research',
          component: NewsView,
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

// 每次路由切换完成后，实时更新浏览器标签页标题
router.afterEach((to) => {
  document.title = resolvePageTitle(to)
})

export default router
