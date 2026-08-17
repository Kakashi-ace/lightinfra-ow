<template>
  <div class="news-detail-research2">
    <!-- 2. Hero 标题区 -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-header">
          <span class="hero-tag">{{ articleData.tag }}</span>
          <h1 class="hero-title">{{ articleData.title }}</h1>
        </div>
        <p class="hero-date">{{ articleData.date }}</p>
      </div>
    </div>

    <!-- 3. 正文内容区 -->
    <main class="main-content">
      <!-- 3.1 科研速递 -->
      <section class="content-section">
        <h2 class="section-title">{{ articleData.sections.scienceUpdate.title }}</h2>
        <div class="section-body">
          <p
            v-for="(para, index) in articleData.sections.scienceUpdate.paragraphs"
            :key="'su-' + index"
            class="paragraph"
          >
            {{ para }}
          </p>
        </div>
      </section>

      <!-- 3.2 研究背景 -->
      <section class="content-section">
        <h2 class="section-title">{{ articleData.sections.background.title }}</h2>
        <div class="section-body">
          <p
            v-for="(para, index) in articleData.sections.background.paragraphs"
            :key="'bg-' + index"
            class="paragraph"
          >
            {{ para }}
          </p>
        </div>
      </section>

      <!-- 3.3 研究路径 -->
      <section class="content-section">
        <h2 class="section-title">{{ articleData.sections.approach.title }}</h2>

        <!-- 大图 -->
        <figure class="figure-large">
          <div class="figure-image-placeholder" style="width: 1000px; height: 502px;">
            <svg width="100%" height="100%" viewBox="0 0 1000 502" fill="none">
              <rect width="1000" height="502" fill="#D9D9D9" />
            </svg>
          </div>
        </figure>

        <!-- 研究路径正文 -->
        <div class="section-body">
          <p
            v-for="(para, index) in articleData.sections.approach.paragraphs"
            :key="'ap-' + index"
            class="paragraph"
          >
            {{ para }}
          </p>
        </div>

        <!-- Agent Roles 子标题 -->
        <h3 class="sub-title">{{ articleData.sections.approach.agentRolesTitle }}</h3>

        <!-- 角色卡片 -->
        <div class="role-cards">
          <div
            v-for="role in articleData.sections.approach.agentRoles"
            :key="role.id"
            class="role-card"
            :style="{ backgroundColor: role.bgColor }"
          >
            <h4 class="role-card-title">{{ role.title }}</h4>
            <p class="role-card-desc">{{ role.description }}</p>
          </div>
        </div>

        <!-- Tool Library 子标题 -->
        <h3 class="sub-title">{{ articleData.sections.approach.toolLibraryTitle }}</h3>

        <!-- 工具库容器 -->
        <div class="tool-library">
          <div class="tool-library-header">
            <span class="tool-library-title">{{ articleData.sections.approach.toolLibraryTitle }}</span>
          </div>
          <div class="tool-cards-grid">
            <div
              v-for="tool in articleData.sections.approach.tools"
              :key="tool.id"
              class="tool-card"
            >
              <h5 class="tool-card-title">{{ tool.title }}</h5>
              <p class="tool-card-desc">{{ tool.description }}</p>
            </div>
          </div>
        </div>

        <!-- 研究路径后续段落 -->
        <div class="section-body">
          <p class="paragraph">{{ articleData.sections.approach.closingParagraph }}</p>
        </div>
      </section>

      <!-- 3.4 研究成果展望 -->
      <section class="content-section">
        <h2 class="section-title">{{ articleData.sections.results.title }}</h2>
        <div class="section-body">
          <p
            v-for="(para, index) in articleData.sections.results.paragraphs"
            :key="'rs-' + index"
            class="paragraph"
          >
            {{ para }}
          </p>
        </div>

        <!-- 信息提示框 -->
        <div class="notice-box">
          <p class="notice-text">{{ articleData.sections.results.notice }}</p>
        </div>
      </section>
    </main>

    <!-- 4. 页脚 -->
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
const props = defineProps({
  articleData: {
    type: Object,
    default: () => ({
      tag: '论文',
      title: 'Agent赋能光网络运维智能化',
      date: '2026-08-04',
      sections: {
        scienceUpdate: {
          title: '科研速递',
          paragraphs: [
            '上海交通大学电子信息与电气工程学院义理林教授课题组（LIFE，Laboratory of Intelligent Fiber Ecosystem）提出了一种基于Agent的光网络运维智能化方法，通过构建面向PON接入网的数字网络智能体，实现光网络运维管理的主动预警、智能诊断与辅助决策。',
            '相关成果以"Agent-Enabled Intelligent Optical Network Operation and Maintenance"为题，于2026年发表于光网络领域重要期刊。博士生李律为第一作者，义理林教授为通讯作者。'
          ]
        },
        background: {
          title: '研究背景',
          paragraphs: [
            '随着相干光通信系统不断向更高波特率、更大容量和更长传输距离发展，光纤克尔非线性逐渐成为限制系统传输性能的重要因素。数字反向传播（Digital Back-Propagation，DBP）通过在数字域中模拟光信号沿光纤链路的反向传播过程，可以同时补偿色散和非线性损伤，是光纤非线性补偿中具有代表性的物理模型驱动方法。',
            '然而，传统DBP通常需要将光纤链路划分为多个计算步长，并在每一步中反复进行傅里叶变换、色散补偿和非线性相位补偿。随着传输距离和信号波特率增加，色散引起的信号记忆长度不断扩大，算法需要处理更多相邻符号，其计算复杂度随之快速上升，给高速光通信系统的实时数字信号处理带来较大压力。',
            '近年来，可学习数字反向传播（Learned Digital Back-Propagation，LDBP）将DBP的分步传播过程展开为深度神经网络，并通过数据训练优化色散和非线性参数，有助于缓解理想模型参数与实际链路之间的失配问题。但现有LDBP通常在不同补偿层采用相同或相近的处理窗口，没有充分考虑色散记忆在逐层反向补偿过程中不断缩短的物理特性，导致后续网络层仍保留大量冗余抽头和重复运算。'
          ]
        },
        approach: {
          title: '研究路径',
          paragraphs: [
            '针对上述问题，LIFE课题组提出了基于Agent的光网络运维智能化方法。该方法通过构建多智能体系统，实现光网络运维的自动化与智能化。语义理解智能体负责解析用户指令和告警信息，执行智能体调用各种工具完成具体任务，监测智能体持续监控任务执行并在异常时触发重试。'
          ],
          agentRolesTitle: 'Agent Roles',
          agentRoles: [
            {
              id: 'role-1',
              title: '语义理解智能体',
              description: '解析用户指令、告警信息和运维需求，识别任务类型并将复杂任务拆分为可执行的子任务。',
              bgColor: '#EAF4FF'
            },
            {
              id: 'role-2',
              title: '执行智能体',
              description: '确定工具、调用顺序与参数，执行知识检索、状态建模、指标预测、故障预警与诊断，并汇总形成运维建议。',
              bgColor: '#FFF3EA'
            },
            {
              id: 'role-3',
              title: '监测智能体',
              description: '持续监测任务执行与工具输出；在失败、置信度不足或结果冲突时触发重试与补充分析，并更新策略库。',
              bgColor: '#FFF0F4'
            }
          ],
          toolLibraryTitle: 'Tool Library',
          tools: [
            { id: 'tool-1', title: 'RAG知识检索工具', description: '检索设备手册、告警规则、专家经验和历史工单。' },
            { id: 'tool-2', title: '数字孪生工具', description: '分层建模并同步实际网络状态，建立正常运行基准。' },
            { id: 'tool-3', title: '余量预测工具', description: '预测光功率、设备灵敏度与链路余量变化趋势。' },
            { id: 'tool-4', title: '故障预测工具', description: '预测潜在故障的发生时间与故障类型。' },
            { id: 'tool-5', title: '故障诊断工具', description: '分析故障原因、位置及影响范围。' },
            { id: 'tool-6', title: 'API生成与配置建议工具', description: '生成标准化接口请求或配置建议。' }
          ],
          closingParagraph: '与随机掩码剪枝不同，EP-LDBP形成了随网络深度逐渐收缩的结构化补偿网络。这种剪枝方式既保留了DBP明确的物理结构，也能够通过数据训练优化内部参数，在降低复杂度的同时维持稳定的非线性补偿能力。'
        },
        results: {
          title: '研究成果展望',
          paragraphs: [
            '实验结果表明，在1600 km、60 GBaud传输条件下，单纯色散补偿后的Q因子为5.57 dB。通过对指数剪枝参数进行优化，EP-LDBP获得6.18 dB的Q因子，相比线性补偿提升0.61 dB，并保持了与常规频域LDBP基本一致的补偿性能。与此同时，EP-LDBP的计算复杂度仅为常规频域LDBP的38.5%，相当于减少61.5%的实数乘法运算。',
            '进一步对比发现，在相同计算复杂度下，EP-LDBP的补偿性能优于基于随机掩码的剪枝LDBP。这是因为指数剪枝利用了色散记忆随补偿层数增加而逐渐缩短的规律，可以优先削减后续网络层中的冗余信息，避免随机剪枝误删具有较大补偿作用的抽头。',
            '课题组还在不同传输距离和不同信号波特率下对方法进行了测试。在400～1600 km传输范围内，EP-LDBP均能够取得与常规LDBP相近的Q因子；其复杂度占频域LDBP的比例由400 km时的44.8%进一步降低至1600 km时的38.5%。在30～60 GBaud范围内，该比例也由46.5%下降至约38.6%。这说明随着传输距离延长和波特率提高，系统色散记忆不断增大，指数剪枝所能消除的冗余运算更加明显。'
          ],
          notice: '光之宇智能科技有限公司长期开展智能光传输及光网络运维管理研究。本项目通过构建面向PON接入网的数字网络智能体，有望减少光网络人工监测与故障分析成本，推动公司光网络运维管理产品由告警展示向主动预警、智能诊断与辅助决策升级。'
        }
      }
    })
  }
})

