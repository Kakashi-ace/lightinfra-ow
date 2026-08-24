<template>
  <section class="about-section">
    <div class="section-container">
      <h2 class="section-title">{{ t('about.title') }}</h2>
      <p class="section-subtitle">{{ t('about.subtitle') }}</p>
      <div class="about-text">
        <p v-for="(para, index) in aboutParagraphs" :key="index" class="text-paragraph">
          {{ para }}
        </p>
      </div>
      <div class="about-cards">
        <div v-for="(card, index) in cards" :key="index" class="about-card">
          <span class="about-card-name">{{ card.name }}</span>
          <div class="about-card-content">
            <h3 class="about-card-title">{{ card.title }}</h3>
            <p class="about-card-desc">{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  aboutParagraphs: {
    type: Array,
    default: () => []
  },
  cards: {
    type: Array,
    default: () => ([
      { name: '', title: '', desc: '' },
      { name: '', title: '', desc: '' }
    ])
  }
})
</script>

<style scoped>
.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #121212;
  margin: 0 0 16px 0;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0 0 60px 0;
}

.about-section {
  padding: 100px 0 240px 0;
}

.about-text {
  margin-bottom: 60px;
}

.text-paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #535C6E;
  margin: 0 0 16px 0;
}

.text-paragraph:last-child {
  margin-bottom: 0;
}

.about-cards {
  display: flex;
  gap: 24px;
}

.about-card {
  flex: 1;
  min-height: 186px;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, #D1EAFF 1%, #E5F3FF 44%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.about-card-name {
  font-size: 14px;
  font-weight: 400;
  color: #7C7C7C;
}

.about-card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.about-card-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #121212;
  margin: 0;
}

.about-card-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #535C6E;
  margin: 0;
}
</style>
