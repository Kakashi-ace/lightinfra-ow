<template>
  <section class="opticsgpt-section">
    <div class="opticsgpt-content">
      <!-- 左栏 -->
      <div class="opticsgpt-left">
        <div class="bar-chart">
          <div class="bar bar-blue"></div>
          <div class="bar bar-gray"></div>
          <div class="bar bar-gray"></div>
        </div>
        <div class="opticsgpt-text">
          <h2 class="opticsgpt-title">{{ t('home.opticsgptTitle') }}</h2>
          <p class="opticsgpt-desc">{{ t('home.opticsgptDesc') }}</p>
          <router-link to="/products/opticsgpt" class="opticsgpt-btn">{{ t('common.startUsing') }}</router-link>
        </div>
      </div>
      <!-- 右栏 -->
      <div class="opticsgpt-right">
        <div class="opticsgpt-image" :style="{ backgroundImage: `url(${image})` }"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const image = '/media/ProductPage-OpticsGPT-hero.png'
</script>

<style scoped>
.opticsgpt-section {
  width: 1200px;
  padding: 80px 0;
}

.opticsgpt-content {
  display: flex;
  gap: 55px;
  align-items: center;
}

.opticsgpt-left {
  width: 511px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 14px;
  height: 174px;
  flex-shrink: 0;
}

.bar {
  width: 14px;
  border-radius: 7px;
  flex-shrink: 0;
}

.bar-blue {
  height: 88px;
  background: #0073FF;
}

.bar-gray {
  height: 31px;
  background: #D9D9D9;
}

.opticsgpt-text {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.opticsgpt-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

.opticsgpt-desc {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.opticsgpt-btn {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 48px;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  background: transparent;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.opticsgpt-btn:hover {
  background: #FFFFFF;
  color: #121212;
}

.opticsgpt-right {
  width: 648px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.opticsgpt-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
  border-radius: 20px;
}

@media (max-width: 1200px) {
  .opticsgpt-section {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .opticsgpt-content {
    flex-direction: column;
    width: 100%;
  }

  .opticsgpt-left {
    width: 100%;
  }

  .opticsgpt-right {
    width: 100%;
    max-width: 648px;
  }
}
</style>
