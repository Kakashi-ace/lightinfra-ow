<template>
  <div class="doc-page">
    <!-- ========== 1. 顶部主导航栏 ========== -->
    <header class="main-nav">
      <div class="nav-container">
        <!-- 左侧 Logo + 导航链接 -->
        <div class="nav-left">
          <a href="/" class="nav-logo" aria-label="LightInfra 首页">
            <svg width="112" height="37" viewBox="0 0 112 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="6,0 28,0 28,26" fill="#020952" />
              <polygon points="0,17 22,17 22,37" fill="#020952" />
              <rect x="42" y="4" width="4" height="30" fill="#020952"/>
              <rect x="52" y="12" width="4" height="22" fill="#020952"/>
              <rect x="62" y="8" width="4" height="26" fill="#020952"/>
              <rect x="72" y="15" width="4" height="18" fill="#020952"/>
              <rect x="82" y="6" width="4" height="28" fill="#020952"/>
              <rect x="92" y="11" width="4" height="23" fill="#020952"/>
            </svg>
          </a>

          <nav class="nav-links">
            <a
              v-for="link in navLinks"
              :key="link.path"
              :href="link.path"
              class="nav-link"
              :class="{ 'nav-link-active': currentPage === link.page }"
              @click.prevent="handleNavigate(link.page)"
            >
              {{ link.name }}
            </a>
          </nav>
        </div>

        <!-- 右侧按钮 -->
        <div class="nav-right">
          <button class="btn btn-outline" @click="$emit('navigate', { type: 'demo' })">
            申请演示
          </button>
          <button class="btn btn-filled" @click="$emit('navigate', { type: 'start' })">
            开始使用
          </button>
        </div>
      </div>
    </header>

    <!-- ========== 2. 子导航栏 ========== -->
    <div class="sub-nav-bar">
      <div class="sub-nav-container">
        <!-- 左侧标签 -->
        <div class="sub-tabs">
          <button
            v-for="tab in subTabs"
            :key="tab"
            class="sub-tab"
            :class="{ 'sub-tab-active': activeTab === tab }"
            @click="$emit('tabChange', tab)"
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
    </div>

    <!-- ========== 3. 主内容区域 ========== -->
    <div class="doc-content-wrapper">
      <!-- ========== 3. 左侧产品导航 ========== -->
      <aside class="product-sidebar">
        <!-- OpticsGPT 导航 -->
        <div class="nav-section">
          <div
            class="nav-parent"
            :class="{ 'nav-parent-active': true }"
            @click="toggleSection('opticsgpt')"
          >
            <span>OpticsGPT</span>
            <svg class="arrow-icon" :class="{ 'arrow-rotated': expandedSections.opticsgpt }" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div v-show="expandedSections.opticsgpt" class="nav-children">
            <div
              class="nav-child"
              :class="{ 'nav-child-active': activeDoc === 'manual' }"
              @click="handleDocChange('manual')"
            >
              使用手册
            </div>
            <div
              class="nav-child"
              :class="{ 'nav-child-active': activeDoc === 'changelog' }"
              @click="handleDocChange('changelog')"
            >
              更新日志
            </div>
          </div>
        </div>

        <!-- IFTS 导航 -->
        <div class="nav-section">
          <div
            class="nav-parent"
            :class="{ 'nav-parent-active': expandedSections.ifts }"
            @click="toggleSection('ifts')"
          >
            <span>IFTS</span>
            <svg class="arrow-icon" :class="{ 'arrow-rotated': expandedSections.ifts }" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div v-show="expandedSections.ifts" class="nav-children">
            <div
              class="nav-child"
              :class="{ 'nav-child-active': activeDoc === 'code-docs' }"
              @click="handleDocChange('code-docs')"
            >
              代码说明文档
            </div>
            <!-- 二级模块 -->
            <div class="nav-sub-children">
              <div
                v-for="module in iftsModules"
                :key="module"
                class="nav-child nav-child-indent"
                :class="{ 'nav-child-active': activeDoc === module }"
                @click="handleDocChange(module)"
              >
                {{ module }}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- ========== 4. 右侧页内导航 ========== -->
      <aside class="toc-sidebar">
        <div class="toc-header">页面目录</div>
        <div class="toc-list">
          <div
            v-for="chapter in tocChapters"
            :key="chapter.id"
            class="toc-item"
            :class="{ 'toc-item-active': activeChapter === chapter.id }"
            @click="scrollToChapter(chapter.id)"
          >
            {{ chapter.title }}
          </div>
          <!-- 二级目录 -->
          <div class="toc-sub-list">
            <div
              v-for="sub in tutorialSteps"
              :key="sub.id"
              class="toc-sub-item"
              @click="scrollToChapter(sub.id)"
            >
              {{ sub.title }}
            </div>
          </div>
        </div>
        <!-- 蓝色指示条 -->
        <div class="toc-indicator" :style="{ top: indicatorTop }"></div>
      </aside>

      <!-- ========== 5. 主文档内容区 ========== -->
      <main class="doc-main-content" ref="mainContentRef">
        <!-- 5.1 面包屑 -->
        <div class="breadcrumb">
          <span>首页</span>
          <span class="separator">/</span>
          <span>资源</span>
          <span class="separator">/</span>
          <span>OpticsGPT</span>
          <span class="separator">/</span>
          <span class="current">使用手册</span>
        </div>

        <!-- 5.2 页面标题 -->
        <h1 class="page-title">OpticsGPT 使用手册</h1>

        <!-- 5.3 引言 -->
        <p class="intro-text">本文档介绍 OpticsGPT 的主要功能、模型能力以及快速上手步骤。</p>

        <!-- 5.4 标签行 -->
        <div class="tag-row">
          <span class="tag">v2.1.0</span>
          <span class="tag">2025-03-15</span>
        </div>

        <!-- 5.5 分隔线 -->
        <hr class="divider" />

        <!-- 5.6 章节：文档说明 -->
        <section id="doc-intro" class="doc-section">
          <h2 class="section-title">文档说明</h2>
          <p class="section-text">
            OpticsGPT 是面向光学产业的大型语言模型，专注于光学领域的问题解答、代码生成和技术文档撰写。本模型基于深度学习架构，针对光学系统仿真、激光原理、光学设计等场景进行了专项优化。
          </p>
          <p class="section-text">
            模型训练数据涵盖了光学教科书、科研论文、技术手册等权威资料，确保输出的专业性和准确性。无论您是光学专业学生、研究人员还是工程师，OpticsGPT 都能提供有力的辅助支持。
          </p>

          <!-- 5.7 能力概览卡片 -->
          <div class="capability-card">
            <div class="capability-title">能力概览</div>
            <div class="capability-list">
              <div v-for="cap in capabilities" :key="cap" class="capability-item">
                <span class="capability-dot"></span>
                <span>{{ cap }}</span>
              </div>
            </div>
          </div>

          <!-- 5.8 应用说明段落 -->
          <p class="section-text">
            通过 OpticsGPT，您可以快速获取光学概念的解释、生成仿真实验代码、获得光学系统设计的建议，以及自动摘要相关文献。我们的目标是让光学领域的工作者能够更高效地完成日常科研和技术任务。
          </p>
        </section>

        <!-- 5.9 分隔线 -->
        <hr class="divider" />

        <!-- 5.10 章节：使用教程 -->
        <section id="tutorial" class="doc-section">
          <h2 class="section-title">使用教程</h2>
          <p class="section-intro">请按照以下步骤在本地部署并运行 OpticsGPT。</p>

          <!-- 5.11 步骤卡片 -->
          <div
            v-for="step in tutorialSteps"
            :key="step.id"
            :id="step.id"
            class="step-card"
          >
            <div class="step-header">
              <span class="step-number">{{ step.number }}</span>
              <span class="step-title">{{ step.title }}</span>
            </div>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-version">适用于 v2.1.0 及以上版本</div>
            <div class="code-block">
              <code class="code-text">{{ step.code }}</code>
              <button class="copy-btn" @click="handleCopyCode(step.code)">
                <svg v-if="copiedCode !== step.code" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- ========== 6. 页脚 ========== -->
    <footer class="page-footer">
      <div class="footer-container">
        <!-- 页脚左侧 -->
        <div class="footer-left">
          <svg class="footer-logo" width="205" height="68" viewBox="0 0 112 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="6,0 28,0 28,26" fill="#0073FF" />
            <polygon points="0,17 22,17 22,37" fill="#0073FF" />
            <rect x="42" y="4" width="4" height="30" fill="#0073FF"/>
            <rect x="52" y="12" width="4" height="22" fill="#0073FF"/>
            <rect x="62" y="8" width="4" height="26" fill="#0073FF"/>
            <rect x="72" y="15" width="4" height="18" fill="#0073FF"/>
            <rect x="82" y="6" width="4" height="28" fill="#0073FF"/>
            <rect x="92" y="11" width="4" height="23" fill="#0073FF"/>
          </svg>

          <div class="contact-info">
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#020952" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>商务合作请联系：business@infra.com</span>
            </div>
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#020952" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>招聘咨询请联系：hr@infra.com</span>
            </div>
          </div>

          <div class="qr-code"></div>
        </div>

        <!-- 页脚右侧 -->
        <div class="footer-right">
          <div class="footer-column">
            <h4 class="column-title">产品</h4>
            <a href="/products/opticsgpt" class="column-link">OpticsGPT</a>
            <a href="/products/ifts" class="column-link">智能仿真工具</a>
            <a href="/products/instruments" class="column-link">智能仪器仪表</a>
          </div>

          <div class="footer-column">
            <h4 class="column-title">新闻中心</h4>
            <a href="/news" class="column-link">新闻动态</a>
            <a href="/research" class="column-link">前沿研究</a>
          </div>

          <div class="footer-column">
            <h4 class="column-title">关于LightInfra</h4>
          </div>

          <div class="footer-column">
            <h4 class="column-title">联系我们</h4>
            <a href="/contact" class="column-link">联系方式</a>
            <a href="/join" class="column-link">加入我们</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Props
