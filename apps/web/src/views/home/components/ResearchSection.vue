<template>
  <section class="research-section">
    <div class="section-header-row">
      <div class="section-header-left">
        <h2>{{ t('home.researchTitle') }}</h2>
        <p>{{ t('home.researchDesc') }}</p>
      </div>
      <router-link to="/news-research/research-list" class="btn-large">{{ t('common.viewMore') }}</router-link>
    </div>
    <div class="news-cards">
      <div v-for="card in cards" :key="card.id" class="card-slot">
        <ArticleCard :item="card" variant="dark" @read-more="goDetail" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useResearchList } from '@/composables/useResearchList'
import ArticleCard from '@/components/ArticleCard.vue'

const router = useRouter()
const { t } = useI18n()

const { list } = useResearchList()
const cards = computed(() => list.value.slice(0, 3))

const goDetail = (item) => {
  router.push({ name: 'research-detail', params: { id: item.id } })
}
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
  justify-content: flex-start;
}

.card-slot {
  width: 384px;
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
  .research-section {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .news-cards {
    flex-direction: column;
    align-items: center;
  }

  .card-slot {
    width: 100%;
    max-width: 500px;
  }
}
</style>
