<template>
  <div class="home">
    <!-- Section 1: Hero 英雄区 -->
    <section class="hero-section">
      <div class="hero-bg">
        <video class="bg-video" autoplay muted loop playsinline>
          <source src="/media/720P.mp4" type="video/mp4">
        </video>
        <div class="bg-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">智起光学 创见未来</h1>
        <p class="hero-desc">基于光学大模型与智能体技术，光之宇正在推动光学研发、测试与运维从人工经验驱动迈向智能化时代</p>
        <a href="/getting-started" class="hero-btn">开始使用</a>
      </div>
    </section>

    <!-- Section 2: 平台能力架构图 -->
    <section class="platform-section">
      <div class="platform-header">
        <h2>让复杂光学系统实现智能化</h2>
        <p>以光学垂域大模型为核心，融合专业知识、智能体与工程数据，赋能光学设计、仪器测试、器件标定与网络运维，推动光学产业从经验驱动迈向智能驱动。</p>
      </div>

      <div class="platform-diagram">
        <!-- 研发层 -->
        <div class="layer rd-layer">
          <div class="layer-outer">
            <div class="layer-inner">
              <div class="layer-label">R&D 研发</div>
              <div class="layer-nodes">
                <div class="node">
                  <span class="node-dot"></span>
                  <span class="node-text">光学设计</span>
                </div>
                <div class="node">
                  <span class="node-dot"></span>
                  <span class="node-text">器件仿真</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 连接线 -->
        <div class="connection-line connection-up"></div>
        <div class="connection-line connection-down"></div>

        <!-- 平台层 -->
        <div class="layer platform-layer">
          <div class="layer-outer platform-outer">
            <div class="layer-inner platform-inner">
              <div class="platform-title">智能光学平台</div>
              <div class="platform-sub">
                <div class="platform-sub-item">
                  <div class="platform-sub-label">OpticsGPT 大模型</div>
                  <div class="platform-capability">专业垂域大模型能力</div>
                </div>
                <div class="platform-divider"></div>
                <div class="platform-sub-item">
                  <div class="platform-sub-label">光学智能体</div>
                  <div class="platform-capability">智能体协作能力</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 连接线 -->
        <div class="connection-line connection-up"></div>
        <div class="connection-line connection-down"></div>

        <!-- 产线层 -->
        <div class="layer production-layer">
          <div class="layer-outer">
            <div class="layer-inner">
              <div class="layer-label">产线 测试与运维</div>
              <div class="layer-nodes production-nodes">
                <div class="node">
                  <span class="node-dot"></span>
                  <span class="node-text">光谱标定</span>
                </div>
                <div class="node">
                  <span class="node-dot"></span>
                  <span class="node-text">波前测试</span>
                </div>
                <div class="node">
                  <span class="node-dot"></span>
                  <span class="node-text">链路仿真</span>
                </div>
                <div class="node">
                  <span class="node-dot"></span>
                  <span class="node-text">网络运维</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: OpticsGPT 产品介绍 -->
    <section class="opticsgpt-section">
      <div class="opticsgpt-content">
        <!-- 左栏 -->
        <div class="opticsgpt-left">
          <div class="bar-chart">
            <div class="bar bar-blue"></div>
            <div class="bar bar-gray"></div>
            <div class="bar bar-gray"></div>
          </div>
          <div class="opticsgpt-text">
            <h2 class="opticsgpt-title">OpticsGPT</h2>
            <p class="opticsgpt-desc">面向光学产业的垂域大模型，为科研、研发与工程应用提供专业智能能力</p>
            <a href="/products/opticsgpt" class="opticsgpt-btn">开始使用</a>
          </div>
        </div>
        <!-- 右栏 -->
        <div class="opticsgpt-right">
          <div class="opticsgpt-image" :style="{ backgroundImage: `url(${images.opticsgpt})` }"></div>
        </div>
      </div>
    </section>

    <!-- Section 4: 最新研究 -->
    <section class="research-section">
      <div class="section-header-row">
        <div class="section-header-left">
          <h2>最新研究</h2>
          <p>前言技术解读·学术研究·工程实践</p>
        </div>
        <a href="/news" class="btn-medium">开始使用</a>
      </div>
      <div class="news-cards">
        <div class="news-card">
          <div class="card-image" :style="{ backgroundImage: `url(${images.research01})` }"></div>
          <div class="card-body">
            <div class="card-meta">
              <span class="card-tag">文章</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="card-title">全自研国产！交大发布这一AI大模型</h3>
            <p class="card-excerpt">1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...</p>
          </div>
          <a href="#" class="card-btn">申请演示</a>
        </div>
        <div class="news-card">
          <div class="card-image" :style="{ backgroundImage: `url(${images.research02})` }"></div>
          <div class="card-body">
            <div class="card-meta">
              <span class="card-tag">文章</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="card-title">全自研国产！交大发布这一AI大模型</h3>
            <p class="card-excerpt">1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...</p>
          </div>
          <a href="#" class="card-btn">申请演示</a>
        </div>
        <div class="news-card">
          <div class="card-image" :style="{ backgroundImage: `url(${images.research03})` }"></div>
          <div class="card-body">
            <div class="card-meta">
              <span class="card-tag">文章</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="card-title">全自研国产！交大发布这一AI大模型</h3>
            <p class="card-excerpt">1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...</p>
          </div>
          <a href="#" class="card-btn">申请演示</a>
        </div>
      </div>
    </section>

    <!-- Section 5: 新闻动态 -->
    <section class="news-section">
      <div class="section-header-row">
        <div class="section-header-left">
          <h2>新闻动态</h2>
          <p>了解 LightInfra 的公司动态和产品发布</p>
        </div>
        <a href="/news" class="btn-medium">开始使用</a>
      </div>
      <div class="news-layout">
        <div class="news-featured">
          <div class="news-featured-image" :style="{ backgroundImage: `url(${images.news})` }"></div>
          <div class="news-featured-body">
            <div class="card-meta">
              <span class="card-tag">会议</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="news-featured-title">上海交大义理林教授团队发布智能光传输开源仿真平台</h3>
            <p class="news-featured-excerpt">2023年1月6日，由中国通信学会光通信委员会、鹏城实验室、区域光纤通信网与新型光通信系统国家重点实验室联合主办的智能光传输专...</p>
          </div>
        </div>
        <div class="news-list">
          <div class="news-item">
            <div class="card-meta">
              <span class="card-tag">会议</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="news-item-title">上海交大义理林教授团队发布智能光传输开源仿真平台</h3>
            <p class="news-item-excerpt">由鹏城实验室与区域光纤通信网联合发布...</p>
          </div>
          <div class="news-item">
            <div class="card-meta">
              <span class="card-tag">会议</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="news-item-title">上海交大义理林教授团队发布智能光传输开源仿真平台</h3>
            <p class="news-item-excerpt">由鹏城实验室与区域光纤通信网联合发布...</p>
          </div>
          <div class="news-item">
            <div class="card-meta">
              <span class="card-tag">会议</span>
              <span class="card-date">2026-01-01</span>
            </div>
            <h3 class="news-item-title">上海交大义理林教授团队发布智能光传输开源仿真平台</h3>
            <p class="news-item-excerpt">由鹏城实验室与区域光纤通信网联合发布...</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 6: CTA 底部行动号召 -->
    <section class="cta-section">
      <h2 class="cta-title">AI For Optics，立即试用</h2>
      <a href="/join" class="btn-large">加入我们</a>
    </section>
  </div>
