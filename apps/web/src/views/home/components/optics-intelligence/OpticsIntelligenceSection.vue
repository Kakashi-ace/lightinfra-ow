<template>
  <section class="optics-intelligence-section" aria-labelledby="optics-intelligence-heading">
    <h2 id="optics-intelligence-heading" class="section-title">{{ t('home.aiOpticsTitle') }}</h2>

    <div class="carousel-shell">
      <div class="carousel-indicators" :aria-label="t('home.aiOpticsNavigation')">
        <button
          v-for="(slide, index) in slides"
          :key="slide.key"
          type="button"
          class="indicator-button"
          :class="{ 'indicator-button--active': index === activeIndex }"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="goTo(index)"
        >
          <span
            class="indicator-progress"
            :style="{ transform: `scaleX(${index === activeIndex ? progress : 0})` }"
            aria-hidden="true"
          ></span>
          <span class="indicator-label">{{ slide.name }}</span>
        </button>
      </div>

      <div ref="viewport" class="carousel-viewport">
        <div class="carousel-track" :style="trackStyle">
          <article
            v-for="slide in renderedSlides"
            :key="slide.renderKey"
            class="carousel-slide"
            :class="`carousel-slide--${slide.tone}`"
            :aria-hidden="slide.originalIndex !== activeIndex"
          >
            <div class="slide-placeholder" role="img" :aria-label="slide.alt">
              <div class="placeholder-grid" aria-hidden="true"></div>
              <span class="placeholder-index" aria-hidden="true">0{{ slide.originalIndex + 1 }}</span>
              <div class="placeholder-content">
                <span class="placeholder-kicker">AI FOR OPTICS</span>
                <h3>{{ slide.title }}</h3>
                <p>{{ slide.description }}</p>
              </div>
              <div class="placeholder-orbit" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </article>
        </div>

        <button type="button" class="carousel-arrow carousel-arrow--previous" :aria-label="t('home.aiOpticsPrevious')" @click="goTo(activeIndex - 1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        </button>
        <button type="button" class="carousel-arrow carousel-arrow--next" :aria-label="t('home.aiOpticsNext')" @click="goTo(activeIndex + 1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <p class="sr-only" aria-live="polite">{{ t('home.aiOpticsSlideStatus', { current: activeIndex + 1, total: slides.length, title: slides[activeIndex]?.name }) }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{ duration?: number }>(), {
  duration: 6000
})

const { t } = useI18n()
const viewport = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const progress = ref(0)
const slideStep = ref(0)
const isDocumentHidden = ref(false)
const isReducedMotion = ref(false)

const slides = computed(() => [
  {
    key: 'research',
    name: t('home.aiOpticsSlides.research.name'),
    title: t('home.aiOpticsSlides.research.title'),
    description: t('home.aiOpticsSlides.research.description'),
    alt: t('home.aiOpticsSlides.research.alt'),
    tone: 'research'
  },
  {
    key: 'testing',
    name: t('home.aiOpticsSlides.testing.name'),
    title: t('home.aiOpticsSlides.testing.title'),
    description: t('home.aiOpticsSlides.testing.description'),
    alt: t('home.aiOpticsSlides.testing.alt'),
    tone: 'testing'
  },
  {
    key: 'operations',
    name: t('home.aiOpticsSlides.operations.name'),
    title: t('home.aiOpticsSlides.operations.title'),
    description: t('home.aiOpticsSlides.operations.description'),
    alt: t('home.aiOpticsSlides.operations.alt'),
    tone: 'operations'
  }
])

const renderedSlides = computed(() => {
  const source = slides.value
  return [...source, source[0]!].map((slide, index) => ({
    ...slide,
    originalIndex: index % source.length,
    renderKey: index === source.length ? `${slide.key}-clone` : slide.key
  }))
})

const trackStyle = computed(() => ({ transform: `translate3d(-${activeIndex.value * slideStep.value}px, 0, 0)` }))
const isPaused = computed(() => isDocumentHidden.value || isReducedMotion.value)

let elapsedMs = 0
let previousFrame: number | undefined
let animationFrame: number | undefined
let resizeObserver: ResizeObserver | undefined
let reducedMotionQuery: MediaQueryList | undefined

function measureSlides(): void {
  const viewportWidth = viewport.value?.clientWidth ?? 0
  const peekWidth = viewportWidth >= 900 ? 176 : 72
  const gap = viewportWidth >= 900 ? 24 : 16
  slideStep.value = Math.max(0, viewportWidth - peekWidth + gap)
}

function resetPlayback(): void {
  elapsedMs = 0
  previousFrame = undefined
  progress.value = 0
}

function goTo(index: number): void {
  const total = slides.value.length
  activeIndex.value = (index + total) % total
  resetPlayback()
}

function animate(timestamp: number): void {
  if (!isPaused.value) {
    if (previousFrame !== undefined) elapsedMs += timestamp - previousFrame
    progress.value = Math.min(elapsedMs / Math.max(props.duration, 1), 1)

    if (progress.value >= 1) goTo(activeIndex.value + 1)
  }

  previousFrame = timestamp
  animationFrame = requestAnimationFrame(animate)
}

function handleVisibilityChange(): void {
  isDocumentHidden.value = document.hidden
  previousFrame = undefined
}

