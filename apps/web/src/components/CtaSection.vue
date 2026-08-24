<template>
  <section class="cta-section" :style="ctaVars">
    <img v-if="image" class="cta-bg-image" src="/media/cta-background.png" alt="" />
    <div v-if="glow" class="cta-bg"></div>
    <h2 class="cta-title">{{ title }}</h2>
    <p v-if="subtitle" class="cta-subtitle">{{ subtitle }}</p>
    <button class="cta-btn" @click="emit('start')">{{ buttonText }}</button>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { resolveCtaVars } from '@/theme/ctaTheme'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    required: true
  },
  glow: {
    type: Boolean,
    default: true
  },
  image: {
    type: Boolean,
    default: true
  },
  // CTA 配色主题，随页面浅/深色设计传入，默认 dark 与改造前视觉一致
  theme: {
    type: String,
    default: 'dark'
  }
})

const emit = defineEmits(['start'])

const ctaVars = computed(() => resolveCtaVars(props.theme))
</script>

<style scoped>
.cta-section {
  position: relative;
  width: 100%;
  max-width: 1440px;
  aspect-ratio: 1440 / 669;
  margin: 0 auto;
  padding: 100px 20px;
  box-sizing: border-box;
  background-color: var(--cta-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  overflow: hidden;
}

.cta-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

.cta-bg {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 1100px;
  background: var(--cta-glow);
  mix-blend-mode: var(--cta-blend);
  z-index: 0;
  pointer-events: none;
}

.cta-title {
  position: relative;
  z-index: 1;
  font-size: 64px;
  font-weight: 500;
  line-height: 75px;
  color: var(--cta-title-color);
  text-align: center;
  margin: 0;
}

.cta-subtitle {
  position: relative;
  z-index: 1;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: var(--cta-subtitle-color);
  text-align: center;
  margin: -24px 0 0 0;
}

.cta-btn {
  position: relative;
  z-index: 1;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid var(--cta-btn-border);
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: var(--cta-btn-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}
</style>
