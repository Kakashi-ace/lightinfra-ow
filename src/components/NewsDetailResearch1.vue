<template>
  <div class="news-detail-research">
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
      <!-- 科研速递 -->
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

      <!-- 研究背景 -->
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

      <!-- 研究路径 -->
      <section class="content-section">
        <h2 class="section-title">{{ articleData.sections.approach.title }}</h2>
        <div class="section-body">
          <p
            v-for="(para, index) in articleData.sections.approach.paragraphs"
            :key="'ap-' + index"
            class="paragraph"
          >
            {{ para }}
          </p>
        </div>
      </section>

      <!-- 图片1 -->
      <figure class="figure figure-1">
        <div class="figure-image-placeholder" style="width: 400px; height: 546px;">
          <svg width="100%" height="100%" viewBox="0 0 400 546" fill="none">
            <rect width="400" height="546" fill="#D9D9D9" />
          </svg>
        </div>
        <figcaption class="figure-caption">{{ articleData.images[0].caption }}</figcaption>
      </figure>

      <!-- 图片2 -->
      <figure class="figure figure-2">
        <div class="figure-image-placeholder" style="width: 800px; height: 300px;">
          <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none">
            <rect width="800" height="300" fill="#D9D9D9" />
          </svg>
        </div>
        <figcaption class="figure-caption">{{ articleData.images[1].caption }}</figcaption>
      </figure>

      <!-- 图片3 -->
      <figure class="figure figure-3">
        <div class="figure-image-placeholder" style="width: 400px; height: 331px;">
          <svg width="100%" height="100%" viewBox="0 0 400 331" fill="none">
            <rect width="400" height="331" fill="#D9D9D9" />
          </svg>
        </div>
        <figcaption class="figure-caption">{{ articleData.images[2].caption }}</figcaption>
      </figure>

      <!-- 研究成果 -->
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
      </section>

      <!-- 论文 DOI -->
      <div class="doi-info">
        <span class="doi-label">论文全文：</span>
        <a
          :href="'https://doi.org/' + articleData.doi"
          class="doi-link"
          @click.prevent="handleCopyDoi"
        >
          DOI {{ articleData.doi }}
        </a>
      </div>

      <!-- 信息框 -->
      <div class="info-box">
        <p class="info-box-text">{{ articleData.acknowledgment }}</p>
      </div>
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
      title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿',
      date: '2026-08-04',
      doi: '10.1364/OL.555981',
      images: [
        { caption: '图1　指数剪枝可学习数字反向传播方法原理' },
        { caption: '图2　21通道长距离WDM光纤传输实验系统' },
        { caption: '图3　EP-LDBP的非线性补偿性能与计算复杂度' }
      ],
      sections: {
        scienceUpdate: {
          title: '科研速递',
          paragraphs: [
            '上海交通大学电子信息与电气工程学院义理林教授课题组（LIFE，Laboratory of Intelligent Fiber Ecosystem）提出了一种低复杂度指数剪枝可学习数字反向传播方法，通过按照光纤色散记忆在逐层补偿过程中的变化规律，对可学习数字反向传播网络进行结构化剪枝，在保持非线性补偿性能的同时，将算法计算复杂度降低61.5%。',
            '相关成果以"Low complexity exponential pruning learned digital back-propagation method for fiber nonlinearity mitigation"为题，于2025年3月发表于国际光学期刊《Optics Letters》。博士生李律为第一作者，义理林教授为通讯作者。'
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
            '针对上述问题，LIFE课题组提出了指数剪枝可学习数字反向传播方法（Exponential-Pruning LDBP，EP-LDBP）。该方法从DBP逐层补偿色散的物理过程出发：在进入第一层补偿时，信号经历了完整链路的色散累积，需要较长的处理窗口；随着色散被逐层抵消，后续补偿层所需描述的残余色散记忆逐渐缩短，因此不再需要保持与前层相同的处理长度。',
            '基于这一规律，课题组构建了指数衰减剪枝模型，通过最大抽头长度和指数衰减系数两个可调参数，非均匀地设置不同LDBP层的处理窗口。前部补偿层保留较长窗口，以充分描述长距离传输产生的色散记忆；后部补偿层则逐步缩短窗口，优先删除对中心符号影响较弱的边缘信息，从而减少冗余重叠符号和频域计算。',
            '与随机掩码剪枝不同，EP-LDBP形成了随网络深度逐渐收缩的结构化补偿网络。这种剪枝方式既保留了DBP明确的物理结构，也能够通过数据训练优化内部参数，在降低复杂度的同时维持稳定的非线性补偿能力。'
          ]
        },
        results: {
          title: '研究成果',
          paragraphs: [
            '实验结果表明，在1600 km、60 GBaud传输条件下，单纯色散补偿后的Q因子为5.57 dB。通过对指数剪枝参数进行优化，EP-LDBP获得6.18 dB的Q因子，相比线性补偿提升0.61 dB，并保持了与常规频域LDBP基本一致的补偿性能。与此同时，EP-LDBP的计算复杂度仅为常规频域LDBP的38.5%，相当于减少61.5%的实数乘法运算。',
            '进一步对比发现，在相同计算复杂度下，EP-LDBP的补偿性能优于基于随机掩码的剪枝LDBP。这是因为指数剪枝利用了色散记忆随补偿层数增加而逐渐缩短的规律，可以优先削减后续网络层中的冗余信息，避免随机剪枝误删具有较大补偿作用的抽头。',
            '课题组还在不同传输距离和不同信号波特率下对方法进行了测试。在400～1600 km传输范围内，EP-LDBP均能够取得与常规LDBP相近的Q因子；其复杂度占频域LDBP的比例由400 km时的44.8%进一步降低至1600 km时的38.5%。在30～60 GBaud范围内，该比例也由46.5%下降至约38.6%。这说明随着传输距离延长和波特率提高，系统色散记忆不断增大，指数剪枝所能消除的冗余运算更加明显。',
            'EP-LDBP将光纤传输物理特征、可学习参数优化和结构化网络剪枝相结合，为解决可学习数字反向传播的性能与复杂度折衷问题提供了新的思路。该方法在长距离、高波特率系统中的复杂度优势更加突出，有望推动物理模型驱动人工智能算法在高速相干光接收机中的实际应用。'
          ]
        }
      },
      acknowledgment: 'LIFE课题组长期致力于智能光纤通信系统、可学习数字信号处理和低复杂度光纤非线性补偿研究。该项工作得到国家重点研发计划、国家自然科学基金及上海交通大学"2030计划"等项目支持。'
    })
  }
})

