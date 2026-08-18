<template>
  <!-- 新闻中心两个列表页共用的顶部：蓝色渐变底 + 子导航 + 头条 -->
  <div class="hero-bg">
    <NewsSubNav @search="emit('search', $event)" />
    <NewsHero :featured="featured" @start="emit('start')" />
  </div>
</template>

<script setup>
import NewsSubNav from './NewsSubNav.vue'
import NewsHero from './NewsHero.vue'

defineProps({
  featured: {
    type: Object,
    default: () => ({ tag: '', title: '', date: '' })
  }
})

const emit = defineEmits(['search', 'start'])
</script>

<style scoped>
.hero-bg {
  width: 100%;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(102,102,102,0) 100%),
              linear-gradient(180deg, #0073FF 0%, #FFFFFF 100%);
  padding-top: 80px;
}
</style>
