import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { PiniaSharedState } from 'pinia-shared-state'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// css 样式重置
import 'normalize.css/normalize.css'
//引入element plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// index scss
import '@/assets/styles/index.scss'
//引入svg
import SvgPlugin from '@/components/common/SvgIcon'
//引入全局组件：elIcon
import componentInstall from '@/plugins/componentInstall'
import { $_message } from './utils/message'

const app = createApp(App)

//使用状态
const pinia = createPinia()
//持久化状态
pinia.use(piniaPluginPersistedstate)
//多窗口共享状态
pinia.use(
  PiniaSharedState({
    enable: true,
    initialize: true,
    type: 'localstorage' //"native",
  })
)
app.use(pinia)
//使用路由
app.use(router)
//使用element plus
app.use(ElementPlus, {
  locale: zhCn
})
//使用svg
app.use(SvgPlugin, {
  imports: []
})
//使用全局组件
app.use(componentInstall)

//挂载全局方法
//弹窗
app.config.globalProperties.$_message = $_message

app.mount('#app')
