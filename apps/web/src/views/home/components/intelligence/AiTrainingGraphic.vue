<template>
  <svg class="intelligence-graphic ai-graphic" viewBox="0 0 360 300" role="img" aria-labelledby="ai-title ai-desc">
    <title id="ai-title">{{ t('home.gptLabel') }}</title>
    <desc id="ai-desc">{{ t('home.gptCap') }}</desc>
    <g data-animation="ai-trace" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="30" y="44" width="112" height="76" rx="10" fill="#1e3a5f" stroke="#737b86" stroke-width="3" />
      <path d="M48 96h18V72h18v24h18V60h18v36" stroke="#3b82f6" stroke-width="5" />
      <path d="M142 82h54" stroke="#3b82f6" stroke-width="4" />
      <path d="M184 72l12 10-12 10" stroke="#60a5fa" stroke-width="4" />
      <rect x="198" y="44" width="132" height="76" rx="10" fill="#121a27" stroke="#60a5fa" stroke-width="3" />
      <path d="M218 70h90M218 88h58M218 106h74" stroke="#9ca3af" stroke-width="3" />
    </g>
    <g data-animation="ai-nodes" fill="#3b82f6">
      <circle cx="86" cy="160" r="8" /><circle cx="178" cy="160" r="8" /><circle cx="270" cy="160" r="8" />
    </g>
    <g data-animation="ai-network" fill="none" stroke="#4a5563" stroke-width="2">
      <path d="M86 168v45M178 168v45M270 168v45M86 213h184" stroke-dasharray="5 7" />
    </g>
    <text x="86" y="252" text-anchor="middle" class="graphic-label">{{ t('home.rdOpticalDesign') }}</text>
    <text x="178" y="252" text-anchor="middle" class="graphic-label">AI</text>
    <text x="270" y="252" text-anchor="middle" class="graphic-label">{{ t('home.agentLabel') }}</text>
  </svg>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.intelligence-graphic { display: block; width: 100%; height: auto; overflow: visible; }
.graphic-label { fill: #d8dee8; font: 500 14px system-ui, sans-serif; }
</style>
