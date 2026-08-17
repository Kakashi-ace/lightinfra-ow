<template>
  <div class="opticsgpt-doc-page">
    <!-- 主内容区域 -->
    <main class="doc-main-content">
      <!-- 主文档内容区 -->
      <div class="doc-content">
        <!-- 5.1 面包屑 -->
        <div class="breadcrumb">
          <span>资源</span>
          <span class="separator">/</span>
          <span>文档</span>
          <span class="separator">/</span>
          <span>OpticsGPT</span>
          <span class="separator">/</span>
          <span class="current">使用手册</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">OpticsGPT 使用手册</h1>

        <!-- 5.3 页面引言 -->
        <p class="intro-text">{{ docData?.intro || '本文档介绍 OpticsGPT 的主要功能、模型能力以及快速上手步骤。' }}</p>

        <!-- 5.4 标签行 -->
        <div class="tag-row">
          <span class="tag">{{ docData?.version || 'v2.1.0' }}</span>
          <span class="tag">{{ docData?.date || '2025-03-15' }}</span>
        </div>

        <!-- 5.5 分隔线 -->
        <hr class="divider" />

        <!-- 5.6 章节：文档说明 -->
        <section :id="pageNavItems[0].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[0].title }}</h2>
          <p class="section-text">{{ docData?.summary || 'OpticsGPT 是面向光学产业的大型语言模型，能够理解并生成光学领域的专业内容。' }}</p>
          <p class="section-text">{{ docData?.modelIntro || '模型基于 Transformer 架构，在海量光学文献、专利和工程报告上训练，具备光学概念解析、仿真代码生成、系统建模建议和文献摘要总结等能力。' }}</p>

          <!-- 5.7 能力概览卡片 -->
          <div class="ability-card">
            <div class="ability-title">能力概览</div>
            <div class="ability-list">
              <div v-for="ability in abilities" :key="ability" class="ability-item">
                <span class="ability-dot"></span>
                <span class="ability-text">{{ ability }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 5.8 应用说明段落 -->
        <p class="section-text application-text">
          {{ docData?.application || 'OpticsGPT 可集成到研发流程中，辅助工程师快速分析光学系统、生成仿真脚本并提供优化建议。' }}
        </p>

        <!-- 5.9 分隔线 -->
        <hr class="divider" />

        <!-- 5.10 章节：使用教程 -->
        <section :id="pageNavItems[1].id" class="doc-section">
          <h2 class="section-title">{{ pageNavItems[1].title }}</h2>
          <p class="section-intro">请按照以下步骤在本地部署并运行 OpticsGPT。</p>

          <!-- 5.11 步骤卡片 -->
          <div v-for="step in steps" :key="step.num" class="step-card">
            <div class="step-header">
              <span class="step-num">{{ step.num }}</span>
              <span class="step-title">{{ step.title }}</span>
            </div>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-version">{{ step.version }}</div>
            <div class="code-block">
              <span class="code-text">{{ step.code }}</span>
              <button class="copy-btn" @click="handleCopy(step.code)" :title="copiedCode === step.code ? '已复制' : '复制代码'">
                <svg v-if="copiedCode !== step.code" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="#535C6E" stroke-width="1.5"/>
                  <path d="M3 12V3.5C3 2.67 3.67 2 4.5 2H11" stroke="#535C6E" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9L7.5 12.5L14 5.5" stroke="#0073FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- 右侧页内导航 -->
      <aside class="page-nav">
        <div class="nav-track">
          <div class="nav-indicator" :style="{ top: indicatorTop }"></div>
        </div>
        <div class="nav-list">
          <div class="nav-header">页面目录</div>
          <div
            v-for="(item, index) in pageNavItems"
            :key="item.id"
            class="nav-item"
            :class="{
              'nav-item-active': activeNavItem === item.id,
              'nav-item-level2': item.level === 2
            }"
            @click="scrollToNav(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  docData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'navigate', 'tabChange', 'search', 'menuSelect', 'pageNavSelect', 'copyCode', 'demo', 'start'
])

const abilities = ['光学概念解析', '仿真代码生成', '系统建模建议', '文献摘要总结']

const pageNavItems = [
  { id: 'doc-info', title: '文档说明', level: 1 },
  { id: 'tutorial', title: '使用教程', level: 1 },
  { id: 'install', title: '安装依赖', level: 2 },
  { id: 'run', title: '运行应用', level: 2 }
]

