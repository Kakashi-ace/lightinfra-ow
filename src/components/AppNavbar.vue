<template>
  <header class="app-navbar">
    <div class="navbar-container">
      <!-- 左侧 Logo + 导航链接 -->
      <div class="navbar-left">
        <a href="/" class="navbar-logo" aria-label="LightInfra 首页">
          <svg width="112" height="37" viewBox="0 0 112 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6,0 28,0 28,26" fill="url(#grad1)" />
            <polygon points="0,17 22,17 22,37" fill="url(#grad1)" />
            <rect x="42" y="4" width="4" height="30" fill="white"/>
            <rect x="52" y="12" width="4" height="22" fill="white"/>
            <rect x="62" y="8" width="4" height="26" fill="white"/>
            <rect x="72" y="15" width="4" height="18" fill="white"/>
            <rect x="82" y="6" width="4" height="28" fill="white"/>
            <rect x="92" y="11" width="4" height="23" fill="white"/>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="white" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="white" stop-opacity="0.3"/>
              </linearGradient>
            </defs>
          </svg>
        </a>

        <nav class="navbar-nav" role="navigation" aria-label="主导航">
          <a
            v-for="link in navLinks"
            :key="link.path"
            :href="link.path"
            class="nav-link"
            :class="{ 'nav-link-active': currentRoute === link.path }"
          >
            {{ link.name }}
          </a>
        </nav>
      </div>

      <!-- 右侧按钮组 -->
      <div class="navbar-right">
        <!-- 语言下拉菜单 -->
        <div class="language-dropdown" v-click-outside="closeDropdown">
          <button class="btn btn-outline dropdown-toggle" @click="toggleDropdown">
            <span>{{ t('nav.language') }}</span>
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
        <a href="/login" class="btn btn-filled">登录/注册</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps({
  currentRoute: {
    type: String,
    default: ''
  }
})

const isOpen = ref(false)

const navLinks = ref([
  { name: '产品', path: '/products' },
  { name: '新闻中心', path: '/news' },
  { name: '关于 LightInfra', path: '/about' },
  { name: '联系我们', path: '/contact' }
])

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const switchLanguage = (lang) => {
  locale.value = lang
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

.navbar-logo svg {
  display: block;
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

.nav-link:focus {
  outline: 2px solid #0073FF;
  outline-offset: 4px;
  border-radius: 2px;
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

.btn:focus {
  outline: 2px solid #0073FF;
  outline-offset: 4px;
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
