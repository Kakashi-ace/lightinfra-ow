<template>
  <div class="login-page">
    <!-- 背景装饰：径向渐变圆形 -->
    <div class="bg-gradient-circle"></div>

    <!-- 导航栏（简化版） -->
    <header class="login-navbar">
      <a href="/" class="navbar-logo">
        <svg width="112" height="37" viewBox="0 0 112 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="6,0 28,0 28,26" fill="url(#navGrad)" />
          <polygon points="0,17 22,17 22,37" fill="url(#navGrad)" />
          <rect x="42" y="4" width="4" height="30" fill="white"/>
          <rect x="52" y="12" width="4" height="22" fill="white"/>
          <rect x="62" y="8" width="4" height="26" fill="white"/>
          <rect x="72" y="15" width="4" height="18" fill="white"/>
          <rect x="82" y="6" width="4" height="28" fill="white"/>
          <rect x="92" y="11" width="4" height="23" fill="white"/>
          <defs>
            <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="white" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="white" stop-opacity="0.3"/>
            </linearGradient>
          </defs>
        </svg>
      </a>
    </header>

    <!-- 左侧宣传语 -->
    <div class="promo-text">
      <p><span class="highlight">LightInfra，</span><br/>做最专业的<br/>光学AI服务商</p>
    </div>

    <!-- 左侧装饰卡片 -->
    <div class="decorative-cards">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="deco-card"
        :class="`deco-card-${index + 1}`"
        :style="card.style"
      >
        <div v-if="card.hasImage" class="card-image-placeholder"></div>
      </div>
    </div>

    <!-- 右侧表单卡片 -->
    <div class="form-card">
      <!-- 欢迎标题 -->
      <h1 class="welcome-title">欢迎来到 LightInfra</h1>

      <!-- 登录方式切换 -->
      <div class="tab-switch">
        <button
          class="tab-btn"
          :class="{ 'tab-active': activeTab === 'phone' }"
          @click="activeTab = 'phone'"
        >
          手机号登录
        </button>
        <button
          class="tab-btn"
          :class="{ 'tab-active': activeTab === 'account' }"
          @click="activeTab = 'account'"
        >
          账号登录
        </button>
      </div>

      <!-- 手机号输入框 -->
      <div class="input-group">
        <input
          v-model="phone"
          type="text"
          class="input-field"
          placeholder="请输入手机号"
          maxlength="11"
        />
      </div>

      <!-- 验证码区域 -->
      <div class="code-group">
        <input
          v-model="code"
          type="text"
          class="input-field code-input"
          placeholder="请输入验证码"
          maxlength="6"
        />
        <button
          class="code-btn"
          :disabled="!canSendCode"
          @click="handleSendCode"
        >
          {{ countDown > 0 ? `${countDown}s` : '获取验证码' }}
        </button>
      </div>

      <!-- 登录按钮 -->
      <button
        class="login-btn"
        :disabled="!canLogin"
        @click="handleLogin"
      >
        登录
      </button>

      <!-- 协议勾选 -->
      <div class="agreement-row" @click="agreed = !agreed">
        <div class="checkbox" :class="{ 'checkbox-checked': agreed }">
          <svg v-if="agreed" width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="agreement-text">
          我已阅读并同意
          <a href="/privacy" class="link" @click.stop>隐私政策</a>
          和
          <a href="/terms" class="link" @click.stop>使用条款</a>
        </p>
      </div>

      <!-- 底部链接 -->
      <div class="bottom-links">
        <a href="/forgot" class="bottom-link" @click.prevent="$emit('forgot-password')">忘记密码</a>
        <span class="bottom-link" @click="goToRegister">注册账号</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

// Props & Emits
const props = defineProps({
  defaultTab: {
    type: String,
    default: 'phone'
  }
})

const emit = defineEmits([
  'login',
  'send-code',
  'forgot-password',
  'register',
  'update:tab'
])

const router = useRouter()

// Tab 状态
const activeTab = ref(props.defaultTab)
watch(activeTab, (val) => {
  emit('update:tab', val)
})

// 输入状态
const phone = ref('')
const code = ref('')
const agreed = ref(false)
const countDown = ref(0)

// 左侧装饰卡片数据
const cards = [
  { style: 'left: -212px; top: 396px; z-index: 1;', hasImage: false },
  { style: 'left: 141px; top: 449px; z-index: 2;', hasImage: true },
  { style: 'left: 188px; top: 319px; z-index: 3;', hasImage: true },
  { style: 'left: 471px; top: 372px; z-index: 4;', hasImage: false }
]

// 计算：是否可以发送验证码
const canSendCode = computed(() => {
  return phone.value.length === 11 && /^1[3-9]\d{9}$/.test(phone.value) && countDown.value === 0
})

// 计算：是否可以登录
const canLogin = computed(() => {
  return phone.value.length > 0 && code.value.length > 0 && agreed.value
})

// 发送验证码
let timer = null
const handleSendCode = () => {
  if (!canSendCode.value) return
  countDown.value = 60
  emit('send-code', phone.value)

  timer = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 登录
const handleLogin = () => {
  if (!canLogin.value) return
  emit('login', {
    phone: phone.value,
    code: code.value,
    loginType: activeTab.value
  })
}

// 跳转到注册页
const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
/* ========== 页面整体布局 ========== */
.login-page {
  width: 1440px;
  height: 900px;
  margin: 0 auto;
  background: #121212;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 背景装饰：径向渐变圆形 */
.bg-gradient-circle {
  position: absolute;
  width: 1394px;
  height: 1394px;
  left: 50%;
  top: 141px;
  transform: translateX(-50%);
  background: radial-gradient(50% 50% at 50% 50%, #0073FF 0%, #131313 100%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

/* ========== 导航栏 ========== */
.login-navbar {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  z-index: 100;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

/* ========== 左侧宣传语 ========== */
.promo-text {
  position: absolute;
  left: 40px;
  top: 280px;
  z-index: 10;
  max-width: 380px;
}

.promo-text p {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.4;
  color: #FFFFFF;
  margin: 0;
  white-space: pre-line;
}

.promo-text .highlight {
  color: #0073FF;
  font-weight: 700;
}

/* ========== 左侧装饰卡片 ========== */
.decorative-cards {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.deco-card {
  position: absolute;
  border-radius: 30px;
  transform: matrix(0.87, 0.5, -0.87, 0.5, 0, 0);
}

.deco-card-1 {
  width: 542px;
  height: 310px;
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%);
}

.deco-card-2 {
  width: 542px;
  height: 310px;
  background: #2a2a2a;
}

.deco-card-3 {
  width: 387px;
  height: 208px;
  background: #2a2a2a;
}

.deco-card-4 {
  width: 227px;
  height: 130px;
  background: linear-gradient(180deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%);
}

.card-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 30px;
}

/* ========== 右侧表单卡片 ========== */
.form-card {
  position: absolute;
  right: calc((1440px - 1200px) / 2 + (1200px - 534px) / 2);
  top: 50%;
  transform: translateY(-50%);
  width: 534px;
  min-height: 568px;
  background: #161618;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;
}

/* 欢迎标题 */
.welcome-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  margin: 0 0 30px 0;
  text-align: center;
}

/* Tab 切换 */
.tab-switch {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.tab-btn {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  background: transparent;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: background 0.2s ease;
}

.tab-btn.tab-active {
  color: #0073FF;
  font-weight: 600;
}

.tab-btn.tab-active::after {
  background: #0073FF;
}

.tab-btn:hover:not(.tab-active) {
  color: #FFFFFF;
}

/* 输入框 */
.input-group {
  width: 100%;
  margin-bottom: 15px;
}

.code-group {
  width: 100%;
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
}

.input-field {
  width: 100%;
  height: 56px;
  background: #161618;
  border: 1px solid #323232;
  border-radius: 10px;
  padding: 0 20px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
  transition: border-color 0.2s ease;
  outline: none;
}

.input-field::placeholder {
  color: #BBBBBB;
}

.input-field:focus {
  border-color: #0073FF;
}

.code-input {
  flex: 1;
}

.code-btn {
  width: 157px;
  height: 56px;
  background: #232227;
  border: 1px solid #323232;
  border-radius: 10px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #BBBBBB;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.code-btn:hover:not(:disabled) {
  border-color: #0073FF;
  color: #FFFFFF;
}

.code-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  height: 56px;
  background: #0073FF;
  border: none;
  border-radius: 10px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 22px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-bottom: 20px;
}

.login-btn:hover:not(:disabled) {
  background: #005bb5;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 协议勾选 */
.agreement-row {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 24px;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 2px;
}

.checkbox-checked {
  background: #0073FF;
  border-color: #0073FF;
}

.agreement-text {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #D9D9D9;
  margin: 0;
  line-height: 1.4;
}

.link {
  color: #0073FF;
  text-decoration: none;
  transition: text-decoration 0.2s ease;
}

.link:hover {
  text-decoration: underline;
}

/* 底部链接 */
.bottom-links {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.bottom-link {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #D9D9D9;
  text-decoration: none;
  transition: color 0.2s ease;
}

.bottom-link:hover {
  color: #0073FF;
}
</style>