const props = defineProps({
  docData: {
    type: Object,
    default: () => ({})
  },
  activeTab: {
    type: String,
    default: '文档'
  }
})

// Emits
const emit = defineEmits([
  'navigate',
  'tabChange',
  'search',
  'copyCode'
])

// 导航状态
const currentPage = ref('resource')
const activeDoc = ref('manual')
const activeChapter = ref('doc-intro')

// 搜索状态
const searchKeyword = ref('')
const isSearchFocused = ref(false)
const copiedCode = ref('')

// 顶部导航链接
const navLinks = [
  { name: '产品', path: '/products', page: 'product' },
  { name: '新闻中心', path: '/news', page: 'news' },
  { name: '资源', path: '/resources', page: 'resource' },
  { name: '关于 LightInfra', path: '/about', page: 'about' },
  { name: '联系我们', path: '/contact', page: 'contact' }
]

// 子导航标签
const subTabs = ['下载', '文档', '帮助']

// 产品导航展开状态
const expandedSections = reactive({
  opticsgpt: true,
  ifts: false
})

// IFTS 二级模块
const iftsModules = ['简介', 'Base Module', 'Signal', 'Channel', 'Transmitter', 'Receiver', 'ToolBox', '更新日志']

// 能力概览
const capabilities = ['光学概念解析', '仿真代码生成', '系统建模建议', '文献摘要总结']

