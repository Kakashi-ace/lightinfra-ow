<template>
  <div class="app-layout" :style="{ background: pageTheme === 'light' ? '#FFFFFF' : '#121212' }">
    <!-- 顶部悬浮导航栏 -->
    <AppNavbar :current-route="currentRoute" :theme="pageTheme" />
    <!-- 内容区：各页面自身渲染 hero/内容 -->
    <main class="layout-main">
      <router-view />
    </main>
    <!-- 全局页脚 -->
    <AppFooter :theme="pageTheme" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { resolvePageTheme } from '@/router'

const route = useRoute()

// 将当前路由路径传给导航栏，用于高亮「产品」等导航项
const currentRoute = computed(() => route.path)

// 页面主题：与 router/index.ts 的 title 继承规则一致，取匹配路由中最深一层定义了 theme 的 meta
const pageTheme = computed(() => resolvePageTheme(route))
</script>

<style scoped>
.app-layout {
  width: 100%;
  min-height: 100vh;
}

.layout-main {
  width: 100%;
}
</style>
