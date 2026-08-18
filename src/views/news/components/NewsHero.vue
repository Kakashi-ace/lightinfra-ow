<template>
  <div class="hero-content">
    <div class="hero-container">
      <div class="hero-left">
        <div class="hero-image-placeholder">
          <svg width="100%" height="100%" viewBox="0 0 690 441" fill="none">
            <rect width="690" height="441" fill="#D9D9D9" />
          </svg>
        </div>
      </div>
      <div class="hero-right">
        <span class="hero-tag">{{ featured.tag }}</span>
        <h1 class="hero-title">{{ featured.title }}</h1>
        <p class="hero-date">{{ featured.date }}</p>
        <a href="#" class="hero-btn" @click.prevent="emit('start')">{{ t('common.readArticle') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  featured: {
    type: Object,
    default: () => ({ tag: '', title: '', date: '' })
  }
})

const emit = defineEmits(['start'])
</script>

<style scoped>
.hero-content {
  width: 100%;
  padding: 60px 0;
}

.hero-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 24px;
}

.hero-left {
  width: 690px;
  height: 441px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-image-placeholder {
  width: 100%;
  height: 100%;
}

.hero-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;
  gap: 24px;
}

.hero-tag {
  display: inline-block;
  padding: 5px 12px;
  background: #4754E1;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
}

.hero-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #FFFFFF;
  margin: 0;
}

.hero-date {
  font-size: 24px;
  font-weight: 400;
  color: #FFFFFF;
  margin: 0;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.hero-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}
</style>
