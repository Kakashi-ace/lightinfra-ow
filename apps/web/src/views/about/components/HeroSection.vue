<template>
  <section class="hero-section">
    <div class="hero-bg"></div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/media/about-hero-background.png') center / cover no-repeat;
}
</style>
