<template>
  <div class="doc-content-wrapper">
    <main class="doc-content" id="doc-content">
      <!-- 面包屑 -->
      <div class="breadcrumb">
        {{ docData.breadcrumb }}
      </div>

      <!-- 页面标题 -->
      <h1 class="page-title">{{ docData.moduleName }}</h1>

      <!-- 页面副标题 -->
      <p class="page-subtitle">{{ docData.moduleDesc }}</p>

      <!-- 分隔线 -->
      <hr class="divider" />

      <!-- 章节标题 -->
      <h2 class="section-title">{{ docData.structureTitle }}</h2>

      <!-- 子模块入口卡片 -->
      <div class="submodule-list">
        <div
          v-for="(submodule, index) in docData.submodules"
          :key="index"
          class="submodule-card"
          @click="handleSubmoduleClick(submodule.name)"
        >
          <div class="submodule-link">{{ submodule.name }}</div>
          <div class="submodule-desc">{{ submodule.description }}</div>
        </div>
      </div>
    </main>

    <!-- 右侧页内导航 -->
    <aside class="right-nav">
      <div class="nav-header">{{ docData.navTitle }}</div>
      <div class="nav-list">
        <div
          v-for="(nav, index) in docData.navItems"
          :key="index"
          class="nav-item"
          :class="{ 'nav-item-active': nav.active }"
        >
          {{ nav.name }}
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
const props = defineProps({
  docData: {
    type: Object,
    default: () => ({
      breadcrumb: '资源 / 文档 / IFTS / 代码说明文档 / Transmitter',
      moduleName: 'Transmitter',
      moduleDesc: 'Transmitter 模块负责信号发射端的相关功能，包括脉冲整形、信号调制等核心处理流程。',
      structureTitle: '模块构成',
      navTitle: '本页内容',
      submodules: [
        {
          name: 'shaping',
          description: '脉冲整形相关功能，负责对发射信号进行成型滤波处理'
        }
      ],
      navItems: [
        { name: '模块简介', active: true },
        { name: '模块构成', active: false }
      ]
    })
  }
})

const emit = defineEmits(['pageNavSelect', 'subModuleClick'])

const handleSubmoduleClick = (moduleName) => {
  emit('subModuleClick', moduleName)
}
</script>

<style scoped>
.doc-content-wrapper {
  display: flex;
  gap: 24px;
  width: 100%;
}

.doc-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 690px;
  background: #FFFFFF;
}

.breadcrumb {
  font-size: 12px;
  font-weight: 400;
  color: #8E96A6;
  line-height: 20px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
  margin: 0;
}

.divider {
  width: 690px;
  height: 1px;
  background: #E2E7EF;
  border: none;
  margin: 0;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
  margin: 0;
}

.submodule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.submodule-card {
  width: 690px;
  height: 58px;
  border: 1px solid #E2E7EF;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.submodule-card:hover {
  border-color: #0073FF;
}

.submodule-link {
  width: 190px;
  font-size: 14px;
  font-weight: 600;
  color: #0073FF;
  line-height: 22px;
}

.submodule-desc {
  width: 448px;
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  line-height: 22px;
}

/* 右侧页内导航 */
.right-nav {
  width: 180px;
  flex-shrink: 0;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.nav-list {
  display: flex;
  flex-direction: column;
}

.nav-item {
  height: 30px;
  padding: 5px 8px;
  font-size: 13px;
  font-weight: 400;
  color: #535C6E;
  line-height: 20px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #0073FF;
}

.nav-item-active {
  font-weight: 600;
  color: #0073FF;
}
</style>
