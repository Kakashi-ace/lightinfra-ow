<template>
  <section ref="sectionRoot" class="platform-section" aria-labelledby="platform-heading">
    <div class="platform-stage">
      <div class="platform-header" data-animation="header">
        <h2 id="platform-heading">{{ t('home.platformTitle') }}</h2>
        <p>{{ t('home.platformDesc') }}</p>
      </div>

      <div class="platform-flow">
        <article class="flow-step" data-animation="step">
          <div class="step-index">01</div>
          <AiTrainingGraphic />
          <h3>{{ t('home.gptLabel') }}</h3>
          <p>{{ t('home.gptCap') }}</p>
        </article>

        <svg class="flow-connector" viewBox="0 0 118 28" aria-hidden="true">
          <path data-animation="connector" d="M4 14h103" />
          <path data-animation="connector-arrow" d="m98 5 12 9-12 9" />
        </svg>

        <article class="flow-step flow-step--featured" data-animation="step">
          <div class="step-index">02</div>
          <OpticalSimulationGraphic />
          <h3>{{ t('home.rdLabel') }}</h3>
          <p>{{ t('home.rdOpticalDesign') }} · {{ t('home.rdDeviceSim') }}</p>
        </article>

        <svg class="flow-connector" viewBox="0 0 118 28" aria-hidden="true">
          <path data-animation="connector" d="M4 14h103" />
          <path data-animation="connector-arrow" d="m98 5 12 9-12 9" />
        </svg>

        <article class="flow-step" data-animation="step">
          <div class="step-index">03</div>
          <ProductionLineGraphic />
          <h3>{{ t('home.prodLabel') }}</h3>
          <p>{{ t('home.prodSpectrumCal') }} · {{ t('home.prodWavefrontTest') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePlatformDiagramAnimation } from '@/composables/usePlatformDiagramAnimation'
import AiTrainingGraphic from './intelligence/AiTrainingGraphic.vue'
import OpticalSimulationGraphic from './intelligence/OpticalSimulationGraphic.vue'
import ProductionLineGraphic from './intelligence/ProductionLineGraphic.vue'

const { t } = useI18n()
const sectionRoot = ref<HTMLElement | null>(null)

usePlatformDiagramAnimation(sectionRoot)
</script>

<style scoped>
.platform-section {
  width: 100%;
  min-height: 760px;
  padding: 120px 0 100px;
  background: #121212;
}

.platform-stage {
  width: min(1200px, calc(100% - 64px));
  min-height: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.platform-header {
  text-align: center;
  margin-bottom: 54px;
}

.platform-header h2 {
  margin: 0 0 20px;
  color: #ffffff;
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
}

.platform-header p {
  max-width: 900px;
  margin: 0 auto;
  color: #afafaf;
  font-size: 22px;
  line-height: 36px;
}

.platform-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 82px minmax(0, 1fr) 82px minmax(0, 1fr);
  align-items: center;
}

.flow-step {
  position: relative;
  min-width: 0;
  padding: 22px 20px 28px;
  border: 1px solid #323a46;
  background: linear-gradient(180deg, #171b21 0%, #101215 100%);
}

.flow-step--featured {
  border-color: #3b82f6;
  box-shadow: 0 0 32px rgba(59, 130, 246, 0.14);
}

.step-index {
  position: absolute;
  top: 18px;
  left: 20px;
  color: #4f88ce;
  font-size: 12px;
  font-weight: 600;
}

.flow-step h3 {
  margin: 2px 0 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

.flow-step p {
  min-height: 42px;
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
}

.flow-connector {
  display: block;
  width: 82px;
  overflow: visible;
  fill: none;
  stroke: #3b82f6;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 1200px) {
  .platform-section {
    min-height: auto;
    padding: 96px 0 72px;
  }

  .platform-stage {
    width: min(760px, calc(100% - 40px));
    min-height: auto;
  }

  .platform-header p {
    font-size: 18px;
    line-height: 30px;
  }

  .platform-flow {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .flow-connector {
    width: 72px;
    margin: 0 auto;
    transform: rotate(90deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .platform-section *,
  .platform-section *::before,
  .platform-section *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>
