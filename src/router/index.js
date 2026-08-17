import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import OpticsGPTProductView from '../views/OpticsGPTProductView.vue'
import IFTSProductView from '../views/IFTSProductView.vue'
import InstrumentProductView from '../views/InstrumentProductView.vue'
import AboutView from '../views/AboutView.vue'
import RecruitView from '../views/RecruitView.vue'
import ContactView from '../views/ContactView.vue'
import NewsView from '../views/NewsView.vue'
import ResearchView from '../views/ResearchView.vue'
import NewsDetailResearchView from '../views/NewsDetailResearchView.vue'

const DEFAULT_TITLE = 'LightInfra'

// 产品子落地页：完整整页（自带 hero + footer），URL 嵌套在 /products 下，
// 但渲染为独立整页，而非叠加在「产品中心」页内
const productDetailRoutes = [
  {
    path: 'products/opticsgpt',
    name: 'opticsgpt-product',
    component: OpticsGPTProductView,
    meta: { title: 'OpticsGPT - 产品中心 - LightInfra' }
  },
  {
    path: 'products/ifts',
    name: 'ifts-product',
    component: IFTSProductView,
    meta: { title: 'IFTS - 产品中心 - LightInfra' }
  },
  {
    path: 'products/instruments',
    name: 'instrument-product',
    component: InstrumentProductView,
    meta: { title: '智能仪器仪表 - 产品中心 - LightInfra' }
  }
]

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
          name: 'products',
          component: ProductsView,
          meta: { title: '产品中心 - LightInfra' }
        },
        // 产品子落地页作为父布局的孩子，独立整页渲染
        ...productDetailRoutes,
        {
          path: 'about',
          name: 'about',
          component: AboutView,
          meta: { title: '关于我们 - LightInfra' }
        },
        {
          path: 'join',
          name: 'recruit',
          component: RecruitView,
          meta: { title: '加入我们 - LightInfra' }
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
