<template>
  <section class="news-section">
    <div class="news-container">
      <div class="news-header">
        <h2 class="news-title">{{ t('news.sectionTitle') }}</h2>
        <p class="news-subtitle">{{ subtitle }}</p>
      </div>
      <div class="news-grid">
        <div
          v-for="item in items"
          :key="item.id"
          class="news-card"
        >
          <div class="news-card-image">
            <svg width="100%" height="100%" viewBox="0 0 384 216" fill="none">
              <rect width="384" height="216" fill="#D9D9D9" />
            </svg>
          </div>
          <div class="news-card-body">
            <div class="news-card-meta">
              <span class="news-card-tag">{{ item.tag }}</span>
              <span class="news-card-date">{{ item.date }}</span>
            </div>
            <h3 class="news-card-title">{{ item.title }}</h3>
            <p class="news-card-excerpt">{{ item.excerpt }}</p>
            <button class="news-card-btn" @click="emit('readMore', item.id)">{{ t('common.readMore') }}</button>
          </div>
        </div>
      </div>
      <div class="news-footer">
        <button class="load-more-btn" @click="emit('loadMore')">{{ t('common.readArticle') }}</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  subtitle: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['readMore', 'loadMore'])
</script>

<style scoped>
.news-section {
  width: 100%;
  padding: 60px 0;
}

.news-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.news-header {
  margin-bottom: 60px;
}

.news-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #121212;
  margin: 0 0 16px 0;
}

.news-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px 29px;
  margin-bottom: 60px;
}

.news-card {
  width: 100%;
  height: 433px;
  background: #FFFFFF;
  border: 1px solid #D3D3D3;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease;
}

.news-card:hover {
  border-color: #0073FF;
}

.news-card-image {
  width: 100%;
  height: 216px;
  flex-shrink: 0;
}

.news-card-body {
  flex: 1;
  padding: 21px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-card-tag {
  display: inline-block;
  padding: 5px 10px;
  background: #D1EAFF;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #121212;
}

.news-card-date {
  font-size: 12px;
  font-weight: 400;
  color: #121212;
}

.news-card-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #121212;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-excerpt {
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: #121212;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #121212;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  color: #121212;
  cursor: pointer;
  transition: all 0.2s ease;
}

.news-card-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.news-footer {
  display: flex;
  justify-content: center;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: #FFFFFF;
  border: 1px solid #121212;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}
</style>
