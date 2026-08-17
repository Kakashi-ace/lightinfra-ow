<template>
  <div class="about-page">
    <!-- 2. Hero 区 -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-decoration">
          <div class="deco-circle deco-circle-1"></div>
          <div class="deco-circle deco-circle-2"></div>
          <div class="deco-circle deco-circle-3"></div>
        </div>
      </div>
    </section>

    <!-- 3. 主内容区域 -->
    <main class="main-content">

      <!-- 3.1 关于 LightInfra -->
      <section class="about-section">
        <div class="section-container">
          <h2 class="section-title">{{ pageData.aboutTitle }}</h2>
          <p class="section-subtitle">{{ pageData.subtitle }}</p>
          <div class="about-text">
            <p v-for="(para, index) in pageData.aboutParagraphs" :key="index" class="text-paragraph">
              {{ para }}
            </p>
          </div>
          <div class="about-image-placeholder">
            <svg width="100%" height="100%" viewBox="0 0 1200 542" fill="none">
              <rect width="1200" height="542" fill="#D9D9D9" />
              <rect x="500" y="221" width="200" height="100" rx="20" fill="#AFAFAF" />
            </svg>
          </div>
        </div>
      </section>

      <!-- 3.2 企业价值观 -->
      <section class="values-section">
        <div class="section-container">
          <h2 class="section-title">{{ pageData.valuesTitle }}</h2>
          <p class="section-subtitle">{{ pageData.subtitle }}</p>
          <div class="values-grid">
            <div
              v-for="(value, index) in pageData.values"
              :key="index"
              class="value-card"
            >
              <div class="value-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="35" fill="rgba(0,115,255,0.2)" />
                  <circle cx="40" cy="40" r="20" fill="#0073FF" />
                </svg>
              </div>
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-desc">{{ value.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3.3 发展历程 -->
      <section class="timeline-section">
        <div class="section-container">
          <h2 class="section-title">{{ pageData.timelineTitle }}</h2>
          <p class="section-subtitle">{{ pageData.subtitle }}</p>
          <div class="timeline-placeholder">
            <svg width="995" height="714" viewBox="0 0 995 714" fill="none">
              <rect width="995" height="714" fill="#D9D9D9" />
              <circle cx="497" cy="357" r="150" fill="#AFAFAF" opacity="0.5" />
              <circle cx="497" cy="357" r="80" fill="#AFAFAF" opacity="0.7" />
            </svg>
          </div>
        </div>
      </section>

      <!-- 3.4 核心团队 -->
      <section class="team-section">
        <div class="section-container">
          <h2 class="section-title">{{ pageData.teamTitle }}</h2>
          <p class="section-subtitle">{{ pageData.subtitle }}</p>
          <div class="team-scroll">
            <div class="team-grid">
              <div
                v-for="(member, index) in pageData.team"
                :key="index"
                class="team-card"
              >
                <div class="team-avatar">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                    <circle cx="80" cy="80" r="80" fill="rgba(0,115,255,0.3)" />
                    <circle cx="80" cy="60" r="30" fill="rgba(0,115,255,0.5)" />
                    <ellipse cx="80" cy="140" rx="50" ry="40" fill="rgba(0,115,255,0.5)" />
                  </svg>
                </div>
                <h3 class="team-name">{{ member.name }}</h3>
                <p class="team-role">{{ member.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. CTA 区 -->
      <section class="cta-section">
        <div class="section-container">
          <h2 class="cta-title">{{ pageData.ctaTitle }}</h2>
          <a href="/join" class="cta-btn">加入我们</a>
        </div>
      </section>

    </main>

    <!-- 5. 页脚 -->
    <footer class="page-footer">
      <div class="footer-container">
        <div class="footer-left">
          <svg class="footer-logo" width="205" height="68" viewBox="0 0 112 37" fill="none">
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
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>商务合作请联系：business@infra.com</span>
            </div>
            <div class="contact-item">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0073FF" stroke-width="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6L12 13L2 6"/>
              </svg>
              <span>招聘咨询请联系：hr@infra.com</span>
            </div>
          </div>
          <div class="qr-code"></div>
        </div>
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
defineProps({
  pageData: {
    type: Object,
    default: () => ({
      aboutTitle: '关于LightInfra',
      subtitle: '智起光学 创见未来',
      aboutParagraphs: [
        'LightInfra 是一家专注于 AI 与光学深度融合的科技企业，致力于构建面向光学产业的新一代智能技术与产品体系。',
        '公司自主研发光学垂直领域智能模型，围绕专业知识理解、光学推理、仿真求解、实验联动和智能生成等关键能力进行系统建设。基于垂直模型、AI Agent与行业数据的协同，LightInfra 将人工智能能力连接至光学专业软件、实验仪器、测试设备和生产环境，为光通信、精密光学与智能感知等领域提供智能仿真、研发辅助、测试标定、设备控制和网络运维解决方案。',
        'LightInfra 重点服务光学器件、光模块及相关系统的研发、测试与运维环节，帮助企业缩短研发周期、沉淀专业经验、优化测试流程，并提升复杂系统的分析与决策能力。公司通过软件平台、智能模型及软硬件协同方案，推动光学产业由依赖人工经验和分散工具的传统工作方式，向数据驱动、人机协同和智能决策转变。',
        '公司崇尚极客、务实、扁平的文化，重视工程落地与产品体验。我们相信，优秀的行业AI产品来自先进的模型能力、可靠自然的人机交互，以及对专业场景的深入理解。',
        'LightInfra 由上海交通大学核心团队孵化成立，团队汇聚光学、光通信、人工智能与系统工程等领域的产学研经验。面向高端制造与光电子信息产业，公司将持续推动AI技术与光学产业深度融合，建设更加智能、高效、可靠的光学技术基础设施。'
      ],
      valuesTitle: '企业价值观',
      values: [
        { title: '创新驱动', desc: '持续探索 AI 与光学融合的无限可能' },
        { title: '务实落地', desc: '专注工程实现与产品体验的深度打磨' },
        { title: '开放协作', desc: '与产业伙伴共建智能光学生态' }
      ],
      timelineTitle: '发展历程',
      teamTitle: '核心团队',
      team: [
        { name: '张教授', role: '创始人 & CEO' },
        { name: '李博士', role: 'CTO' },
        { name: '王教授', role: '首席科学家' },
        { name: '陈总', role: '运营负责人' },
        { name: '刘总', role: '商务负责人' }
      ],
      ctaTitle: '一起塑造智能光学的未来'
    })
  }
})
</script>

<style scoped>
.about-page {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== 2. Hero 区 ========== */
.hero-section {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
}

.deco-circle-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
}

.deco-circle-2 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: 100px;
}

.deco-circle-3 {
  width: 200px;
  height: 200px;
  top: 0;
  right: 200px;
}

/* ========== 3. 主内容区域 ========== */
.main-content {
  width: 100%;
}

.section-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  color: #121212;
  margin: 0 0 16px 0;
}

