import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// css 样式重置
import 'normalize.css/normalize.css'
//引入element plus
import ElementPlus from 'element-plus'
// index scss
import '@/assets/styles/index.scss'

const app = createApp(App)

//使用状态
const pinia = createPinia()
app.use(pinia)

//使用路由
app.use(router)

//使用element plus
app.use(ElementPlus)

app.mount('#app')
