<template>
  <div class="product-intro-page">
    <div class="product-blocks">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="product-block"
        :class="{ 'block-even': index % 2 === 1 }"
      >
        <!-- 左侧内容 -->
        <div class="block-left">
          <!-- 指示器 -->
          <div class="indicator">
            <div
              v-for="(dot, dotIndex) in 3"
              :key="dotIndex"
              class="indicator-dot"
              :class="{ 'dot-active': dotIndex === product.activeIndex }"
              :style="{ height: dotIndex === product.activeIndex ? '88px' : '31px' }"
            ></div>
          </div>

          <!-- 文字内容 -->
          <div class="block-content">
            <div class="content-text">
              <h2 class="product-title">{{ product.title }}</h2>
              <p class="product-desc">{{ product.description }}</p>
            </div>
            <button
              class="start-btn"
              @click="handleStart(index)"
            >
              开始使用
            </button>
          </div>
        </div>

        <!-- 右侧图片 -->
        <div class="block-right">
          <div
            class="product-image-placeholder"
            :style="{ backgroundImage: `url(${getProductImage(product.id)})` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 产品图片路径
const productImages = {
  opticsgpt: '/media/ProductPage-OpticsGPT-hero.png',
  ifts: '/media/ProductPage-IFTS-hero.png',
  instruments: '/media/ProductPage-智能仪器仪表-hero.png'
}

const props = defineProps({
  products: {
    type: Array,
    default: () => [
      {
        id: 'opticsgpt',
        title: 'OpticsGPT',
        description: '面向光学产业的垂域大模型，为科研、研发与工程应用提供专业智能能力',
        activeIndex: 0
      },
      {
        id: 'ifts',
        title: '智能仿真工具 IFTS',
        description: '致力于降低光学专业门槛 打通领域知识与工程应用壁垒',
        activeIndex: 1
      },
      {
        id: 'instruments',
        title: '智能仪器仪表',
        description: '让仪器统一接入，让测试智能执行',
        activeIndex: 2
      }
    ]
  }
})

const emit = defineEmits(['select', 'start'])

const handleStart = (index) => {
  emit('start', index)
}

const getProductImage = (productId) => {
  return productImages[productId] || ''
}
</script>

<style scoped>
.product-intro-page {
  width: 1485px;
  min-height: 2068px;
  background: #121212;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  font-family: 'OPPO Sans 4.0', system-ui, -apple-system, sans-serif;
}

.product-blocks {
  width: 1200px;
  margin: 0 auto;
  padding-top: 135px;
  display: flex;
  flex-direction: column;
  gap: 77px;
}

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