// 教程步骤
const tutorialSteps = [
  {
    id: 'step-install',
    number: '01',
    title: '安装依赖',
    desc: '在终端中运行以下命令安装 OpticsGPT 所需的 Python 依赖包。确保您的 Python 版本为 3.8 或更高版本。',
    code: 'pip install opticsgpt'
  },
  {
    id: 'step-run',
    number: '02',
    title: '运行应用',
    desc: '安装完成后，通过以下命令启动 OpticsGPT 应用。首次启动会自动下载模型权重，请确保网络连接稳定。',
    code: 'opticsgpt start'
  }
]

// 目录章节
const tocChapters = [
  { id: 'doc-intro', title: '文档说明' },
  { id: 'tutorial', title: 'Optics GPT 使用教程' }
]

// 指示器位置
const indicatorTop = ref('38px')

// 方法
const handleNavigate = (page) => {
  emit('navigate', { type: page })
}

const handleSearch = () => {
  emit('search', searchKeyword.value)
}

const toggleSection = (section) => {
  expandedSections[section] = !expandedSections[section]
}

const handleDocChange = (doc) => {
  activeDoc.value = doc
}

const scrollToChapter = (id) => {
  activeChapter.value = id
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const handleCopyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    copiedCode.value = code
    emit('copyCode', code)
    setTimeout(() => {
      copiedCode.value = ''
    }, 2000)
  })
}
</script>

<style scoped>
/* ========== 页面整体布局 ========== */
.doc-page {
  width: 1440px;
  min-height: 2243px;
  margin: 0 auto;
  background: #FFFFFF;
  font-family: system-ui, -apple-system, sans-serif;
}

/* ========== 1. 顶部主导航栏 ========== */
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E7EF;
}

.nav-container {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 77px;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 14px;
  font-weight: 500;
  color: #020952;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #0073FF;
}

.nav-link-active {
  color: #0073FF;
  font-weight: 600;
}

