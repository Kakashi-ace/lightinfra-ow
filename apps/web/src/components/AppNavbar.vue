<template>
  <header ref="navbarRef" class="app-navbar" :style="navVars">
    <div class="navbar-container">
      <!-- 左侧 Logo + 导航链接 -->
      <div class="navbar-left">
        <router-link to="/" class="navbar-logo" :aria-label="t('nav.homeAriaLabel')">
          <img :src="logoSrc" alt="LightInfra" />
        </router-link>

        <nav class="navbar-nav" role="navigation" :aria-label="t('nav.mainNavAriaLabel')">
          <!-- 产品下拉菜单（antd, click 弹出）；get-popup-container 让浮层挂载到导航栏内部，随导航栏一起 fixed -->
          <a-dropdown class="nav-dropdown" :trigger="['click']" placement="bottomLeft" :get-popup-container="getPopupContainer">
            <span
              class="nav-link nav-dropdown-toggle"
              :class="{ 'nav-link-active': isProductsRoute }"
            >
              <span>{{ currentProductName }}</span>
              <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
            <template #overlay>
              <a-menu :selected-keys="[currentRoute]">
                <a-menu-item v-for="product in productLinks" :key="product.path">
                  <router-link :to="product.path" class="nav-menu-item-link">
                    <span class="nav-menu-item-title">{{ t(product.titleKey) }}</span>
                    <span class="nav-menu-item-desc">{{ t(product.descKey) }}</span>
                  </router-link>
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

          <!-- 联系我们下拉菜单（antd, click 弹出） -->
          <a-dropdown class="nav-dropdown" :trigger="['click']" placement="bottomLeft" :get-popup-container="getPopupContainer">
            <span
              class="nav-link nav-dropdown-toggle"
              :class="{ 'nav-link-active': isContactRoute }"
            >
              <span>{{ currentContactName }}</span>
              <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </span>
            <template #overlay>
              <a-menu :selected-keys="[currentRoute]">
                <a-menu-item key="/contact">
                  <router-link to="/contact">{{ t('nav.contact') }}</router-link>
                </a-menu-item>
                <a-menu-item key="/join">
                  <router-link to="/join">{{ t('nav.joinUs') }}</router-link>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_KEY } from '@/i18n'
import { resolveNavbarVars } from '@/theme/navbarTheme'

const { t, locale } = useI18n()

const props = defineProps({
  currentRoute: {
    type: String,
    default: ''
  },
  // 导航栏配色主题，跟随当前路由的浅/深色页面设计，默认 dark 与改造前视觉一致
  theme: {
    type: String,
    default: 'dark'
  }
})

const isOpen = ref(false)

// antd 下拉浮层默认挂载到 body，不随 fixed 导航栏滚动；挂到导航栏自身节点下，使其继承 fixed 定位
const navbarRef = ref(null)
const getPopupContainer = () => navbarRef.value || document.body

// 滚动状态：未滚动时导航栏透明悬浮在 Hero 上；滚动过阈值后固化为带背景的实体导航条，
// 使导航栏的可读性不再依赖 Hero 具体背景色（Hero 有深色蒙层/蓝色渐变/纯色等多种情况）
const SCROLL_THRESHOLD = 16
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > SCROLL_THRESHOLD
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navVars = computed(() => resolveNavbarVars(props.theme, isScrolled.value))

// logo 深浅版本只跟随页面主题（props.theme），与滚动/透明状态无关——滚动只决定导航栏本体是否透明
const logoSrc = computed(() =>
  props.theme === 'light' ? '/media/logo-section-light.png' : '/media/logo-section-dark.png'
)

const productLinks = ref([
  { path: '/products/opticsgpt', titleKey: 'nav.productOpticsgptTitle', descKey: 'nav.productOpticsgptDesc' },
  { path: '/products/ifts', titleKey: 'nav.productIftsTitle', descKey: 'nav.productIftsDesc' },
  { path: '/products/instruments', titleKey: 'nav.productInstrumentsTitle', descKey: 'nav.productInstrumentsDesc' }
])

const otherLinks = ref([
  { i18nKey: 'footer.newsCenter', path: '/news-research' },
  { i18nKey: 'footer.aboutLightInfra', path: '/about' }
])

