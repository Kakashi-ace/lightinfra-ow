<template>
  <svg class="intelligence-graphic production-graphic" viewBox="0 0 256 256" role="img" aria-labelledby="production-title production-desc">
    <title id="production-title">{{ t('home.prodLabel') }}</title>
    <desc id="production-desc">{{ productionDescription }}</desc>

    <rect width="256" height="256" rx="28" fill="#0D0F12" />

    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path data-animation="production-draw-sensor" d="M94 34h68v33H94Z" stroke="#9CA3AF" stroke-width="4" />
      <path data-animation="production-draw-sensor" d="M106 34V24m44 10V24m-58 0h72" stroke="#737B86" stroke-width="4" />
      <g data-animation="production-draw-scan" stroke="#3B82F6" stroke-width="3">
        <path d="m107 70-24 75" />
        <path d="m149 70 24 75" />
      </g>
      <g data-animation="production-scan-guides" stroke="#292D33" stroke-width="2" stroke-dasharray="4 5">
        <path d="M96 103h64" />
        <path d="M90 123h76" />
      </g>
      <g data-animation="production-draw-products">
        <rect x="42" y="119" width="45" height="36" rx="5" stroke="#9CA3AF" stroke-width="3" />
        <rect x="104" y="110" width="48" height="45" rx="5" stroke="#3B82F6" stroke-width="4" />
        <path data-animation="production-check-draw" d="m117 133 8 8 15-18" stroke="#60A5FA" stroke-width="4" />
        <rect x="169" y="119" width="45" height="36" rx="5" stroke="#9CA3AF" stroke-width="3" />
      </g>
      <rect data-animation="production-draw-conveyor" x="27" y="157" width="202" height="27" rx="13.5" stroke="#737B86" stroke-width="4" />
      <path data-animation="production-draw-conveyor" d="M45 171h166" stroke="#292D33" stroke-width="3" />
      <path data-animation="production-draw-conveyor" d="M53 185v24m150-24v24M39 209h178" stroke="#737B86" stroke-width="4" />
      <path data-animation="production-draw-feedback" d="M63 218h130" stroke="#292D33" stroke-width="2" />
    </g>

    <g data-animation="production-motion-scan" aria-hidden="true" fill="none" stroke="#60A5FA" stroke-width="3" stroke-linecap="round" opacity="0">
      <path d="m107 70-24 75" />
      <path d="m149 70 24 75" />
    </g>

    <g data-animation="production-materialize">
      <path d="M94 34h68v33H94Z" fill="#1E3A5F" />
      <circle cx="128" cy="51" r="9" fill="#3B82F6" />
      <rect x="42" y="119" width="45" height="36" rx="5" fill="#555D68" />
      <rect data-animation="production-product" x="104" y="110" width="48" height="45" rx="5" fill="#1E3A5F" />
      <path data-animation="production-check-material" d="m117 133 8 8 15-18" fill="none" stroke="#60A5FA" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="169" y="119" width="45" height="36" rx="5" fill="#555D68" />
      <g fill="#9CA3AF">
        <circle cx="51" cy="171" r="7" />
        <circle cx="89" cy="171" r="7" />
        <circle cx="128" cy="171" r="7" />
        <circle cx="167" cy="171" r="7" />
        <circle cx="205" cy="171" r="7" />
      </g>
      <g data-animation="production-feedback" fill="#3B82F6">
        <circle cx="82" cy="218" r="6" />
        <circle cx="128" cy="218" r="6" />
        <circle cx="174" cy="218" r="6" />
      </g>
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
