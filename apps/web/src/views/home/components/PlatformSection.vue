<template>
  <section class="platform-section">
    <div class="platform-header">
      <h2>{{ t('home.platformTitle') }}</h2>
      <p>{{ t('home.platformDesc') }}</p>
    </div>

    <div class="platform-diagram">
      <img class="platform-diagram-image" src="/media/bussinessLine.png" alt="" />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.platform-section {
  width: 1100px;
  padding: 120px 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.platform-header {
  text-align: center;
  margin-bottom: 60px;
}

.platform-header h2 {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0 0 24px 0;
}

.platform-header p {
  width: 834px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  color: #AFAFAF;
  margin: 0;
}

.platform-diagram {
  width: 1100px;
}

.platform-diagram-image {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 1200px) {
  .platform-section,
  .platform-diagram {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
