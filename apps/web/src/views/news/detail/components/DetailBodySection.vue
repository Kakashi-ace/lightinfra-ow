<template>
  <main class="main-content">
    <div class="section-body">
      <p
        v-for="(para, index) in paragraphs"
        :key="'p-' + index"
        class="paragraph"
      >
        {{ para }}
      </p>
    </div>
  </main>
</template>

<script setup>
defineProps({
  paragraphs: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.main-content {
  width: 1200px;
  margin: 0 auto;
  padding: 0 120px 80px;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 60px;
}

.paragraph {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0,0,0,0.9);
  margin: 0;
  text-align: justify;
}
</style>
