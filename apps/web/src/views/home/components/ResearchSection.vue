<template>
  <section class="research-section">
    <div class="section-header-row">
      <div class="section-header-left">
        <h2>{{ t('home.researchTitle') }}</h2>
        <p>{{ t('home.researchDesc') }}</p>
      </div>
      <router-link to="/news-research/research-list" class="btn-large">{{ t('common.viewMore') }}</router-link>
    </div>
    <div class="research-list">
      <router-link
        v-for="item in cards"
        :key="item.id"
        :to="{ name: 'research-detail', params: { id: item.id } }"
        class="research-row"
      >
        <span class="research-title">{{ item.title }}</span>
        <time class="research-date" :datetime="item.date">{{ item.date }}</time>
        <span class="research-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResearchList } from '@/composables/useResearchList'

const { t } = useI18n()

const { list } = useResearchList()
const cards = computed(() => list.value.slice(0, 3))
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

.research-list {
  border-top: 1px solid #323232;
}

.research-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 48px;
  gap: 40px;
  align-items: center;
  min-height: 104px;
  padding: 0 28px;
  border-bottom: 1px solid #323232;
  color: #FFFFFF;
  text-decoration: none;
  transition: background-color 0.25s ease;
}

.research-row:hover,
.research-row:focus-visible {
  background: #0073FF;
}

.research-row:focus-visible {
  position: relative;
  z-index: 1;
  outline: 2px solid #FFFFFF;
  outline-offset: -2px;
}

.research-title {
  min-width: 0;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.research-date {
  color: #AFAFAF;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  white-space: nowrap;
  transition: color 0.25s ease;
}

.research-row:hover .research-date,
.research-row:focus-visible .research-date {
  color: #FFFFFF;
}

.research-arrow {
  box-sizing: border-box;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 50%;
  transition: border-color 0.25s ease;
}

.research-row:hover .research-arrow,
.research-row:focus-visible .research-arrow {
  border-color: #FFFFFF;
}

.research-arrow svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
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
    box-sizing: border-box;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .research-row {
    grid-template-columns: minmax(0, 1fr) auto 44px;
    gap: 24px;
    min-height: 92px;
    padding: 0 20px;
  }

  .research-title {
    font-size: 21px;
  }

  .research-arrow {
    width: 44px;
    height: 44px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .research-row,
  .research-date,
  .research-arrow {
    transition: none;
  }
}
</style>
