<template>
  <section ref="sectionRoot" class="platform-section" aria-labelledby="platform-heading">
    <div class="platform-stage">
      <div class="platform-header" data-animation="header">
        <h2 id="platform-heading">{{ t('home.platformTitle') }}</h2>
        <p>{{ t('home.platformDesc') }}</p>
      </div>

      <div class="platform-flow">
        <article class="flow-step" data-animation="step">
          <div class="graphic-frame">
            <AiTrainingGraphic />
          </div>
          <h3>{{ t('home.gptLabel') }}</h3>
        </article>

        <div class="flow-connector" data-connector="1" aria-hidden="true">
          <svg viewBox="0 0 96 24">
            <path data-animation="connector-line" d="M4 12H92" />
            <circle data-animation="connector-start" cx="4" cy="12" r="3.5" />
            <circle data-animation="connector-end" cx="92" cy="12" r="3.5" />
          </svg>
        </div>

        <article class="flow-step" data-animation="step">
          <div class="graphic-frame">
            <OpticalSimulationGraphic />
          </div>
          <h3>{{ t('home.rdLabel') }}</h3>
        </article>

        <div class="flow-connector" data-connector="2" aria-hidden="true">
          <svg viewBox="0 0 96 24">
            <path data-animation="connector-line" d="M4 12H92" />
            <circle data-animation="connector-start" cx="4" cy="12" r="3.5" />
            <circle data-animation="connector-end" cx="92" cy="12" r="3.5" />
          </svg>
        </div>

        <article class="flow-step" data-animation="step">
          <div class="graphic-frame">
            <ProductionLineGraphic />
          </div>
          <h3>{{ t('home.prodLabel') }}</h3>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePlatformDiagramAnimation } from '@/composables/usePlatformDiagramAnimation'
import AiTrainingGraphic from './components/AiTrainingGraphic.vue'
import OpticalSimulationGraphic from './components/OpticalSimulationGraphic.vue'
import ProductionLineGraphic from './components/ProductionLineGraphic.vue'

const { t } = useI18n()
const sectionRoot = ref<HTMLElement | null>(null)

usePlatformDiagramAnimation(sectionRoot)
</script>

<style scoped>
.platform-section {
  box-sizing: border-box;
  width: 100%;
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
  grid-template-columns: minmax(0, 1fr) 96px minmax(0, 1fr) 96px minmax(0, 1fr);
  align-items: center;
}

.flow-step {
  position: relative;
  min-width: 0;
  padding: 22px 20px 28px;
}

.graphic-frame {
  width: min(256px, 100%);
  aspect-ratio: 1;
  margin: 0 auto;
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
  position: relative;
  width: 96px;
  height: 24px;
}

.flow-connector svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  stroke: #3b82f6;
  stroke-width: 2;
  stroke-linecap: round;
}

.flow-connector [data-animation="connector-dot"] {
  fill: #60a5fa;
  stroke: none;
}

.flow-connector [data-animation^="connector-"] {
  vector-effect: non-scaling-stroke;
}

@media (max-width: 1200px) {
  .platform-section {
    height: auto;
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
