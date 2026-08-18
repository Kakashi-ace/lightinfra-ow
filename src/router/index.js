import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/home/HomeView.vue'
import ProductsView from '../views/products/ProductsView.vue'
import ProductsListView from '../views/products/list/ProductsListView.vue'
import OpticsGPTProductView from '../views/products/opticgpt/OpticsGPTProductView.vue'
import IFTSProductView from '../views/products/ifts/IftsProductView.vue'
import InstrumentProductView from '../views/products/instrument/InstrumentProductView.vue'
import AboutView from '../views/about/AboutView.vue'
import ContactView from '../views/contact/ContactView.vue'
import NewsView from '../views/news/NewsView.vue'
import ResearchView from '../views/news/ResearchView.vue'
import NewsDetailResearchView from '../views/research-detail/NewsDetailResearchView.vue'

const DEFAULT_TITLE = 'LightInfra'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          path: 'news',
          name: 'news',
          component: NewsView,
          meta: { title: '新闻动态 - LightInfra' }
        },
        {
          path: 'research',
          name: 'research',
          component: ResearchView,
          meta: { title: '最新研究 - LightInfra' }
        },
        {
          path: 'research/detail/:id',
          name: 'research-detail',
          component: NewsDetailResearchView,
          meta: { title: '研究详情 - LightInfra' }
        }
      ]
    }
  ]
})

// 从匹配到的路由记录中，取最深一层定义了 title 的 meta，支持嵌套路由标题继承
function resolvePageTitle(to) {
  for (let i = to.matched.length - 1; i >= 0; i--) {
    if (to.matched[i].meta?.title) return to.matched[i].meta.title
  }
  return DEFAULT_TITLE
}

// 每次路由切换完成后，实时更新浏览器标签页标题
router.afterEach((to) => {
  document.title = resolvePageTitle(to)
})

export default router
