<template>
  <div class="hero-section">
    <div class="hero-content">
      <div class="hero-header">
        <span class="hero-tag">{{ tag }}</span>
        <h1 class="hero-title">{{ title }}</h1>
      </div>
      <p class="hero-date">{{ date }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tag: { type: String, default: '' },
  title: { type: String, default: '' },
  date: { type: String, default: '' }
})
</script>

<style scoped>
.hero-section {
  width: 100%;
  height: 400px;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  display: flex;
  align-items: flex-end;
  padding-top: 80px;
}

.hero-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  background: #4754E1;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  height: 32px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.hero-title {
  font-size: 36px;
  font-weight: 600;
  line-height: 44px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}

.hero-date {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
}
</style>
