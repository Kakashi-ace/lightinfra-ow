import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResourceView from '../views/ResourceView.vue'
import ProductsView from '../views/ProductsView.vue'
import OpticsGPTProductView from '../views/OpticsGPTProductView.vue'
import IFTSProductView from '../views/IFTSProductView.vue'
import InstrumentProductView from '../views/InstrumentProductView.vue'
import AboutView from '../views/AboutView.vue'
import RecruitView from '../views/RecruitView.vue'
import ContactView from '../views/ContactView.vue'
import NewsView from '../views/NewsView.vue'
import ResearchView from '../views/ResearchView.vue'
import NewsDetailResearch1View from '../views/NewsDetailResearch1View.vue'
import NewsDetailResearch2View from '../views/NewsDetailResearch2View.vue'
import DocCoherentReceiverInitView from '../views/DocCoherentReceiverInitView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/products/opticsgpt',
      name: 'opticsgpt-product',
      component: OpticsGPTProductView
    },
    {
      path: '/products/ifts',
      name: 'ifts-product',
      component: IFTSProductView
    },
    {
      path: '/products/instruments',
      name: 'instrument-product',
      component: InstrumentProductView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourceView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/join',
      name: 'recruit',
      component: RecruitView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/research',
      name: 'research',
      component: ResearchView
    },
    {
      path: '/research/detail',
      name: 'research-detail',
      component: NewsDetailResearch1View
    },
    {
      path: '/research/detail2',
      name: 'research-detail2',
      component: NewsDetailResearch2View
    },
    {
      path: '/resources/doc/coherent-receiver/init',
      name: 'doc-coherent-receiver-init',
      component: DocCoherentReceiverInitView
    }
  ]
})

export default router
