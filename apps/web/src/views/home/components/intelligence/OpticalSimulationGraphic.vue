<template>
  <svg class="intelligence-graphic optical-graphic" viewBox="0 0 360 300" role="img" aria-labelledby="optical-title optical-desc">
    <title id="optical-title">{{ t('home.rdLabel') }}</title>
    <desc id="optical-desc">{{ t('home.rdDeviceSim') }}</desc>
    <g data-animation="optical-rays" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round">
      <path d="M28 78h120l126 58" /><path d="M28 136h246" /><path d="M28 194h120l126-58" />
    </g>
    <g data-animation="optical-lens">
      <path d="M148 46c-28 34-28 146 0 180 24-38 24-142 0-180Z" fill="#1e3a5f" stroke="#9ca3af" stroke-width="4" />
      <path d="M148 58v156" stroke="#60a5fa" stroke-width="2" />
    </g>
    <g data-animation="optical-focus">
      <circle cx="274" cy="136" r="9" fill="#60a5fa" />
      <path d="M274 136l54-34M274 136h58M274 136l54 34" fill="none" stroke="#68717d" stroke-width="3" />
    </g>
    <g data-animation="optical-plot" fill="none" stroke-linecap="round">
      <path d="M42 272v-58M42 272h280" stroke="#737b86" stroke-width="2" />
      <path d="M50 258c42-2 50-36 78-36 28 0 34 35 66 36 38 2 44-31 72-31 20 0 34 16 50 17" stroke="#3b82f6" stroke-width="4" />
    </g>
  </svg>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.intelligence-graphic { display: block; width: 100%; height: auto; overflow: visible; }
</style>
