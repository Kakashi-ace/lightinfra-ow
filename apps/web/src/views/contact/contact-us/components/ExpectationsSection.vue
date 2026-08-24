<template>
  <section class="expectations-section">
    <div class="expectations-container">
      <div class="expectations-header">
        <h2 class="section-title">{{ t('contactPage.infoTitle') }}</h2>
        <p class="section-subtitle">{{ t('contactPage.infoSubtitle') }}</p>
      </div>
      <a-form
        ref="formRef"
        class="contact-form"
        :model="form"
        layout="vertical"
        :colon="false"
        @finish="handleSubmit"
      >
        <div class="form-row">
          <a-form-item
            class="form-field"
            :label="t('contactPage.formNameLabel')"
            name="name"
            :rules="[{ required: true, message: t('contactPage.formRequiredMessage') }]"
          >
            <a-input v-model:value="form.name" :placeholder="t('contactPage.formNamePlaceholder')" />
          </a-form-item>
          <a-form-item
            class="form-field"
            :label="t('contactPage.formCompanyLabel')"
            name="company"
            :rules="[{ required: true, message: t('contactPage.formRequiredMessage') }]"
          >
            <a-input v-model:value="form.company" :placeholder="t('contactPage.formCompanyPlaceholder')" />
          </a-form-item>
        </div>
        <div class="form-row">
          <a-form-item
            class="form-field"
            :label="t('contactPage.formEmailLabel')"
            name="email"
            :rules="[{ type: 'email', message: t('contactPage.formEmailInvalidMessage') }]"
          >
            <a-input v-model:value="form.email" :placeholder="t('contactPage.formEmailPlaceholder')" />
          </a-form-item>
          <a-form-item
            class="form-field"
            :label="t('contactPage.formPhoneLabel')"
            name="phone"
            :rules="[
              { required: true, message: t('contactPage.formRequiredMessage') },
              { pattern: /^1[3-9]\d{9}$/, message: t('contactPage.formPhoneInvalidMessage') }
            ]"
          >
            <a-input v-model:value="form.phone" :placeholder="t('contactPage.formPhonePlaceholder')" />
          </a-form-item>
        </div>
        <a-form-item
          class="form-field form-field-message"
          :label="t('contactPage.formMessageLabel')"
          name="message"
          :rules="[{ required: true, message: t('contactPage.formRequiredMessage') }]"
        >
          <a-textarea
            v-model:value="form.message"
            :placeholder="t('contactPage.formMessagePlaceholder')"
            :rows="4"
          />
        </a-form-item>
        <div class="form-actions">
          <span class="form-hint">{{ t('contactPage.formHint') }}</span>
          <button type="submit" class="submit-btn" :disabled="submitting">
            {{ submitting ? t('contactPage.formSubmitting') : t('contactPage.formSubmit') }}
          </button>
        </div>
      </a-form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import { submitContactForm } from '@/api/contact'
import { toApiError } from '@/utils/request'

const { t } = useI18n()

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = async () => {
  submitting.value = true
  try {
    await submitContactForm({ ...form })
    message.success(t('contactPage.formSuccessMessage'))
    formRef.value?.resetFields()
  } catch (err) {
    message.error(toApiError(err).message)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.expectations-section {
  width: 100%;
  padding: 60px 0 120px 0;
}

.expectations-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.expectations-header {
  width: 474px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-title {
  font-size: 40px;
  font-weight: 600;
  line-height: 52px;
  color: #121212;
  margin: 0;
  white-space: pre-line;
}

.section-subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #555555;
  margin: 0;
  white-space: pre-line;
}

.contact-form {
  width: 660px;
  flex-shrink: 0;
  padding: 40px;
  background: #FBFCFF;
  border-radius: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-field {
  flex: 1;
}

.form-field :deep(.ant-form-item-label) {
  padding-bottom: 12px;
}

.form-field :deep(.ant-form-item-label > label) {
  font-size: 14px;
  font-weight: 500;
  color: #121212;
  height: auto;
}

.form-field :deep(.ant-form-item-required::before) {
  color: #0073FF !important;
}

.form-field :deep(.ant-input) {
  border: none;
  border-bottom: 1px solid #BBBBBB;
  border-radius: 0;
  padding: 0 0 12px 0;
  background: transparent;
  box-shadow: none !important;
  font-size: 16px;
  color: #121212;
}

.form-field :deep(.ant-input::placeholder) {
  color: #BBBBBB;
}

.form-field :deep(.ant-input:hover),
.form-field :deep(.ant-input:focus) {
  border-color: #0073FF;
}

.form-field-message :deep(.ant-input) {
  resize: none;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 8px;
}

.form-hint {
  font-size: 12px;
  color: #999999;
  flex: 1;
}

.submit-btn {
  flex-shrink: 0;
  width: 174px;
  height: 59px;
  border-radius: 29.5px;
  border: 1px solid #121212;
  background: transparent;
  color: #121212;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.submit-btn:hover {
  background: #121212;
  color: #FFFFFF;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn:disabled:hover {
  background: transparent;
  color: #121212;
}
</style>
