<template>
  <section class="news-section">
    <div class="news-container">
      <div class="news-header">
        <h2 class="news-title">{{ t('news.sectionTitle') }}</h2>
        <p class="news-subtitle">{{ subtitle }}</p>
      </div>
      <div class="news-grid">
        <ArticleCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          variant="light"
          @read-more="emit('readMore', item)"
        />
      </div>
      <div v-if="hasMore" class="news-footer">
        <button class="load-more-btn" :disabled="loading" @click="emit('loadMore')">{{ t('common.loadMore') }}</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ArticleCard from '@/components/ArticleCard.vue'

const { t } = useI18n()

defineProps({
  subtitle: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  },
  // 是否还有下一页；为 false 时不展示"加载更多"按钮
  hasMore: {
    type: Boolean,
    default: false
  },
  // 是否正在加载下一页，用于禁用按钮防止重复点击
  loading: {
    type: Boolean,
    default: false
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

.load-more-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
