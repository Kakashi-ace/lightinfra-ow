import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { Dropdown, Menu, Form, Input } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(Dropdown)
app.use(Menu)
app.use(Form)
app.use(Input)
app.mount('#app')
