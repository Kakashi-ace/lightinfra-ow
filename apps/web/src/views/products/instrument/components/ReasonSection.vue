<template>
  <section class="reason-section">
    <h2 class="reason-title">{{ t('product.instrument.reasonTitle') }}</h2>
    <button class="reason-btn" @click="emit('start')">{{ t('footer.contact') }}</button>
    <div class="reason-grid">
      <div v-for="(scene, index) in scenes" :key="index" class="reason-card">
        <div class="reason-card-text">
          <span class="reason-card-tag">{{ scene.tag }}</span>
          <h3 class="reason-card-title">{{ scene.title }}</h3>
        </div>
        <img class="reason-card-image" :src="cardImages[index]" :alt="scene.tag" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const scenes = computed(() => tm('product.instrument.scenes'))

const cardImages = [
  '/media/reason-smartInstrument-dev.png',
  '/media/reason-smartInstrument-businessLine.png',
  '/media/reason-smartInstrument-manager.png',
  '/media/reason-smartInstrument-whole.png'
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

.reason-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.reason-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  min-height: 320px;
  border-radius: 20px;
  overflow: hidden;
}

.reason-card-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
}

.reason-card-tag {
  font-size: 20px;
  font-weight: 500;
  color: #AFAFAF;
}

.reason-card-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  color: #FFFFFF;
  margin: 0;
  white-space: pre-line;
}

.reason-card-image {
  align-self: flex-end;
  width: 75%;
  height: auto;
  margin-top: 16px;
}
</style>
