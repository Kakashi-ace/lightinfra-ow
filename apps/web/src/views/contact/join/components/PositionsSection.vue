<template>
  <section class="positions-section">
    <div class="positions-container">
      <div class="positions-grid">
        <div
          v-for="position in positions"
          :key="position.id"
          class="position-card"
          @click="emit('apply', position)"
        >
          <h3 class="position-name">{{ position.name }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  positions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['apply'])
</script>

<style scoped>
.positions-section {
  width: 100%;
  padding: 60px 0;
}

.positions-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.positions-grid {
  display: flex;
  gap: 25px;
  justify-content: center;
}

.position-card {
  width: 282px;
  height: 120px;
  background: #FBFCFF;
  border: 1px solid #D1EAFF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.position-card:hover {
  border-color: #0073FF;
}

.position-name {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #121212;
  margin: 0;
  text-align: center;
}
</style>
