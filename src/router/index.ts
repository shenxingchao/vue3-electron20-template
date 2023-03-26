import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useStore } from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  //主窗口
  //首页
  {
    path: '/',
    name: 'Main',
    redirect: '/Index',
    component: () => import('@/views/Main.vue'),
    children: [
      //首页
      {
        path: 'Index',
        name: 'Index',
        component: () => import('@/views/index/Index.vue')
      }
    ]
  }
]

const router = createRouter({
  // 必须是HASH，否则打包后路由无法加载，除非手动跳转
  history: createWebHashHistory(),
  routes
})

//路由前置钩子
router.beforeEach((to, from) => {
  //钩子里可以使用，外面使用需要传pinia 见https://blog.csdn.net/weixin_46054431/article/details/124769206
  const store = useStore()
  if (window.history.length !== 1) {
    if (window.history.state.position == 0) {
      //第一个，可以前进不能后退
      store.router.isBack = false
      store.router.isForward = true
    } else if (window.history.state.position == window.history.length - 1) {
      //最后一个，可以后退不能前进
      store.router.isBack = true
      store.router.isForward = false
    } else {
      //中间,可以前进也可以后退
      store.router.isBack = true
      store.router.isForward = true
    }
  } else {
    //不能前进，也不能后退
    store.router.isBack = false
    store.router.isForward = false
  }
})

export default router
