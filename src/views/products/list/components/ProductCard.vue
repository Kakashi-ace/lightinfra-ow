<template>
  <div class="product-block" :class="{ 'block-even': index % 2 === 1 }">
    <div class="block-left">
      <div class="indicator">
        <div
          v-for="(dot, dotIndex) in 3"
          :key="dotIndex"
          class="indicator-dot"
          :class="{ 'dot-active': dotIndex === product.activeIndex }"
          :style="{ height: dotIndex === product.activeIndex ? '88px' : '31px' }"
        ></div>
      </div>
      <div class="block-content">
        <div class="content-text">
          <h2 class="product-title">{{ t(product.titleKey) }}</h2>
          <p class="product-desc">{{ t(product.descKey) }}</p>
        </div>
        <button class="start-btn" @click="emit('start', index)">
          {{ t('common.startUsing') }}
        </button>
      </div>
    </div>
    <div class="block-right">
      <div class="product-image-placeholder" :style="{ backgroundImage: `url(${image})` }"></div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const productImages = {
  opticsgpt: '/media/ProductPage-OpticsGPT-hero.png',
  ifts: '/media/ProductPage-IFTS-hero.png',
  instruments: '/media/ProductPage-智能仪器仪表-hero.png'
}

const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['start'])

const image = productImages[props.product.id] || ''
</script>

<style scoped>
.product-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 55px;
  height: 542px;
}

.product-block.block-even {
  flex-direction: row-reverse;
}

.block-left {
  display: flex;
  align-items: flex-start;
  gap: 30px;
  width: 511px;
}

.indicator {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 14px;
  height: 174px;
  padding-top: 10px;
}

.indicator-dot {
  width: 14px;
  border-radius: 7px;
  background: #D9D9D9;
  transition: all 0.3s ease;
}

.indicator-dot.dot-active {
  background: #0073FF;
  height: 88px;
}

.block-content {
  display: flex;
  flex-direction: column;
  gap: 120px;
  width: 467px;
}

.content-text {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.product-title {
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

.product-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 30px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.start-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.block-right {
  width: 646px;
  height: 542px;
  border-radius: 20px;
  overflow: hidden;
}

.product-image-placeholder {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #2a2a2a;
}
</style>