.nav-right {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline {
  background: transparent;
  color: #020952;
  border: 1px solid rgba(2, 9, 82, 0.3);
}

.btn-outline:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.btn-filled {
  background: #020952;
  color: #FFFFFF;
  border: 1px solid #020952;
}

.btn-filled:hover {
  background: #0073FF;
  border-color: #0073FF;
}

/* ========== 2. 子导航栏 ========== */
.sub-nav-bar {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E7EF;
}

.sub-nav-container {
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.sub-tabs {
  display: flex;
  gap: 32px;
}

.sub-tab {
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

.sub-tab:hover {
  color: #121212;
}

.sub-tab-active {
  color: #121212;
}

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
}

.search-input::placeholder {
  color: #BBBBBB;
}

/* ========== 3. 主内容区域 ========== */
.doc-content-wrapper {
  display: flex;
  padding-top: 160px;
  position: relative;
}

/* ========== 左侧产品导航 ========== */
.product-sidebar {
  position: fixed;
  left: 120px;
  top: 160px;
  width: 282px;
}

.nav-section {
  margin-bottom: 2px;
}

.nav-parent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-parent:hover {
  background: #F0F7FF;
}

.nav-parent-active {
  color: #121212;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.arrow-rotated {
  transform: rotate(180deg);
}

.nav-children {
  padding-left: 20px;
}

.nav-child {
  padding: 4px 20px;
  font-size: 14px;
  font-weight: 400;
  color: #8E96A6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-child:hover {
  color: #121212;
}

.nav-child-active {
  background: #F0F7FF;
  color: #121212;
}

.nav-child-indent {
  padding-left: 52px;
}

.nav-sub-children {
  margin-top: 4px;
}

/* ========== 4. 右侧页内导航 ========== */
.toc-sidebar {
  position: fixed;
  left: 1140px;
  top: 196px;
  width: 200px;
  padding-left: 12px;
  border-left: 1px solid #E2E7EF;
}

.toc-header {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 14px;
}

.toc-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toc-item {
  font-size: 14px;
  font-weight: 500;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
}

.toc-item:hover {
  color: #0073FF;
}

.toc-item-active {
  color: #0073FF;
  font-weight: 600;
}

.toc-sub-list {
  padding-left: 12px;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toc-sub-item {
  font-size: 14px;
  color: #535C6E;
  cursor: pointer;
  transition: color 0.2s ease;
}

.toc-sub-item:hover {
  color: #0073FF;
}

.toc-indicator {
  position: absolute;
  left: -1px;
  width: 2px;
  height: 20px;
  background: #0073FF;
  transition: top 0.2s ease;
}

/* ========== 5. 主文档内容区 ========== */
.doc-main-content {
  margin-left: 426px;
  width: 690px;
  padding-bottom: 80px;
}

.breadcrumb {
  font-size: 12px;
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
  margin-top: 42px;
}

.tag {
  padding: 6px 14px;
  background: #F0F7FF;
  border-radius: 16px;
  font-size: 12px;
  color: #0073FF;
}

.divider {
  width: 690px;
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
  margin: 0 0 14px 0;
}

.section-text {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0 0 14px 0;
}

.section-intro {
  font-size: 14px;
  color: #535C6E;
  line-height: 22px;
  margin: 0 0 20px 0;
}

/* 能力概览卡片 */
.capability-card {
  width: 690px;
  background: #F8FAFD;
  border: 1px solid #E2E7EF;
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 20px;
}

.capability-title {
  font-size: 14px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 12px;
}

.capability-list {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
}

.capability-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #535C6E;
}

.capability-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0073FF;
}

/* 步骤卡片 */
.step-card {
  width: 690px;
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
  margin-bottom: 12px;
}

.step-number {
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
  margin: 0 0 8px 0;
}

.step-version {
  font-size: 12px;
  color: #8E96A6;
  line-height: 20px;
  text-align: right;
  margin-bottom: 12px;
}

.code-block {
  background: #FAFBFD;
  border: 1px solid #E2E7EF;
  border-radius: 6px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-text {
  font-family: monospace;
  font-size: 14px;
  color: #535C6E;
}

.copy-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #535C6E;
  transition: color 0.2s ease;
  padding: 4px;
}

.copy-btn:hover {
  color: #0073FF;
}

/* ========== 6. 页脚 ========== */
.page-footer {
  width: 1440px;
  background: #FFFFFF;
  border-top: 1px solid #EEEEEE;
  margin-top: 80px;
}

.footer-container {
  width: 1200px;
  margin: 0 auto;
  padding: 80px 0;
  display: flex;
  gap: 77px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-logo {
  display: block;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #020952;
}

.qr-code {
  width: 128px;
  height: 128px;
  background: #D9D9D9;
  border-radius: 20px;
}

.footer-right {
  flex: 1;
  display: flex;
  gap: 77px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.column-title {
  font-size: 20px;
  font-weight: 600;
  color: #0F0F0F;
  margin: 0;
}

.column-link {
  font-size: 14px;
  font-weight: 400;
  color: #515151;
  text-decoration: none;
  transition: color 0.2s ease;
}

.column-link:hover {
  color: #0073FF;
}
</style>
