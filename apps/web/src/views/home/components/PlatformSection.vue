<template>
  <section class="platform-section">
    <div class="platform-header">
      <h2>{{ t('home.platformTitle') }}</h2>
      <p>{{ t('home.platformDesc') }}</p>
    </div>

    <div class="platform-diagram">
      <!-- 研发层 -->
      <div class="layer rd-layer">
        <div class="layer-outer">
          <div class="layer-inner">
            <div class="layer-label">{{ t('home.rdLabel') }}</div>
            <div class="layer-nodes">
              <div class="node">
                <span class="node-dot"></span>
                <span class="node-text">{{ t('home.rdOpticalDesign') }}</span>
              </div>
              <div class="node">
                <span class="node-dot"></span>
                <span class="node-text">{{ t('home.rdDeviceSim') }}</span>
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
            <div class="platform-title">{{ t('home.platformName') }}</div>
            <div class="platform-sub">
              <div class="platform-sub-item">
                <div class="platform-sub-label">{{ t('home.gptLabel') }}</div>
                <div class="platform-capability">{{ t('home.gptCap') }}</div>
              </div>
              <div class="platform-divider"></div>
              <div class="platform-sub-item">
                <div class="platform-sub-label">{{ t('home.agentLabel') }}</div>
                <div class="platform-capability">{{ t('home.agentCap') }}</div>
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
            <div class="layer-label">{{ t('home.prodLabel') }}</div>
            <div class="layer-nodes production-nodes">
              <div class="node">
                <span class="node-dot"></span>
                <span class="node-text">{{ t('home.prodSpectrumCal') }}</span>
              </div>
              <div class="node">
                <span class="node-dot"></span>
                <span class="node-text">{{ t('home.prodWavefrontTest') }}</span>
              </div>
              <div class="node">
                <span class="node-dot"></span>
                <span class="node-text">{{ t('home.prodLinkSim') }}</span>
              </div>
              <div class="node">
                <span class="node-dot"></span>
                <span class="node-text">{{ t('home.prodNetOpm') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
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

@media (max-width: 1200px) {
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