const emit = defineEmits(['copyDoi', 'viewImage'])

const handleCopyDoi = () => {
  emit('copyDoi', props.articleData.doi)
}
</script>

<style scoped>
.news-detail-research {
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
  padding-top: 80px;
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

/* ========== 3. 正文内容区 ========== */
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
  color: rgba(0,0,0,0.9);
  margin: 0;
  text-align: justify;
}

/* 图片 */
.figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  gap: 16px;
}

.figure-1 {
  margin-top: 60px;
  margin-bottom: 80px;
}

.figure-2 {
  margin-top: 60px;
  margin-bottom: 80px;
}

.figure-3 {
  margin-top: 60px;
  margin-bottom: 80px;
}

.figure-image-placeholder {
  border-radius: 8px;
  overflow: hidden;
}

.figure-caption {
  font-size: 14px;
  color: rgba(0,0,0,0.6);
  text-align: center;
  margin: 0;
}

/* DOI 信息 */
.doi-info {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 60px 0 40px 0;
}

.doi-link {
  color: #0073FF;
  text-decoration: none;
  transition: color 0.2s ease;
}

.doi-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* 信息框 */
.info-box {
  width: 1200px;
  height: 132px;
  background: rgba(164,205,255,0.22);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 80px;
  box-sizing: border-box;
}

.info-box-text {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

/* ========== 4. 页脚 ========== */
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
