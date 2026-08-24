import request from '@/utils/request'

/** 联系我们表单提交（Strapi contact-submission，public 角色仅开放 create）*/
export interface ContactSubmissionPayload {
  name: string
  company: string
  email: string
  phone: string
  message: string
}

export async function submitContactForm(payload: ContactSubmissionPayload): Promise<void> {
  await request.post('/contact-submissions', { data: payload })
}
