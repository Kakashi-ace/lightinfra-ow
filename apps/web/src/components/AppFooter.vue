<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-left">
        <svg class="footer-logo" width="205" height="68" viewBox="0 0 112 37" fill="none">
          <polygon points="6,0 28,0 28,26" fill="#FFFFFF" />
          <polygon points="0,17 22,17 22,37" fill="#FFFFFF" />
          <rect x="42" y="4" width="4" height="30" fill="#FFFFFF"/>
          <rect x="52" y="12" width="4" height="22" fill="#FFFFFF"/>
          <rect x="62" y="8" width="4" height="26" fill="#FFFFFF"/>
          <rect x="72" y="15" width="4" height="18" fill="#FFFFFF"/>
          <rect x="82" y="6" width="4" height="28" fill="#FFFFFF"/>
          <rect x="92" y="11" width="4" height="23" fill="#FFFFFF"/>
        </svg>
        <div class="contact-info">
          <div class="contact-item">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6L12 13L2 6"/>
            </svg>
            <span>{{ t('footer.bizContact') }}</span>
          </div>
          <div class="contact-item">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 6L12 13L2 6"/>
            </svg>
            <span>{{ t('footer.hrContact') }}</span>
          </div>
        </div>
        <div class="qr-code"></div>
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
          <router-link to="/news" class="column-link">{{ t('footer.news') }}</router-link>
          <router-link to="/news/research" class="column-link">{{ t('footer.research') }}</router-link>
        </div>
        <div class="footer-column">
          <h4 class="column-title">{{ t('footer.aboutLightInfra') }}</h4>
          <router-link to="/about" class="column-link">{{ t('footer.aboutLightInfra') }}</router-link>
        </div>
        <div class="footer-column">
          <h4 class="column-title">{{ t('footer.contact') }}</h4>
          <router-link to="/contact" class="column-link">{{ t('footer.contactUs') }}</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.app-footer {
  width: 100%;
  background: #121212;
  border-top: 1px solid #323232;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
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
  color: #FFFFFF;
}

.qr-code {
  width: 128px;
  height: 128px;
  background: #D9D9D9;
  border-radius: 20px;
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
  color: #FFFFFF;
  margin: 0;
}

.column-link {
  font-size: 14px;
  font-weight: 400;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-link:hover {
  color: #0073FF;
}
</style>
