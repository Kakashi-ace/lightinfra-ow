<template>
  <svg class="intelligence-graphic optical-graphic" viewBox="0 0 256 256" role="img" aria-labelledby="optical-title optical-desc">
    <title id="optical-title">{{ t('home.rdLabel') }}</title>
    <desc id="optical-desc">{{ t('home.rdDeviceSim') }}</desc>

    <rect width="256" height="256" rx="28" fill="#0D0F12" />

    <g fill="none" stroke-linecap="round">
      <path data-animation="optical-draw-axis" d="M24 92h206" stroke="#292D33" stroke-width="2" stroke-dasharray="4 6" />
      <g data-animation="optical-draw-rays" stroke="#3B82F6" stroke-width="4">
        <path d="M28 54h71l93 38" />
        <path d="M28 92h164" />
        <path d="M28 130h71l93-38" />
      </g>
      <path data-animation="optical-draw-lens" d="M108 38c-17 17-17 91 0 108 13-14 13-94 0-108Z" stroke="#9CA3AF" stroke-width="4" stroke-linejoin="round" />
      <path data-animation="optical-draw-lens" d="M108 45v94" stroke="#60A5FA" stroke-width="2" />
      <g data-animation="optical-draw-focus" stroke="#555D68" stroke-width="3">
        <path d="m192 92 34-20" />
        <path d="M192 92h36" />
        <path d="m192 92 34 20" />
      </g>
      <path data-animation="optical-draw-plot" d="M31 218v-52m0 52h197" stroke="#737B86" stroke-width="2" />
      <path data-animation="optical-draw-grid" d="M31 191h197" stroke="#292D33" stroke-width="1.5" stroke-dasharray="3 6" />
      <path data-animation="optical-draw-plot" d="M37 211c21-1 31-6 43-16 12-11 21-21 32-21 12 0 20 16 31 24 11 9 22 11 35 6 14-5 23-20 47-23" stroke="#3B82F6" stroke-width="4" stroke-linejoin="round" />
      <path data-animation="optical-draw-ticks" d="M78 218v5m50-5v5m50-5v5" stroke="#737B86" stroke-width="2" />
    </g>

    <g data-animation="optical-motion-rays" aria-hidden="true" fill="none" stroke="#60A5FA" stroke-width="3" stroke-linecap="round" stroke-dasharray="9 14" opacity="0">
      <path d="M28 54h71l93 38" />
      <path d="M28 92h164" />
      <path d="M28 130h71l93-38" />
      <path d="m192 92 34-20" />
      <path d="M192 92h36" />
      <path d="m192 92 34 20" />
    </g>
    <path data-animation="optical-motion-plot" aria-hidden="true" d="M37 211c21-1 31-6 43-16 12-11 21-21 32-21 12 0 20 16 31 24 11 9 22 11 35 6 14-5 23-20 47-23" fill="none" stroke="#93C5FD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0" />

    <g data-animation="optical-materialize">
      <path d="M108 38c-17 17-17 91 0 108 13-14 13-94 0-108Z" fill="#1E3A5F" />
      <circle data-animation="optical-focus" cx="192" cy="92" r="7" fill="#60A5FA" />
      <circle data-animation="optical-peak" cx="112" cy="174" r="5" fill="#60A5FA" />
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