.section-subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #555555;
  margin: 0 0 60px 0;
}

/* ========== 3.1 关于 LightInfra ========== */
.about-section {
  padding: 100px 0 240px 0;
}

.about-text {
  margin-bottom: 60px;
}

.text-paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #535C6E;
  margin: 0 0 16px 0;
}

.text-paragraph:last-child {
  margin-bottom: 0;
}

.about-image-placeholder {
  width: 1200px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
}

/* ========== 3.2 企业价值观 ========== */
.values-section {
  padding: 120px 0;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 41px;
}

.value-card {
  width: 384px;
  height: 387px;
  background: linear-gradient(180deg, rgba(164,205,255,0.59) 0%, rgba(0,115,255,0.59) 100%);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  transition: all 0.2s ease;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 115, 255, 0.2);
}

.value-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
  text-align: center;
}

.value-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;
}

/* ========== 3.3 发展历程 ========== */
.timeline-section {
  padding: 120px 0;
}

.timeline-placeholder {
  width: 995px;
  height: 714px;
  margin-left: 205px;
}

/* ========== 3.4 核心团队 ========== */
.team-section {
  padding: 120px 0;
}

.team-scroll {
  width: 100%;
  overflow-x: auto;
  margin: 0 -20px;
  padding: 0 20px;
}

.team-scroll::-webkit-scrollbar {
  height: 0;
}

.team-grid {
  display: flex;
  gap: 41px;
  width: max-content;
}

.team-card {
  width: 384px;
  height: 387px;
  background: linear-gradient(180deg, rgba(164,205,255,0.59) 0%, rgba(0,115,255,0.59) 100%);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: all 0.2s ease;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 115, 255, 0.2);
}

.team-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
}

.team-name {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #FFFFFF;
  margin: 0;
  text-align: center;
}

.team-role {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;
}

/* ========== 4. CTA 区 ========== */
.cta-section {
  padding: 120px 0;
}

.cta-title {
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: #121212;
  text-align: center;
  margin: 0 0 60px 0;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #121212;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #121212;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

/* ========== 5. 页脚 ========== */
.page-footer {
  width: 100%;
  background: #FFFFFF;
  border-top: 1px solid #E5E5E5;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
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
