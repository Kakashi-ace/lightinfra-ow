<template>
  <section class="hero-section">
    <div class="hero-bg">
      <div class="hero-decoration">
        <div class="deco-circle deco-circle-1"></div>
        <div class="deco-circle deco-circle-2"></div>
        <div class="deco-circle deco-circle-3"></div>
      </div>
    </div>
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
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
}

.deco-circle-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -100px;
}

.deco-circle-2 {
  width: 400px;
  height: 400px;
  top: -100px;
  right: 100px;
}

.deco-circle-3 {
  width: 200px;
  height: 200px;
  top: 0;
  right: 200px;
}
</style>
