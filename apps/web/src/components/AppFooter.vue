<template>
  <footer class="app-footer" :style="footerVars">
    <img
      class="footer-bg-image"
      :class="theme === 'dark' ? 'footer-bg-image--dark' : 'footer-bg-image--light'"
      :src="footerBgImage"
      alt=""
    />
    <div class="footer-container">
      <div class="footer-left">
        <img class="footer-logo" :src="footerLogoImage" alt="LightInfra" />
        <div class="contact-info">
          <div class="contact-item">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6L12 13L2 6"/>
            </svg>
            <span>{{ t('footer.bizContact') }}</span>
          </div>
          <div class="contact-item">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6L12 13L2 6"/>
            </svg>
            <span>{{ t('footer.hrContact') }}</span>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-column">
          <h4 class="column-title">{{ t('footer.products') }}</h4>
          <router-link to="/products/opticsgpt" class="column-link">{{ t('footer.opticsgpt') }}</router-link>
          <router-link to="/products/ifts" class="column-link">{{ t('footer.ifts') }}</router-link>
          <router-link to="/products/instruments" class="column-link">{{ t('footer.instruments') }}</router-link>
        </div>
        <div class="footer-column">
          <h4 class="column-title">{{ t('footer.newsCenter') }}</h4>
          <router-link to="/news-research" class="column-link">{{ t('footer.news') }}</router-link>
          <router-link to="/news-research/research-list" class="column-link">{{ t('footer.research') }}</router-link>
        </div>
        <div class="footer-column">
          <h4 class="column-title">{{ t('footer.aboutLightInfra') }}</h4>
          <router-link to="/about" class="column-link">{{ t('footer.aboutLightInfra') }}</router-link>
        </div>
        <div class="footer-column">
          <h4 class="column-title">{{ t('footer.contact') }}</h4>
          <router-link to="/join" class="column-link">{{ t('nav.joinUs') }}</router-link>
          <router-link to="/contact" class="column-link">{{ t('footer.contact') }}</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { resolveFooterVars } from '@/theme/footerTheme'

const { t } = useI18n()

const props = defineProps({
  // 页脚配色主题，跟随当前路由的浅/深色页面设计，默认 dark 与改造前视觉一致
  theme: {
    type: String,
    default: 'dark'
  }
})

const footerVars = computed(() => resolveFooterVars(props.theme))
const footerBgImage = computed(() =>
  props.theme === 'light' ? '/media/footer-background-light.png' : '/media/footer-background-dark.png'
)
const footerLogoImage = computed(() =>
  props.theme === 'light' ? '/media/lightinfra-logo-large-blue.png' : '/media/lightinfra-logo-large-white.png'
)
</script>

<style scoped>
.app-footer {
  position: relative;
  width: 100%;
  height: 520px;
  box-sizing: border-box;
  background-color: var(--footer-bg);
  overflow: hidden;
  transition: background-color 0.25s ease;
}

.footer-bg-image {
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  z-index: 0;
}

.footer-bg-image--dark {
  height: 890px;
  width: 1664px;
  transform: translateX(200px);
}

.footer-bg-image--light {
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
    transform: translateY(100px);
}

.footer-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  box-sizing: border-box;
  display: flex;
  gap: 77px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-logo {
  display: block;
  width: 205px;
  height: auto;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--footer-text-secondary);
}

.footer-right {
  flex: 1;
  display: flex;
  gap: 77px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--footer-text);
  margin: 0;
}

.column-link {
  font-size: 14px;
  font-weight: 400;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-link:hover {
  color: var(--footer-link-hover);
}
</style>
