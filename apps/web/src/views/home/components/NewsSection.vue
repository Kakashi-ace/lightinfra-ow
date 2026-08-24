<template>
  <section class="news-section">
    <div class="section-header-row">
      <div class="section-header-left">
        <h2>{{ t('home.newsTitle') }}</h2>
        <p>{{ t('home.newsDesc') }}</p>
      </div>
      <router-link to="/news-research" class="btn-large">{{ t('common.viewMore') }}</router-link>
    </div>
    <div class="news-layout">
      <a
        v-if="featuredItem"
        class="news-featured"
        :href="featuredItem.externalUrl"
        target="_blank"
        rel="noopener"
      >
        <div class="news-featured-image">
          <img
            v-if="featuredItem.cover"
            class="news-featured-img"
            :src="featuredItem.cover"
            :alt="featuredItem.coverAlt || featuredItem.title"
            loading="lazy"
          />
          <svg v-else width="100%" height="100%" viewBox="0 0 756 424" fill="none">
            <rect width="756" height="424" fill="#2a2a2a" />
          </svg>
        </div>
        <div class="news-featured-body">
          <h3 class="news-featured-title">{{ featuredItem.title }}</h3>
          <div class="news-featured-info">
            <div class="card-meta">
              <span class="card-tag">{{ featuredItem.tag }}</span>
              <span class="card-date">{{ featuredItem.date }}</span>
            </div>
            <p class="news-featured-excerpt">{{ featuredItem.excerpt }}</p>
          </div>
        </div>
      </a>
      <div class="news-list">
        <a
          v-for="item in smallItems"
          :key="item.id"
          class="news-item"
          :href="item.externalUrl"
          target="_blank"
          rel="noopener"
        >
          <div class="card-meta">
            <span class="card-tag">{{ item.tag }}</span>
            <span class="card-date">{{ item.date }}</span>
          </div>
          <h3 class="news-item-title">{{ item.title }}</h3>
          <p class="news-item-excerpt">{{ item.excerpt }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNewsList } from '@/composables/useNewsList'

const { t } = useI18n()

const { list } = useNewsList()
const featuredItem = computed(() => list.value.find((item) => item.featured) ?? list.value[0] ?? null)
const smallItems = computed(() =>
  list.value.filter((item) => item.id !== featuredItem.value?.id).slice(0, 3)
)
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
  display: block;
  width: 756px;
  text-decoration: none;
}

.news-featured:hover .news-featured-image {
  border-color: rgba(0, 115, 255, 0.5);
}

.news-featured-image {
  width: 756px;
  height: 424px;
  background-color: #2a2a2a;
  border: 1px solid #323232;
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.news-featured-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-featured-body {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 20px;
}

.news-featured-title {
  flex: 1;
  min-width: 0;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-featured-info {
  flex-shrink: 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  min-height: 131px;
  padding: 20px;
  border: 1px solid #323232;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.btn-large {
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
}

.btn-large:hover {
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

  .news-featured-body {
    flex-direction: column;
  }

  .news-featured-info {
    width: 100%;
  }
}
</style>
