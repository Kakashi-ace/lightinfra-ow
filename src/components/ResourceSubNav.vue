<template>
  <div class="resource-sub-nav">
    <!-- 左侧标签区域 -->
    <div class="tab-list">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="tab-item"
        :class="{ 'tab-item-active': activeTab === tab }"
        @click="handleTabClick(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <!-- 右侧搜索框 -->
    <div class="search-box" :class="{ 'search-box-focused': isSearchFocused }">
      <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        v-model="searchKeyword"
        type="text"
        class="search-input"
        placeholder="想要查找什么？"
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
        @keyup.enter="handleSearch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props: 当前激活的标签
const props = defineProps({
  activeTab: {
    type: String,
    default: '下载'
  }
})

// Emits
const emit = defineEmits([
  'update:activeTab',
  'search'
])

// 标签列表
const tabs = ['下载', '文档', '帮助']

// 搜索相关状态
const searchKeyword = ref('')
const isSearchFocused = ref(false)

// 点击标签
const handleTabClick = (tab) => {
  emit('update:activeTab', tab)
}

// 搜索提交
const handleSearch = () => {
  emit('search', searchKeyword.value)
}
</script>

<style scoped>
.resource-sub-nav {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 左侧标签区域 */
.tab-list {
  display: flex;
  gap: 32px;
}

.tab-item {
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: #BBBBBB;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.tab-item:hover {
  color: #121212;
}

.tab-item-active {
  color: #121212;
}

/* 右侧搜索框 */
.search-box {
  width: 230px;
  height: 40px;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 10px;
  transition: border-color 0.2s ease;
}

.search-box-focused {
  border-color: #0073FF;
}

.search-icon {
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #121212;
  padding-left: 0;
}

.search-input::placeholder {
  color: #BBBBBB;
}
</style>
