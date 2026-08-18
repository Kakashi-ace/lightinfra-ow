<template>
  <section class="research-section">
    <div class="section-header-row">
      <div class="section-header-left">
        <h2>{{ t('home.researchTitle') }}</h2>
        <p>{{ t('home.researchDesc') }}</p>
      </div>
      <router-link to="/news" class="btn-medium">{{ t('common.startUsing') }}</router-link>
    </div>
    <div class="news-cards">
      <div v-for="card in cards" :key="card.image" class="news-card">
        <div class="card-image" :style="{ backgroundImage: `url(${card.image})` }"></div>
        <div class="card-body">
          <div class="card-meta">
            <span class="card-tag">{{ t('home.articleTag') }}</span>
            <span class="card-date">2026-01-01</span>
          </div>
          <h3 class="card-title">{{ t('home.researchTitle1') }}</h3>
          <p class="card-excerpt">{{ t('home.researchExcerpt1') }}</p>
        </div>
        <a href="#" class="card-btn">{{ t('common.applyDemo') }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const cards = [
  { image: '/media/HomePage- research01.png' },
  { image: '/media/HomePage- research02.png' },
  { image: '/media/HomePage- research03.png' }
]
</script>

<style scoped>
.research-section {
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

.news-cards {
  display: flex;
  gap: 33px;
  justify-content: center;
}

.news-card {
  width: 384px;
  height: 432px;
  border: 1px solid #323232;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 115, 255, 0.5);
}

.card-image {
  width: 384px;
  height: 216px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
}

.card-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.card-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
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

.card-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  width: fit-content;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  margin: auto 20px 20px;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.card-btn:hover {
  background: #FFFFFF;
  color: #121212;
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
  .research-section {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .news-cards {
    flex-direction: column;
    align-items: center;
  }

  .news-card {
    width: 100%;
    max-width: 500px;
  }
}
</style>
