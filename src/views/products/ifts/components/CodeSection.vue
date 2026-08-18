<template>
  <section class="code-section">
    <div class="code-header">
      <h2 class="section-title-left">{{ t('product.ifts.codeTitle') }}</h2>
      <button class="code-btn" @click="emit('start')">{{ t('common.startUsing') }}</button>
    </div>
    <div class="code-placeholder">
      <div class="code-mock">
        <div class="code-line"><span class="code-keyword">import</span> ifts</div>
        <div class="code-line"><span class="code-keyword">from</span> IFTS.example <span class="code-keyword">import</span> signal</div>
        <div class="code-line"></div>
        <div class="code-line comment">{{ t('product.ifts.codeComment1') }}</div>
        <div class="code-line">ch_para = ifts.channel_para(</div>
        <div class="code-line">    rand_seed=<span class="code-number">42</span>,</div>
        <div class="code-line">    simu_configs=<span class="code-string">'./config.yaml'</span></div>
        <div class="code-line">)</div>
        <div class="code-line"></div>
        <div class="code-line comment">{{ t('product.ifts.codeComment2') }}</div>
        <div class="code-line">output = ch_para.forward(signal)</div>
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
.code-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title-left {
  font-size: 48px;
  font-weight: 500;
  line-height: 56px;
  color: #FFFFFF;
  margin: 0;
}

.code-btn {
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

.code-btn:hover {
  border-color: #0073FF;
  color: #0073FF;
}

.code-placeholder {
  width: 100%;
  height: 676px;
  background: #1E1E1E;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
}

.code-mock {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 18px;
  line-height: 1.8;
  color: #D4D4D4;
}

.code-line {
  margin-bottom: 8px;
}

.code-keyword {
  color: #C586C0;
}

.code-number {
  color: #B5CEA8;
}

.code-string {
  color: #CE9178;
}

.comment {
  color: #6A9955;
}
</style>