const steps = [
  {
    num: '01',
    title: '安装依赖',
    desc: '使用 pip 安装 OpticsGPT 及相关依赖。',
    version: '适用于 v2.1.0 及以上版本',
    code: 'pip install opticsgpt'
  },
  {
    num: '02',
    title: '运行应用',
    desc: '在命令行中启动 OpticsGPT 服务。',
    version: '适用于所有版本',
    code: 'python -m opticsgpt.run'
  }
]

const activeNavItem = ref('doc-info')
const indicatorTop = ref('38px')
const copiedCode = ref(null)

const indicatorPositions = {
  'doc-info': '38px',
  'tutorial': '152px',
  'install': '266px',
  'run': '316px'
}

const scrollToNav = (id) => {
  activeNavItem.value = id
  indicatorTop.value = indicatorPositions[id] || '38px'
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  emit('pageNavSelect', { id })
}

const handleCopy = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    copiedCode.value = code
    emit('copyCode', code)
    setTimeout(() => {
      copiedCode.value = null
    }, 2000)
  })
}
</script>

<style scoped>
.opticsgpt-doc-page {
  width: 100%;
  min-height: 600px;
  background: #FFFFFF;
  font-family: system-ui, -apple-system, sans-serif;
}

.doc-main-content {
  display: flex;
  gap: 40px;
}

/* ========== 主文档内容区 ========== */
.doc-content {
  flex: 1;
  max-width: 690px;
  padding-bottom: 80px;
}

.breadcrumb {
  font-size: 12px;
  font-weight: 400;
  color: #8E96A6;
  line-height: 20px;
}

.breadcrumb .separator {
  margin: 0 8px;
}

.breadcrumb .current {
  color: #121212;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #121212;
  line-height: 36px;
  margin-top: 36px;
  margin-bottom: 0;
}

.intro-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 12px;
}

.tag-row {
  display: flex;
  gap: 4px;
  margin-top: 20px;
}

.tag {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 14px;
  background: #F0F7FF;
  border-radius: 16px;
  font-size: 12px;
  color: #0073FF;
}

.divider {
  width: 100%;
  height: 1px;
  background: #E2E7EF;
  border: none;
  margin-top: 20px;
}

.doc-section {
  margin-top: 36px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  line-height: 32px;
  margin: 0 0 14px 0;
}

.section-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 14px;
}

.section-intro {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-bottom: 20px;
}

.application-text {
  margin-top: 20px;
}

/* 能力概览卡片 */
.ability-card {
  width: 100%;
  background: #F8FAFD;
  border: 1px solid #E2E7EF;
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 14px;
}

.ability-title {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  line-height: 22px;
}

.ability-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 48px;
  margin-top: 10px;
}

.ability-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ability-dot {
  width: 6px;
  height: 6px;
  background: #0073FF;
  border-radius: 50%;
}

.ability-text {
  font-size: 14px;
  color: #535C6E;
}

/* 步骤卡片 */
.step-card {
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E2E7EF;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.step-num {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: #F0F7FF;
  border-radius: 16px;
  font-size: 12px;
  color: #0073FF;
}

.step-title {
  font-size: 16px;
  font-weight: 600;
  color: #121212;
}

.step-desc {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin-top: 12px;
}

.step-version {
  font-size: 12px;
  color: #8E96A6;
  text-align: right;
  margin-top: 8px;
}

.code-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FAFBFD;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  padding: 14px 16px;
  margin-top: 14px;
}

.code-text {
  font-size: 14px;
  color: #535C6E;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.copy-btn:hover {
  opacity: 0.7;
}

/* ========== 右侧页内导航 ========== */
.page-nav {
  width: 168px;
  flex-shrink: 0;
  display: flex;
  gap: 0;
  padding-top: 0;
}

.nav-track {
  position: relative;
  width: 1px;
  background: #E2E7EF;
}

.nav-indicator {
  position: absolute;
  left: -1px;
  width: 2px;
  height: 28px;
  background: #0073FF;
  border-radius: 1px;
  transition: top 0.2s ease;
}

.nav-list {
  padding-left: 12px;
  flex: 1;
}

.nav-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 14px;
}

.nav-item {
  font-size: 14px;
  font-weight: 400;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
  line-height: 28px;
}

.nav-item:hover {
  color: #0073FF;
}

.nav-item-level2 {
  padding-left: 12px;
  font-size: 13px;
}

.nav-item-active {
  color: #0073FF;
  font-weight: 600;
}
</style>
