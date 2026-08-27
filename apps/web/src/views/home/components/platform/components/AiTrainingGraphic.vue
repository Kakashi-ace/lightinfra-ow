<template>
  <svg class="intelligence-graphic ai-graphic" viewBox="0 0 256 256" role="img" aria-labelledby="ai-title ai-desc">
    <title id="ai-title">{{ t('home.gptLabel') }}</title>
    <desc id="ai-desc">{{ t('home.gptCap') }}</desc>

    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect data-animation="ai-draw-panel" x="18.5" y="19" width="80.067" height="43.355" rx="8.391" stroke="#737B86" stroke-width="4" />
      <path data-animation="ai-draw-flow" d="M148.915 210.251H55.212c-12.237 0-20.279-8.042-20.279-20.279V62.879" stroke="#3B82F6" stroke-width="4" />
      <path data-animation="ai-draw-network" d="m63.953 124.241 17.831-26.573 35.663-26.572 35.663 26.572 17.832 26.573-17.832 26.572-35.663 26.572-35.663-26.572-17.831-26.572Zm53.494-53.145v106.289M81.784 97.668l35.663 26.573m0 0 35.663-26.573m-35.663 26.573-35.663 26.572m35.663-26.572 35.663 26.572m-89.157-26.572h106.989" stroke="#737B86" stroke-width="4" />
      <rect data-animation="ai-draw-server" x="148.915" y="177.387" width="68.179" height="61.536" rx="8.391" stroke="#60A5FA" stroke-width="4" />
      <path data-animation="ai-draw-server" d="M148.915 208.154h68.179" stroke="#60A5FA" stroke-width="4" />
      <path data-animation="ai-draw-server" d="M181.781 191.719h23.425m-23.425 7.692h23.425m-23.425 19.929h23.425m-23.425 7.692h23.425" stroke="#9CA3AF" stroke-width="2" />
    </g>

    <g data-animation="ai-motion-flow" aria-hidden="true" fill="none" stroke="#60A5FA" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 16" opacity="0">
      <path d="M99.791 39.629h87.933c12.02 0 20.279 8.258 20.279 20.279v96.2" />
      <path d="M148.915 210.251H55.212c-12.237 0-20.279-8.042-20.279-20.279V62.879" />
    </g>

    <g data-animation="ai-materialize">
      <path d="M99.791 37.629h87.933c13.131 0 22.279 9.148 22.279 22.279v89.688h-4V59.908c0-10.717-7.562-18.279-18.279-18.279H99.791v-4Z" fill="#3B82F6" />
      <path d="m208.003 167.596 11.547-20h-23.094l11.547 20Z" fill="#3B82F6" />
      <circle cx="129.685" cy="39.628" r="6.643" fill="#3B82F6" />
      <circle cx="91.924" cy="210.252" r="6.643" fill="#3B82F6" />
      <path d="M37.73 43.475h-8.391a.7.7 0 0 0-.7.699v10.839a.7.7 0 0 0 .7.699h8.391a.7.7 0 0 0 .699-.699V44.174a.7.7 0 0 0-.699-.699Z" fill="#737B86" />
      <path d="M52.065 37.18h-8.391a.7.7 0 0 0-.699.699v17.132a.7.7 0 0 0 .699.7h8.391a.7.7 0 0 0 .7-.7V37.879a.7.7 0 0 0-.7-.7Z" fill="#9CA3AF" />
      <path d="M66.4 28.44h-8.391a.7.7 0 0 0-.699.699v25.873a.7.7 0 0 0 .699.699H66.4a.7.7 0 0 0 .7-.699V29.139a.7.7 0 0 0-.7-.7Z" fill="#3B82F6" />
      <path d="M80.736 39.629h-8.392a.7.7 0 0 0-.699.699v14.685a.7.7 0 0 0 .7.699h8.39a.7.7 0 0 0 .7-.7V40.329a.7.7 0 0 0-.7-.7Z" fill="#9CA3AF" />
      <g data-animation="ai-nodes">
        <circle cx="81.784" cy="97.665" r="6.993" fill="#9CA3AF" />
        <circle cx="153.111" cy="97.665" r="6.993" fill="#9CA3AF" />
        <circle cx="81.784" cy="150.809" r="6.993" fill="#9CA3AF" />
        <circle cx="153.111" cy="150.809" r="6.993" fill="#9CA3AF" />
        <circle cx="117.447" cy="71.097" r="10.839" fill="#3B82F6" />
        <circle cx="63.953" cy="124.241" r="10.839" fill="#3B82F6" />
        <circle cx="117.447" cy="124.241" r="10.839" fill="#3B82F6" />
        <circle cx="170.942" cy="124.241" r="10.839" fill="#3B82F6" />
        <circle cx="117.447" cy="177.388" r="10.839" fill="#3B82F6" />
      </g>
      <g data-animation="ai-status">
        <circle cx="164.648" cy="195.567" r="6.294" fill="#60A5FA" />
        <circle cx="164.648" cy="223.186" r="6.294" fill="#60A5FA" />
      </g>
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