</template>

<script setup>
// 首页图片路径（public 目录下的静态资源）
const images = {
  opticsgpt: '/media/ProductPage-OpticsGPT-hero.png',
  ifts: '/media/HomePage-IFTS.png',
  instrument: '/media/HomePage-智能仪器仪表.png',
  news: '/media/HomePage-news.png',
  research01: '/media/HomePage- research01.png',
  research02: '/media/HomePage- research02.png',
  research03: '/media/HomePage- research03.png'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #121212;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ========== Section 1: Hero ========== */
.hero-section {
  position: relative;
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(61, 61, 61, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 96px;
  font-weight: 500;
  line-height: 113px;
  color: #FFFFFF;
  margin: 0 0 20px 0;
}

.hero-desc {
  width: 637px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #FFFFFF;
  margin: 0 0 40px 0;
}

.hero-btn {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 48px;
  border: 1px solid #FFFFFF;
  border-radius: 73px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  background: #FFFFFF;
  color: #121212;
}

/* ========== Section 2: 平台能力架构图 ========== */
.platform-section {
  width: 1100px;
  padding: 120px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.platform-header {
  text-align: center;
  margin-bottom: 60px;
}

.platform-header h2 {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0 0 24px 0;
}

.platform-header p {
  width: 834px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.platform-diagram {
  position: relative;
  width: 1100px;
}

.layer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layer-outer {
  border: 1.5px solid rgba(255, 255, 255, 0.52);
}

.layer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.layer-label {
  position: absolute;
  top: -14px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #0073FF;
  background: #121212;
  padding: 0 12px;
}

.layer-nodes {
  display: flex;
  gap: 40px;
  padding: 30px 0;
}

.layer-nodes.production-nodes {
  gap: 30px;
}

.node {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}

.node-dot {
  width: 7px;
  height: 7px;
  background: #0073FF;
  border-radius: 50%;
}

.rd-layer .layer-outer {
  width: 840px;
  height: 142px;
}

.rd-layer .layer-inner {
  width: 740px;
  height: 142px;
  border: 1px dashed rgba(255, 255, 255, 0.68);
}

.connection-line {
  width: 2px;
  height: 74px;
  margin: 0 auto;
}

.connection-up {
  background: linear-gradient(0deg, rgba(0, 115, 255, 0.6) 0%, rgba(0, 115, 255, 0) 100%);
}

.connection-down {
  background: linear-gradient(180deg, rgba(0, 115, 255, 0.6) 0%, rgba(0, 115, 255, 0) 100%);
}

.platform-layer {
  margin: 0;
}

.platform-outer {
  width: 1100px;
  height: 270px;
  background: rgba(0, 115, 255, 0.14);
  border: 2px solid rgba(0, 115, 255, 0.95);
  box-shadow: 0 0 60px rgba(0, 115, 255, 0.3);
}

.platform-inner {
  width: 970px;
  height: 192px;
  background: #121212;
  border: 1.5px solid rgba(0, 115, 255, 0.85);
  margin-top: 34px;
}

.platform-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #FFFFFF;
  margin-top: 30px;
}

.platform-sub {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.platform-sub-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}

.platform-sub-label {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #FFFFFF;
}

.platform-capability {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #AFAFAF;
  margin-top: 8px;
}

.platform-divider {
  width: 1px;
  height: 50px;
  background: rgba(0, 115, 255, 0.55);
}

.production-layer .layer-outer {
  width: 880px;
  height: 146px;
}

.production-layer .layer-inner {
  width: 780px;
  height: 102px;
  border: 1px dashed rgba(255, 255, 255, 0.26);
}

/* ========== Section 3: OpticsGPT 产品介绍 ========== */
.opticsgpt-section {
  width: 1200px;
  padding: 80px 0;
}

.opticsgpt-content {
  display: flex;
  gap: 55px;
  align-items: center;
}

.opticsgpt-left {
  width: 511px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 14px;
  height: 174px;
  flex-shrink: 0;
}

.bar {
  width: 14px;
  border-radius: 7px;
  flex-shrink: 0;
}

.bar-blue {
  height: 88px;
  background: #0073FF;
}

.bar-gray {
  height: 31px;
  background: #D9D9D9;
}

.opticsgpt-text {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.opticsgpt-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

.opticsgpt-desc {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.opticsgpt-btn {
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
  align-self: flex-start;
}

.opticsgpt-btn:hover {
  background: #FFFFFF;
  color: #121212;
}

.opticsgpt-right {
  width: 648px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.opticsgpt-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
  border-radius: 20px;
}

/* ========== Section 4: 最新研究 ========== */
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
  justify-content: center;
}

.news-card {
  width: 384px;
  height: 432px;
  border: 1px solid #323232;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 115, 255, 0.5);
}

.card-image {
  width: 384px;
  height: 216px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
}

.card-body {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-tag {
  background: #303030;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  color: #FFFFFF;
}

.card-date {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  color: #FFFFFF;
}

.card-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  width: fit-content;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  margin: auto 20px 20px;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.card-btn:hover {
  background: #FFFFFF;
  color: #121212;
}

/* ========== Section 5: 新闻动态 ========== */
.news-section {
  width: 1200px;
  padding: 80px 0;
}

.news-layout {
  display: flex;
  gap: 32px;
}

.news-featured {
  width: 756px;
  height: 424px;
  border: 1px solid #323232;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.news-featured:hover {
  border-color: rgba(0, 115, 255, 0.5);
}

.news-featured-image {
  width: 756px;
  height: 424px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
}

.news-featured-body {
  padding: 20px;
}

.news-featured-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 10px 0;
}

.news-featured-excerpt {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  flex: 1;
  padding: 20px;
  border: 1px solid #323232;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.news-item:hover {
  border-color: rgba(0, 115, 255, 0.5);
}

.news-item-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  color: #FFFFFF;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-item-excerpt {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========== Section 6: CTA ========== */
.cta-section {
  width: 681px;
  padding: 120px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.cta-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

/* ========== 全局按钮样式 ========== */
.btn-large {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 0 48px;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s ease;
}

.btn-large:hover {
  background: #FFFFFF;
  color: #121212;
}

.btn-medium {
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  background: transparent;
  transition: all 0.3s ease;
}

.btn-medium:hover {
  background: #FFFFFF;
  color: #121212;
}

/* ========== 响应式 ========== */
@media (max-width: 1600px) {
  .home {
    width: 100%;
  }
}

@media (max-width: 1200px) {
  .hero-title {
    font-size: 64px;
    line-height: 80px;
  }

  .hero-desc {
    width: 100%;
    padding: 0 20px;
    font-size: 18px;
  }

  .opticsgpt-section,
  .research-section,
  .news-section {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .opticsgpt-content {
    flex-direction: column;
    width: 100%;
  }

  .opticsgpt-left {
    width: 100%;
  }

  .opticsgpt-right {
    width: 100%;
    max-width: 648px;
  }

  .news-cards {
    flex-direction: column;
    align-items: center;
  }

  .news-card {
    width: 100%;
    max-width: 500px;
  }

  .news-layout {
    flex-direction: column;
  }

  .news-featured {
    width: 100%;
  }

  .news-featured-image {
    width: 100%;
  }

  .cta-section {
    width: 100%;
  }

  .platform-section,
  .platform-diagram {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .rd-layer .layer-outer,
  .rd-layer .layer-inner,
  .platform-outer,
  .platform-inner,
  .production-layer .layer-outer,
  .production-layer .layer-inner {
    width: 100%;
    max-width: 1100px;
  }

  .rd-layer .layer-inner {
    max-width: 740px;
  }

  .production-layer .layer-inner {
    max-width: 780px;
  }

  .platform-inner {
    max-width: 970px;
  }
}
</style>
