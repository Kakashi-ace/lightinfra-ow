<template>
  <div class="register-page">
    <!-- 背景装饰：径向渐变圆形 -->
    <div class="bg-gradient-circle"></div>

    <!-- 导航栏（简化版） -->
    <header class="register-navbar">
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

    <!-- 注册表单卡片 -->
    <div class="form-card">
      <!-- 标题 -->
      <h1 class="form-title">注册</h1>

      <!-- 邮箱输入框 -->
      <div class="input-group">
        <input
          v-model="email"
          type="text"
          class="input-field"
          placeholder="请输入邮箱"
          @input="validateEmail"
        />
      </div>

      <!-- 验证码区域 -->
      <div class="code-group">
        <input
          v-model="code"
          type="text"
          class="input-field code-input"
          placeholder="邮箱验证码"
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

      <!-- 密码输入框 -->
      <div class="input-group password-group">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="input-field"
          placeholder="输入密码"
        />
        <button class="toggle-password" @click="showPassword = !showPassword">
          <svg v-if="showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

      <!-- 确认密码输入框 -->
      <div class="input-group password-group">
        <input
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="input-field"
          placeholder="再次输入密码"
        />
        <button class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
          <svg v-if="showConfirmPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

      <!-- 注册按钮 -->
      <button
        class="register-btn"
        :disabled="!canRegister"
        @click="handleRegister"
      >
        立即注册
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
          <a href="/privacy" class="link" @click.stop="$emit('privacy-policy')">隐私政策</a>
          和
          <a href="/terms" class="link" @click.stop="$emit('terms')">使用条款</a>
        </p>
      </div>

      <!-- 底部链接 -->
      <div class="bottom-link">
        <span @click="goToLogin">已有账号 直接登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Emits
const emit = defineEmits([
  'register',
  'send-code',
  'switch-to-login',
  'privacy-policy',
  'terms'
])

const router = useRouter()

// 表单数据
const email = ref('')
const code = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreed = ref(false)
const countDown = ref(0)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 邮箱格式验证
const isEmailValid = computed(() => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
})

// 是否可以发送验证码
const canSendCode = computed(() => {
  return email.value.length > 0 && isEmailValid.value && countDown.value === 0
})

// 是否可以注册
const canRegister = computed(() => {
  return (
    email.value.length > 0 &&
    isEmailValid.value &&
    code.value.length > 0 &&
    password.value.length >= 6 &&
    confirmPassword.value.length >= 6 &&
    password.value === confirmPassword.value &&
    agreed.value
  )
})

// 发送验证码
let timer = null
const handleSendCode = () => {
  if (!canSendCode.value) return
  countDown.value = 60
  emit('send-code', email.value)

  timer = setInterval(() => {
    countDown.value--
    if (countDown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 注册
const handleRegister = () => {
  if (!canRegister.value) return
  emit('register', {
    email: email.value,
    code: code.value,
    password: password.value
  })
}

// 跳转到登录页
const goToLogin = () => {
  router.push('/login')
}

// 邮箱输入验证（用于实时更新按钮状态）
const validateEmail = () => {
  // 简单的邮箱格式验证
}
</script>

<style scoped>
/* ========== 页面整体布局 ========== */
.register-page {
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
  left: calc(50% - 697px);
  top: 141px;
  background: radial-gradient(50% 50% at 50% 50%, #0073FF 0%, #131313 100%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

/* ========== 导航栏 ========== */
.register-navbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 calc((1440px - 1200px) / 2);
  z-index: 100;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

/* ========== 注册表单卡片 ========== */
.form-card {
  position: absolute;
  left: 453px;
  top: 166px;
  width: 534px;
  min-height: 589px;
  background: #161618;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;
}

/* 标题 */
.form-title {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
  margin: 0 0 30px 0;
  text-align: center;
}

/* 输入框 */
.input-group {
  width: 100%;
  margin-bottom: 15px;
  position: relative;
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

/* 密码输入框 */
.password-group .input-field {
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover svg {
  stroke: #FFFFFF;
}

/* 验证码区域 */
.code-group {
  width: 100%;
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
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

/* 注册按钮 */
.register-btn {
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

.register-btn:hover:not(:disabled) {
  background: #005bb5;
}

.register-btn:disabled {
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
  margin-bottom: 20px;
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
.bottom-link {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #D9D9D9;
  cursor: pointer;
  transition: color 0.2s ease;
  text-align: center;
}

.bottom-link:hover {
  color: #0073FF;
}
</style>
