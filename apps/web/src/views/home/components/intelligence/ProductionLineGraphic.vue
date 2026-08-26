<template>
  <svg class="intelligence-graphic production-graphic" viewBox="0 0 360 300" role="img" aria-labelledby="production-title production-desc">
    <title id="production-title">{{ t('home.prodLabel') }}</title>
    <desc id="production-desc">{{ productionDescription }}</desc>
    <g data-animation="production-sensor">
      <path d="M136 28h88v42h-88Z" fill="#1e3a5f" stroke="#9ca3af" stroke-width="4" />
      <circle cx="180" cy="49" r="11" fill="#3b82f6" />
      <path d="M154 28V16M206 28V16M132 16h96" fill="none" stroke="#737b86" stroke-width="4" stroke-linecap="round" />
    </g>
    <g data-animation="production-scan" fill="none" stroke="#3b82f6" stroke-width="3">
      <path d="M154 74l-34 96M206 74l34 96" /><path d="M139 116h82M130 142h100" stroke-dasharray="5 6" />
    </g>
    <g data-animation="production-products">
      <rect x="54" y="144" width="58" height="42" rx="5" fill="#555d68" stroke="#9ca3af" stroke-width="3" />
      <rect x="150" y="132" width="60" height="54" rx="5" fill="#1e3a5f" stroke="#3b82f6" stroke-width="4" />
      <path d="M164 158l11 11 21-25" fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="248" y="144" width="58" height="42" rx="5" fill="#555d68" stroke="#9ca3af" stroke-width="3" />
    </g>
    <g data-animation="production-line">
      <rect x="34" y="190" width="292" height="38" rx="19" fill="none" stroke="#737b86" stroke-width="4" />
      <path d="M62 209h236" stroke="#292d33" stroke-width="3" />
      <g fill="#9ca3af"><circle cx="70" cy="209" r="8" /><circle cx="125" cy="209" r="8" /><circle cx="180" cy="209" r="8" /><circle cx="235" cy="209" r="8" /><circle cx="290" cy="209" r="8" /></g>
      <path d="M68 230v24M292 230v24M48 254h264" fill="none" stroke="#737b86" stroke-width="4" stroke-linecap="round" />
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const productionDescription = computed(() => [
  t('home.prodSpectrumCal'),
  t('home.prodWavefrontTest'),
  t('home.prodLinkSim'),
  t('home.prodNetOpm')
].join('、'))
</script>

<style scoped>
.intelligence-graphic { display: block; width: 100%; height: auto; overflow: visible; }
</style>
