<template>
  <section class="reason-section">
    <h2 class="reason-title">{{ t('product.opticsgpt.reasonTitle') }}</h2>
    <button class="reason-btn" @click="emit('start')">{{ t('footer.contact') }}</button>
    <div class="reason-cards">
      <div v-for="(card, index) in cards" :key="index" class="reason-card">
        <img class="reason-card-image" :src="cardImages[index]" :alt="card.title" />
        <div class="reason-card-text">
          <h3 class="reason-card-title">{{ card.title }}</h3>
          <p class="reason-card-desc">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const cards = computed(() => tm('product.opticsgpt.features'))

const cardImages = [
  '/media/reason-OpticsGPT-deploy.png',
  '/media/reason-OpticsGPT-knowledge.png',
  '/media/reason-OpticsGPT-application.png',
  '/media/reason-OpticsGPT-control.png'
]

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

.reason-cards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
}

.reason-card {
  flex: 1 1 220px;
  min-width: 0;
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
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  text-align: left;
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
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