const emit = defineEmits(['viewImage'])
</script>

<style scoped>
.news-detail-research2 {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

/* ========== Hero 标题区 ========== */
.hero-section {
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  display: flex;
  align-items: flex-end;
}

.hero-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background: #4754E1;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  height: 32px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.hero-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

.hero-date {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

/* ========== 正文内容区 ========== */
.main-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px;
}

.content-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #0073FF;
  margin: 0 0 24px 0;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #121212;
  margin: 0;
  text-align: justify;
}

/* 大图 */
.figure-large {
  display: flex;
  justify-content: center;
  margin: 24px 0 40px 0;
}

.figure-image-placeholder {
  border-radius: 8px;
  overflow: hidden;
}

/* 子标题 */
.sub-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #121212;
  margin: 40px 0 16px 0;
}

/* 角色卡片 */
.role-cards {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.role-card {
  width: 389px;
  height: 120px;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.role-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.role-card-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: #121212;
  margin: 0;
}

.role-card-desc {
  font-size: 14px;
  line-height: 22px;
  color: #535C6E;
  margin: 0;
}

/* 工具库 */
.tool-library {
  width: 1200px;
  background: #FFF7F2;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 40px;
}

.tool-library-header {
  margin-bottom: 12px;
}

.tool-library-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: #121212;
}

.tool-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.tool-card {
  width: 574px;
  height: 76px;
  background: #FFFFFF;
  border: 1px solid #E2E7EF;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tool-card:hover {
  border-color: #0073FF;
  box-shadow: 0 4px 12px rgba(0,115,255,0.1);
}

.tool-card-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: #0073FF;
  margin: 0;
}

.tool-card-desc {
  font-size: 13px;
  line-height: 20px;
  color: #535C6E;
  margin: 0;
}

/* 信息提示框 */
.notice-box {
  width: 1200px;
  background: #F0F7FF;
  border-radius: 4px;
  padding: 32px;
  margin-top: 24px;
}

.notice-text {
  font-size: 14px;
  line-height: 22px;
  color: #535C6E;
  margin: 0;
}

/* ========== 页脚 ========== */
.page-footer {
  width: 100%;
  background: #FFFFFF;
  border-top: 1px solid #E5E5E5;
}

.footer-container {
  width: 1200px;
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
  color: #121212;
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
