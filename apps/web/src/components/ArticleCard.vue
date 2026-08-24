<template>
  <div class="article-card" :class="`article-card--${variant}`">
    <div class="article-card-image">
      <img
        v-if="item.cover"
        class="article-card-cover"
        :src="item.cover"
        :alt="item.coverAlt || item.title"
        loading="lazy"
      />
      <svg v-else width="100%" height="100%" viewBox="0 0 384 216" fill="none">
        <rect width="384" height="216" fill="var(--card-image-bg)" />
      </svg>
    </div>
    <div class="article-card-body">
      <div class="article-card-meta">
        <span class="article-card-tag">{{ item.tag }}</span>
        <span class="article-card-date">{{ item.date }}</span>
      </div>
      <h3 class="article-card-title">{{ item.title }}</h3>
      <p class="article-card-excerpt">{{ item.excerpt }}</p>
      <button class="article-card-btn" @click="emit('read-more', item)">{{ t('common.readMore') }}</button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  item: {
    type: Object,
    required: true
  },
  // 'dark' 用于首页深色区块，'light' 用于新闻中心浅色页面
  variant: {
    type: String,
    default: 'dark'
  }
})

const emit = defineEmits(['read-more'])
</script>

<style scoped>
.article-card {
  width: 100%;
  height: 432px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  transition: border-color 0.2s ease;
}

.article-card--dark {
  --card-border: #323232;
  --card-bg: transparent;
  --card-hover-border: rgba(0, 115, 255, 0.5);
  --card-text: #FFFFFF;
  --card-tag-bg: #303030;
  --card-image-bg: #2a2a2a;
  --card-btn-bg: transparent;
  --card-btn-border: #FFFFFF;
  --card-btn-hover-bg: #FFFFFF;
  --card-btn-hover-text: #121212;
  --card-btn-hover-border: #FFFFFF;
}

.article-card--light {
  --card-border: #D3D3D3;
  --card-bg: #FFFFFF;
  --card-hover-border: #0073FF;
  --card-text: #121212;
  --card-tag-bg: #D1EAFF;
  --card-image-bg: #D9D9D9;
  --card-btn-bg: #FFFFFF;
  --card-btn-border: #121212;
  --card-btn-hover-bg: #FFFFFF;
  --card-btn-hover-text: #0073FF;
  --card-btn-hover-border: #0073FF;
}

.article-card:hover {
  border-color: var(--card-hover-border);
}

.article-card-image {
  width: 100%;
  height: 216px;
  flex-shrink: 0;
  background: var(--card-image-bg);
}

.article-card-cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-card-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-card-tag {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
  background: var(--card-tag-bg);
  color: var(--card-text);
}

.article-card-date {
  font-size: 12px;
  font-weight: 400;
  color: var(--card-text);
}

.article-card-title {
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: var(--card-text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card-excerpt {
  flex: 1;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: var(--card-text);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 20px;
  border-radius: 30px;
  background: var(--card-btn-bg);
  border: 1px solid var(--card-btn-border);
  font-size: 14px;
  font-weight: 500;
  color: var(--card-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.article-card-btn:hover {
  background: var(--card-btn-hover-bg);
  color: var(--card-btn-hover-text);
  border-color: var(--card-btn-hover-border);
}
</style>
