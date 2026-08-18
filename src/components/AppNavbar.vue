<template>
  <header class="app-navbar">
    <div class="navbar-container">
      <!-- 左侧 Logo + 导航链接 -->
      <div class="navbar-left">
        <router-link to="/" class="navbar-logo" aria-label="LightInfra 首页">
          <img src="/media/logo-section.png" alt="LightInfra" />
        </router-link>

        <nav class="navbar-nav" role="navigation" aria-label="主导航">
          <!-- 产品下拉菜单（antd, hover 弹出） -->
          <a-dropdown class="nav-dropdown" :trigger="['hover']" placement="bottomLeft">
            <a
              href="/products"
              class="nav-link nav-dropdown-toggle"
              :class="{ 'nav-link-active': isProductsRoute }"
            >
              <span>{{ currentProductName }}</span>
              <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </a>
            <template #overlay>
              <a-menu :selected-keys="[currentRoute]">
                <a-menu-item key="/products">
                  <router-link to="/products">{{ t('nav.productCenter') }}</router-link>
                </a-menu-item>
                <a-menu-item v-for="product in productLinks" :key="product.path">
                  <router-link :to="product.path">{{ t(product.i18nKey) }}</router-link>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <router-link
            v-for="link in otherLinks"
            :key="link.path"
            :to="link.path"
            class="nav-link"
            :class="{ 'nav-link-active': isLinkActive(link.path) }"
          >
            {{ t(link.i18nKey) }}
          </router-link>
        </nav>
      </div>

      <!-- 右侧按钮组 -->
      <div class="navbar-right">
        <!-- 语言下拉菜单 -->
        <div class="language-dropdown" v-click-outside="closeDropdowns">
          <button class="btn btn-outline dropdown-toggle" @click="toggleDropdown">
            <span>{{ currentLanguageName }}</span>
            <svg class="dropdown-arrow" :class="{ 'dropdown-arrow-open': isOpen }" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="dropdown-menu" v-show="isOpen">
            <button
              class="dropdown-item"
              :class="{ 'dropdown-item-active': locale === 'zh-CN' }"
              @click="switchLanguage('zh-CN')"
            >
              简体中文
            </button>
            <button
              class="dropdown-item"
              :class="{ 'dropdown-item-active': locale === 'en' }"
              @click="switchLanguage('en')"
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_KEY } from '@/i18n'

const { t, locale } = useI18n()

const props = defineProps({
  currentRoute: {
    type: String,
    default: ''
  }
})

const isOpen = ref(false)

const productLinks = ref([
  { i18nKey: 'footer.opticsgpt', path: '/products/opticsgpt' },
  { i18nKey: 'footer.ifts', path: '/products/ifts' },
  { i18nKey: 'footer.instruments', path: '/products/instruments' }
])

const otherLinks = ref([
  { i18nKey: 'footer.newsCenter', path: '/news' },
  { i18nKey: 'footer.aboutLightInfra', path: '/about' },
  { i18nKey: 'nav.contact', path: '/contact' }
])

// 产品相关路由均需高亮「产品」导航项
const isProductsRoute = computed(() =>
  props.currentRoute.startsWith('/products')
)

// 导航项高亮：/news 及其子页（前沿研究 / 研究详情）都算「新闻中心」命中，其余按精确匹配
const isLinkActive = (path) => {
  if (path === '/news') return props.currentRoute.startsWith('/news')
  return props.currentRoute === path
}

// 产品下拉按钮：在具体产品页时显示该产品名，否则显示「产品」
const currentProductName = computed(() => {
  const route = props.currentRoute
  if (route === '/products/opticsgpt') return t('footer.opticsgpt')
  if (route === '/products/ifts') return t('footer.ifts')
  if (route === '/products/instruments') return t('footer.instruments')
  return t('nav.products')
})

// 当前语言对应的名称：语言切换按钮 / 语言下拉菜单展示具体语言名
const currentLanguageName = computed(() =>
  locale.value === 'en' ? 'English' : '简体中文'
)

const closeDropdowns = () => {
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (lang) => {
  locale.value = lang
  try {
    localStorage.setItem(LOCALE_KEY, lang)
  } catch (e) {
    /* ignore */
  }
  isOpen.value = false
}

// 点击外部指令
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}
</script>

<style scoped>
.app-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.navbar-container {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 77px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navbar-logo img {
  display: block;
  height: 36px;
  width: auto;
  max-width: none;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #BBBBBB;
  text-decoration: none;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #FFFFFF;
}

.nav-link-active {
  color: #0073FF;
}

.nav-link-active:hover {
  color: #0073FF;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-sizing: border-box;
}

.btn-outline {
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #FFFFFF;
}

.btn-filled {
  background: #FFFFFF;
  color: #121212;
  border: 1px solid #FFFFFF;
}

.btn-filled:hover {
  background: #E0E0E0;
  border-color: #E0E0E0;
}

/* 产品下拉菜单 —— antd 覆盖为原深色风格 */
.nav-dropdown {
  position: relative;
}

.nav-dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.nav-dropdown-toggle .dropdown-arrow {
  transition: transform 0.2s ease;
}

/* antd dropdown 浮层渲染在 body 下，需用 :global 覆盖成毛玻璃（glassmorphism）风格 */
:global(.ant-dropdown .ant-dropdown-menu) {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 8px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* 常规项：默认字体色与顶栏导航一致（#BBBBBB），覆盖 antd 默认黑色链接色 */
:global(.ant-dropdown .ant-dropdown-menu-item) {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #BBBBBB;
  padding: 10px 16px;
}

:global(.ant-dropdown .ant-dropdown-menu-item a) {
  color: #BBBBBB !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):hover a),
:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):focus a) {
  color: #FFFFFF !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):hover) {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #FFFFFF !important;
  border-radius: 0;
}

:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):focus) {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #FFFFFF !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item-selected) {
  background: transparent !important;
  color: #0073FF;
}

:global(.ant-dropdown .ant-dropdown-menu-item-selected a) {
  color: #0073FF !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item-selected:not(.ant-dropdown-menu-item-disabled):hover) {
  background: rgba(255, 255, 255, 0.05) !important;
  color: #0073FF !important;
}


/* 语言下拉菜单 */
.language-dropdown {
  position: relative;
}

.dropdown-toggle {
  gap: 6px;
  cursor: pointer;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.dropdown-arrow-open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 120px;
  background: #1E1E1E;
  border: 1px solid #323232;
  border-radius: 10px;
  padding: 8px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #BBBBBB;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
}

.dropdown-item-active {
  color: #0073FF;
}

.dropdown-item-active:hover {
  color: #0073FF;
}

/* 响应式 */
@media (max-width: 1200px) {
  .navbar-container {
    width: 100%;
    max-width: 1200px;
  }
}

@media (max-width: 900px) {
  .navbar-nav {
    display: none;
  }

  .btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>
