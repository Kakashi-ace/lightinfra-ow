<template>
  <div class="about-view">
    <HeroSection />
    <main class="main-content">
      <AboutSection :about-paragraphs="pageData.aboutParagraphs" />
      <ValuesSection :values="pageData.values" />
      <TimelineSection />
      <TeamSection :team="pageData.team" />
      <CtaSection />
    </main>
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ValuesSection from './components/ValuesSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import TeamSection from './components/TeamSection.vue'
import CtaSection from './components/CtaSection.vue'

defineProps({
  pageData: {
    type: Object,
    default: () => ({
      aboutParagraphs: [
        'LightInfra 是一家专注于 AI 与光学深度融合的科技企业，致力于构建面向光学产业的新一代智能技术与产品体系。',
        '公司自主研发光学垂直领域智能模型，围绕专业知识理解、光学推理、仿真求解、实验联动和智能生成等关键能力进行系统建设。基于垂直模型、AI Agent与行业数据的协同，LightInfra 将人工智能能力连接至光学专业软件、实验仪器、测试设备和生产环境，为光通信、精密光学与智能感知等领域提供智能仿真、研发辅助、测试标定、设备控制和网络运维解决方案。',
        'LightInfra 重点服务光学器件、光模块及相关系统的研发、测试与运维环节，帮助企业缩短研发周期、沉淀专业经验、优化测试流程，并提升复杂系统的分析与决策能力。公司通过软件平台、智能模型及软硬件协同方案，推动光学产业由依赖人工经验和分散工具的传统工作方式，向数据驱动、人机协同和智能决策转变。',
        '公司崇尚极客、务实、扁平的文化，重视工程落地与产品体验。我们相信，优秀的行业AI产品来自先进的模型能力、可靠自然的人机交互，以及对专业场景的深入理解。',
        'LightInfra 由上海交通大学核心团队孵化成立，团队汇聚光学、光通信、人工智能与系统工程等领域的产学研经验。面向高端制造与光电子信息产业，公司将持续推动AI技术与光学产业深度融合，建设更加智能、高效、可靠的光学技术基础设施。'
      ],
      values: [
        { title: '创新驱动', desc: '持续探索 AI 与光学融合的无限可能' },
        { title: '务实落地', desc: '专注工程实现与产品体验的深度打磨' },
        { title: '开放协作', desc: '与产业伙伴共建智能光学生态' }
      ],
      team: [
        { name: '张教授', role: '创始人 & CEO' },
        { name: '李博士', role: 'CTO' },
        { name: '王教授', role: '首席科学家' },
        { name: '陈总', role: '运营负责人' },
        { name: '刘总', role: '商务负责人' }
      ]
    })
  }
})
</script>

<style scoped>
.about-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

.main-content {
  width: 100%;
}
</style>
