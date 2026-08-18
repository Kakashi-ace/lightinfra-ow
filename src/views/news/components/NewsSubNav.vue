<template>
  <div class="sub-nav">
    <div class="sub-nav-container">
      <div class="sub-nav-tabs">
        <button
          class="sub-nav-tab"
          :class="{ 'sub-nav-tab-active': activeTab === 'news' }"
          @click="emit('update:activeTab', 'news')"
        >
          {{ t('news.newsTab') }}
        </button>
        <button
          class="sub-nav-tab"
          :class="{ 'sub-nav-tab-active': activeTab === 'research' }"
          @click="emit('update:activeTab', 'research')"
        >
          {{ t('news.researchTab') }}
        </button>
      </div>
      <div class="search-box">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="text"
          class="search-input"
          :placeholder="t('news.searchPlaceholder')"
          v-model="keyword"
          @keyup.enter="emit('search', keyword)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  activeTab: {
    type: String,
    default: 'news'
  }
})

const emit = defineEmits(['update:activeTab', 'search'])

const keyword = ref('')

// 复位搜索词（若父级需要，可监听外部关键字）
watch(() => props.searchKeyword, (v) => { if (v !== undefined) keyword.value = v })
</script>

<style scoped>
.sub-nav {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
}

.sub-nav-container {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.sub-nav-tabs {
  display: flex;
  gap: 32px;
}

.sub-nav-tab {
  font-size: 14px;
  font-weight: 500;
  color: #BBBBBB;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.sub-nav-tab:hover {
  color: #0073FF;
}

.sub-nav-tab-active {
  color: #FFFFFF;
  font-weight: 600;
}

.search-box {
  position: relative;
  width: 230px;
  height: 40px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: #BBBBBB;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 100%;
  padding: 0 12px 0 40px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  font-size: 14px;
  color: #FFFFFF;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input::placeholder {
  color: #BBBBBB;
}

.search-input:focus {
  border-color: #0073FF;
}
</style>
