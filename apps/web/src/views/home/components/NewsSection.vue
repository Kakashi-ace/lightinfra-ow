<template>
  <section class="news-section">
    <div class="section-header-row">
      <div class="section-header-left">
        <h2>{{ t('home.newsTitle') }}</h2>
        <p>{{ t('home.newsDesc') }}</p>
      </div>
      <router-link to="/news-research" class="btn-medium">{{ t('common.startUsing') }}</router-link>
    </div>
    <div class="news-layout">
      <div class="news-featured">
        <div class="news-featured-image" :style="{ backgroundImage: `url(${image})` }"></div>
        <div class="news-featured-body">
          <div class="card-meta">
            <span class="card-tag">{{ t('home.meetingTag') }}</span>
            <span class="card-date">2026-01-01</span>
          </div>
          <h3 class="news-featured-title">{{ t('home.newsFeaturedTitle') }}</h3>
          <p class="news-featured-excerpt">{{ t('home.newsFeaturedExcerpt') }}</p>
        </div>
      </div>
      <div class="news-list">
        <div v-for="i in 3" :key="i" class="news-item">
          <div class="card-meta">
            <span class="card-tag">{{ t('home.meetingTag') }}</span>
            <span class="card-date">2026-01-01</span>
          </div>
          <h3 class="news-item-title">{{ t('home.newsFeaturedTitle') }}</h3>
          <p class="news-item-excerpt">{{ t('home.newsItemExcerpt') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const image = '/media/HomePage-news.png'
</script>

<style scoped>
.news-section {
  width: 1200px;
  padding: 80px 0;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
}

.section-header-left h2 {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0 0 12px 0;
}

.section-header-left p {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #AFAFAF;
  margin: 0;
}

.news-layout {
  display: flex;
  gap: 32px;
}

.news-featured {
  width: 756px;
  height: 424px;
  border: 1px solid #323232;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.news-featured:hover {
  border-color: rgba(0, 115, 255, 0.5);
}

.news-featured-image {
  width: 756px;
  height: 424px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
}

.news-featured-body {
  padding: 20px;
}

.news-featured-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 10px 0;
}

.news-featured-excerpt {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  flex: 1;
  padding: 20px;
  border: 1px solid #323232;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.news-item:hover {
  border-color: rgba(0, 115, 255, 0.5);
}

.news-item-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-item-excerpt {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-tag {
  background: #303030;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  color: #FFFFFF;
}

.card-date {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  color: #FFFFFF;
}

.btn-medium {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s ease;
}

.btn-medium:hover {
  background: #FFFFFF;
  color: #121212;
}

@media (max-width: 1200px) {
  .news-section {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .news-layout {
    flex-direction: column;
  }

  .news-featured {
    width: 100%;
  }

  .news-featured-image {
    width: 100%;
  }
}
</style>
