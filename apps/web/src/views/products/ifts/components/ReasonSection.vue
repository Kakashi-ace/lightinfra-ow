<template>
  <section class="reason-section">
    <h2 class="reason-title">{{ t('product.ifts.reasonTitle') }}</h2>
    <button class="reason-btn" @click="emit('start')">{{ t('footer.contact') }}</button>
    <div class="reason-flex">
      <div class="reason-column reason-column-left">
        <div class="reason-card">
          <img class="reason-card-image" src="/media/ProductPage-IFTS-WhyIFTS-LeftTop.png" alt="" />
          <div class="reason-card-text">
            <h3 class="reason-card-title">{{ cards[0]?.title }}</h3>
            <p class="reason-card-desc">{{ cards[0]?.desc }}</p>
          </div>
        </div>
        <div class="reason-card">
          <img class="reason-card-image" src="/media/ProductPage-IFTS-WhyIFTS-Left%20Button.png" alt="" />
          <div class="reason-card-text">
            <h3 class="reason-card-title">{{ cards[2]?.title }}</h3>
            <p class="reason-card-desc">{{ cards[2]?.desc }}</p>
          </div>
        </div>
      </div>
      <img class="reason-center-image" src="/media/reason-IFTS-center.png" alt="IFTS" />
      <div class="reason-column reason-column-right">
        <div class="reason-card">
          <img class="reason-card-image" src="/media/ProductPage-IFTS-WhyIFTS-RightTop.png" alt="" />
          <div class="reason-card-text">
            <h3 class="reason-card-title">{{ cards[1]?.title }}</h3>
            <p class="reason-card-desc">{{ cards[1]?.desc }}</p>
          </div>
        </div>
        <div class="reason-card">
          <img class="reason-card-image" src="/media/ProductPage-IFTS-WhyIFTS-Right%20Button.png" alt="" />
          <div class="reason-card-text">
            <h3 class="reason-card-title">{{ cards[3]?.title }}</h3>
            <p class="reason-card-desc">{{ cards[3]?.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const cards = computed(() => tm('product.ifts.features'))

const emit = defineEmits(['start'])
</script>

<style scoped>
.reason-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.reason-title {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  text-align: center;
  margin: 0;
}

.reason-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  padding: 0 48px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 73px;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.reason-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.reason-flex {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.reason-column {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.reason-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.reason-card-image {
  display: block;
  width: 100%;
  max-width: 220px;
  height: auto;
}

.reason-card-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reason-card-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #FFFFFF;
  margin: 0;
}

.reason-card-desc {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #AFAFAF;
  margin: 0;
}

.reason-center-image {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 700px;
  z-index: 1;
  pointer-events: none;
}
</style>
