<template>
  <div class="recruit-view">
    <ContactPageRecruit @apply="handleApply" />
  </div>
</template>

<script setup>
import ContactPageRecruit from '../components/ContactPageRecruit.vue'

const handleApply = (position) => {
  console.log('申请职位:', position)
}
</script>

<style scoped>
.recruit-view {
  width: 100%;
  min-height: 100vh;
  background: #FFFFFF;
}
</style>