// 加入我们/联系我们相关路由均需高亮「联系我们」导航项
const isContactRoute = computed(() =>
  props.currentRoute === '/join' || props.currentRoute === '/contact'
)

// 产品相关路由均需高亮「产品」导航项
const isProductsRoute = computed(() =>
  props.currentRoute.startsWith('/products')
)

// 导航项高亮：/news-research 及其子页（前沿研究 / 研究详情）都算「新闻中心」命中，其余按精确匹配
const isLinkActive = (path) => {
  if (path === '/news-research') return props.currentRoute.startsWith('/news-research')
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

// 联系我们下拉按钮：在加入我们页时显示「加入我们」，否则显示「联系我们」
const currentContactName = computed(() =>
  props.currentRoute === '/join' ? t('nav.joinUs') : t('nav.contact')
)

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
  background: var(--nav-bg);
  backdrop-filter: var(--nav-backdrop);
  -webkit-backdrop-filter: var(--nav-backdrop);
  box-shadow: var(--nav-shadow);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
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
  color: var(--nav-text);
  text-decoration: none;
  transition: color 0.25s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--nav-text-hover);
}

.nav-link-active {
  color: var(--nav-active-text);
  background: var(--nav-active-bg);
  border-radius: 999px;
  padding: 6px 14px;
  margin: -6px -14px;
  transition: color 0.25s ease, background-color 0.25s ease;
}

.nav-link-active:hover {
  color: var(--nav-active-text);
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
  color: var(--nav-btn-text);
  border: 1px solid var(--nav-btn-border);
}

.btn-outline:hover {
  background: var(--nav-btn-hover-bg);
  border-color: var(--nav-btn-border-hover);
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

/* antd dropdown 浮层通过 get-popup-container 挂载到导航栏内部，随导航栏主题切换深浅配色 */
:global(.ant-dropdown .ant-dropdown-menu) {
  width: max-content;
  background: var(--nav-dropdown-bg);
  border-radius: 10px;
  padding: var(--nav-dropdown-padding);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* 常规项：默认字体色跟随导航主题，覆盖 antd 默认黑色链接色 */
:global(.ant-dropdown .ant-dropdown-menu-item) {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: var(--nav-dropdown-text);
  padding: 10px 16px;
}

:global(.ant-dropdown .ant-dropdown-menu-item a) {
  color: var(--nav-dropdown-text) !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):hover a),
:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):focus a) {
  color: var(--nav-dropdown-selected-text) !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):hover) {
  background: var(--nav-dropdown-hover-bg) !important;
  color: var(--nav-dropdown-selected-text) !important;
  border-radius: 0;
}

:global(.ant-dropdown .ant-dropdown-menu-item:not(.ant-dropdown-menu-item-disabled):focus) {
  background: var(--nav-dropdown-hover-bg) !important;
  color: var(--nav-dropdown-selected-text) !important;
}

/* 选中态 */
:global(.ant-dropdown .ant-dropdown-menu-item-selected) {
  background: var(--nav-dropdown-hover-bg) !important;
  color: var(--nav-dropdown-selected-text);
}

:global(.ant-dropdown .ant-dropdown-menu-item-selected a) {
  color: var(--nav-dropdown-selected-text) !important;
}

:global(.ant-dropdown .ant-dropdown-menu-item-selected:not(.ant-dropdown-menu-item-disabled):hover) {
  background: var(--nav-dropdown-hover-bg) !important;
  color: var(--nav-dropdown-selected-text) !important;
}

/* 产品下拉菜单项：主标题 + 副标题两行展示 */
.nav-menu-item-link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
}

.nav-menu-item-title {
  font-size: 14px;
  font-weight: 600;
  color: inherit;
}

.nav-menu-item-desc {
  font-size: 12px;
  font-weight: 400;
  color: inherit;
  opacity: 0.6;
  line-height: 1.4;
  white-space: normal;
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
  width: max-content;
  background: var(--nav-dropdown-bg);
  border-radius: 10px;
  padding: var(--nav-dropdown-padding);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 10px 16px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--nav-dropdown-text);
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: var(--nav-dropdown-hover-bg);
  color: var(--nav-dropdown-selected-text);
}

.dropdown-item-active {
  color: var(--nav-dropdown-selected-text);
}

.dropdown-item-active:hover {
  color: var(--nav-dropdown-selected-text);
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