function handleReducedMotionChange(event: MediaQueryListEvent): void {
  isReducedMotion.value = event.matches
  previousFrame = undefined
}

watch(() => props.duration, resetPlayback)
watch(isPaused, () => { previousFrame = undefined })

onMounted(async () => {
  await nextTick()
  measureSlides()
  resizeObserver = new ResizeObserver(measureSlides)
  if (viewport.value) resizeObserver.observe(viewport.value)

  isDocumentHidden.value = document.hidden
  document.addEventListener('visibilitychange', handleVisibilityChange)

  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion.value = reducedMotionQuery.matches
  reducedMotionQuery.addEventListener('change', handleReducedMotionChange)

  animationFrame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  reducedMotionQuery?.removeEventListener('change', handleReducedMotionChange)
})
</script>

<style scoped>
.optics-intelligence-section {
  box-sizing: border-box;
  width: min(1200px, calc(100% - 64px));
  padding: 120px 0;
}

.section-title {
  max-width: 900px;
  margin: 0 auto 64px;
  color: #ffffff;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
}

.carousel-shell { width: 100%; }

.carousel-indicators {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  overflow-x: auto;
  scrollbar-width: none;
}

.carousel-indicators::-webkit-scrollbar { display: none; }

.indicator-button {
  position: relative;
  min-width: 156px;
  height: 46px;
  padding: 0 24px;
  overflow: hidden;
  border: 1px solid #3b4654;
  border-radius: 23px;
  background: #1a1e24;
  color: #c7ccd3;
  font: inherit;
  cursor: pointer;
}

.indicator-button:focus-visible,
.carousel-arrow:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 3px;
}

.indicator-button--active { border-color: #3b82f6; color: #ffffff; }

.indicator-progress {
  position: absolute;
  inset: 0;
  background: #1668d9;
  transform-origin: left center;
}

.indicator-label { position: relative; z-index: 1; white-space: nowrap; }

.carousel-viewport {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 24px;
  transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.carousel-slide {
  width: calc(100% - 176px);
  flex: 0 0 calc(100% - 176px);
  min-width: 0;
}

.slide-placeholder {
  position: relative;
  height: 580px;
  overflow: hidden;
  border: 1px solid #344151;
  border-radius: 8px;
  background: #151a20;
}

.carousel-slide--testing .slide-placeholder { background: #171a21; }
.carousel-slide--operations .slide-placeholder { background: #121b1d; }

.placeholder-grid {
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background-image: linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(90deg, transparent, #000 45%, #000);
}

.placeholder-index {
  position: absolute;
  top: 42px;
  right: 48px;
  color: rgba(255, 255, 255, 0.12);
  font-size: 96px;
  font-weight: 600;
}

.placeholder-content {
  position: absolute;
  left: 64px;
  bottom: 112px;
  z-index: 1;
  max-width: 520px;
}

.placeholder-kicker { color: #60a5fa; font-size: 13px; font-weight: 600; }
.placeholder-content h3 { margin: 16px 0; color: #fff; font-size: 40px; font-weight: 500; line-height: 1.2; }
.placeholder-content p { margin: 0; color: #aeb6c1; font-size: 18px; line-height: 1.7; }

.placeholder-orbit {
  position: absolute;
  top: 50%;
  right: 110px;
  width: 260px;
  height: 260px;
  border: 1px solid rgba(96, 165, 250, 0.45);
  border-radius: 50%;
  transform: translateY(-50%);
}

.placeholder-orbit::before,
.placeholder-orbit::after {
  position: absolute;
  border: 1px solid rgba(156, 163, 175, 0.28);
  border-radius: 50%;
  content: '';
}
.placeholder-orbit::before { inset: 42px; }
.placeholder-orbit::after { inset: 84px; }
.placeholder-orbit span { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #60a5fa; }
.placeholder-orbit span:nth-child(1) { top: 24px; left: 54px; }
.placeholder-orbit span:nth-child(2) { top: 122px; right: -6px; }
.placeholder-orbit span:nth-child(3) { bottom: 25px; left: 42px; }

.carousel-arrow {
  position: absolute;
  bottom: 32px;
  z-index: 2;
  display: grid;
  width: 48px;
  height: 48px;
  padding: 0;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  background: rgba(18, 18, 18, 0.72);
  color: #ffffff;
  cursor: pointer;
  backdrop-filter: blur(8px);
}

.carousel-arrow:hover { border-color: #60a5fa; color: #60a5fa; }
.carousel-arrow svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
.carousel-arrow--previous { left: 32px; }
.carousel-arrow--next { right: 208px; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 1200px) {
  .optics-intelligence-section { width: 100%; padding: 96px 20px; }
  .section-title { margin-bottom: 48px; font-size: 38px; }
  .carousel-track { gap: 16px; }
  .carousel-slide { width: calc(100% - 72px); flex-basis: calc(100% - 72px); }
  .slide-placeholder { height: 520px; }
  .placeholder-content { left: 36px; right: 36px; bottom: 112px; }
  .placeholder-orbit { right: 40px; opacity: 0.45; }
  .carousel-arrow--next { right: 88px; }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-track { transition: none; }
}
</style>
