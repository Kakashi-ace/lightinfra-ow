<template>
  <section class="hero-section">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-decoration">
        <div class="deco-card deco-card-1"></div>
        <div class="deco-card deco-card-2"></div>
        <div class="deco-card deco-card-3"></div>
        <div class="deco-card deco-card-4"></div>
      </div>
    </div>
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">{{ t('product.instrument.heroTitle') }}</h1>
        <p class="hero-desc">{{ t('product.instrument.heroDesc') }}</p>
        <button class="hero-btn" @click="emit('start')">{{ t('common.startUsing') }}</button>
      </div>
      <div class="hero-right">
        <div class="deco-cards">
          <div class="deco-card-large"></div>
          <div class="deco-card-medium"></div>
          <div class="deco-card-small"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits(['start'])
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #0073FF 0%, #131313 100%);
}

.hero-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-decoration .deco-card {
  position: absolute;
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%);
  border-radius: 30px;
  transform: matrix(0.87, 0.5, -0.87, 0.5, 0, 0);
}

.deco-card-1 {
  width: 300px;
  height: 400px;
  top: 15%;
  right: 5%;
}

.deco-card-2 {
  width: 250px;
  height: 350px;
  top: 30%;
  right: 20%;
}

.deco-card-3 {
  width: 200px;
  height: 280px;
  top: 45%;
  right: 35%;
}

.deco-card-4 {
  width: 180px;
  height: 250px;
  top: 60%;
  right: 50%;
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 55px;
}

.hero-left {
  width: 539px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.hero-title {
  font-size: 64px;
  font-weight: 600;
  line-height: 75px;
  color: #FFFFFF;
  margin: 0;
}

.hero-desc {
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #FFFFFF;
  margin: 0;
}

.hero-btn {
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

.hero-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.hero-right {
  width: 539px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-cards {
  position: relative;
  width: 400px;
  height: 500px;
}

.deco-card-large,
.deco-card-medium,
.deco-card-small {
  position: absolute;
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%);
  border-radius: 30px;
  transform: matrix(0.87, 0.5, -0.87, 0.5, 0, 0);
}

.deco-card-large {
  width: 300px;
  height: 400px;
  top: 50px;
  right: 0;
}

.deco-card-medium {
  width: 250px;
  height: 350px;
  top: 100px;
  right: 80px;
}

.deco-card-small {
  width: 200px;
  height: 280px;
  top: 150px;
  right: 150px;
}
</style>
