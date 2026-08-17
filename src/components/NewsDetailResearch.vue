<template>
  <div class="news-detail-research">
    <!-- 2. Hero 标题区 -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-header">
          <span class="hero-tag">{{ articleData.tag }}</span>
          <h1 class="hero-title">{{ articleData.title }}</h1>
        </div>
        <p class="hero-date">{{ articleData.date }}</p>
      </div>
    </div>

    <!-- 3. 正文内容区 -->
    <main class="main-content">
      <div class="section-body">
        <p
          v-for="(para, index) in articleData.paragraphs"
          :key="'p-' + index"
          class="paragraph"
        >
          {{ para }}
        </p>
      </div>
    </main>

  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 详情组件只负责渲染：接收 articleData（{tag, title, date, paragraphs}）。
// 数据由父级（NewsDetailResearchView）从 Strapi 拉取后传入，不做本地硬编码兜底。
const props = defineProps({
  articleData: {
    type: Object,
    default: () => ({
      tag: '论文',
      title: '',
      date: '',
      paragraphs: [],
    }),
  },
})

defineEmits(['copyDoi'])
</script>

<style scoped>
.news-detail-research {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== Hero 标题区 ========== */
.hero-section {
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  display: flex;
  align-items: flex-end;
  padding-top: 80px;
}

.hero-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background: #4754E1;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  height: 32px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.hero-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

.hero-date {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

/* ========== 3. 正文内容区 ========== */
.main-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 80px;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
}

.paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
  text-align: justify;
}


</style>
