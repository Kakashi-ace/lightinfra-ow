<template>
  <section class="product-carousel-section" @mouseenter="pause = true" @mouseleave="pause = false">
    <div class="carousel-viewport">
      <div class="carousel-track" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
        <div v-for="slide in slides" :key="slide.key" class="carousel-slide">
          <div class="opticsgpt-content">
            <div class="opticsgpt-left">
              <div class="bar-chart">
                <div class="bar bar-blue"></div>
                <div class="bar bar-gray"></div>
                <div class="bar bar-gray"></div>
              </div>
              <div class="opticsgpt-text">
                <h2 class="opticsgpt-title">{{ slide.title }}</h2>
                <p class="opticsgpt-desc">{{ slide.desc }}</p>
                <router-link :to="slide.link" class="opticsgpt-btn">{{ t('common.viewDetails') }}</router-link>
              </div>
            </div>
            <div class="opticsgpt-right">
              <img class="opticsgpt-image" :src="slide.image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="carousel-arrow" aria-label="prev" @click="goTo(activeIndex - 1)">&#10094;</button>
      <div class="carousel-dots">
        <button
          v-for="(slide, index) in slides"
          :key="slide.key"
          class="carousel-dot"
          :class="{ active: index === activeIndex }"
          :aria-label="`slide ${index + 1}`"
          @click="goTo(index)"
        ></button>
      </div>
      <button class="carousel-arrow" aria-label="next" @click="goTo(activeIndex + 1)">&#10095;</button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const slides = computed(() => [
  { key: 'opticsgpt', title: t('productIntro.opticsgptTitle'), desc: t('productIntro.opticsgptDesc'), image: '/media/HomePage-OpticsGPT.png', link: '/products/opticsgpt' },
  { key: 'ifts', title: t('productIntro.iftsTitle'), desc: t('productIntro.iftsDesc'), image: '/media/HomePage-IFTS.png', link: '/products/ifts' },
  { key: 'instruments', title: t('productIntro.instrumentsTitle'), desc: t('productIntro.instrumentsDesc'), image: '/media/HomePage-智能仪器仪表.png', link: '/products/instruments' },
])

const activeIndex = ref(0)
const pause = ref(false)

const goTo = (index) => {
  const total = slides.value.length
  activeIndex.value = (index + total) % total
}

let timer = null
onMounted(() => {
  timer = setInterval(() => {
    if (!pause.value) goTo(activeIndex.value + 1)
  }, 6000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.product-carousel-section {
  width: 1200px;
  padding: 80px 0;
}

.carousel-viewport {
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  width: 100%;
  flex-shrink: 0;
}

.opticsgpt-content {
  display: flex;
  gap: 55px;
  align-items: center;
}

.opticsgpt-left {
  width: 511px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 14px;
  height: 174px;
  flex-shrink: 0;
}

.bar {
  width: 14px;
  border-radius: 7px;
  flex-shrink: 0;
}

.bar-blue {
  height: 88px;
  background: #0073FF;
}

.bar-gray {
  height: 31px;
  background: #D9D9D9;
}

.opticsgpt-text {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.opticsgpt-title {
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

.opticsgpt-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.opticsgpt-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 60px;
  padding: 0 48px;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  background: transparent;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  text-decoration: none;
  margin-top: 70px;
  transition: all 0.3s ease;
}

.opticsgpt-btn:hover {
  background: #FFFFFF;
  color: #121212;
}

.opticsgpt-right {
  width: 648px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
}

.opticsgpt-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
}

.carousel-arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #FFFFFF;
  background: transparent;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.carousel-arrow:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.carousel-dots {
  display: flex;
  gap: 12px;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #4A4A4A;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease;
}

.carousel-dot.active {
  background: #0073FF;
}

@media (max-width: 1200px) {
  .product-carousel-section {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  .opticsgpt-content {
    flex-direction: column;
  }

  .opticsgpt-left {
    width: 100%;
  }

  .opticsgpt-right {
    width: 100%;
    max-width: 648px;
    height: auto;
    aspect-ratio: 648 / 542;
  }
}
</style>
