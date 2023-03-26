import { removeToken, setToken } from '@/utils/auth'
import { defineStore } from 'pinia'

//定义store
export const useStore = defineStore('globalStore', {
  share: {
    //忽略共享选项
    omit: ['router']
  },
  persist: {
    key: 'store',
    storage: localStorage,
    //需要持久化选项
    paths: ['router']
  },
  //全局状态维护
  state: () => ({
    router: {
      isBack: false, //是否可以返回
      isForward: false //是否可以前进
    },
    setting: {
      showDrawer: false //显示抽屉
    }, //系统设置
    dialog: {
      showCustomTheme: false //显示主题色弹窗
    },
    token: '' //api token
  }),
  //取状态基本不用
  getters: {},
  //动作
  actions: {
    //切换显示抽屉
    handleChangeDrawer() {
      this.setting.showDrawer = !this.setting.showDrawer
    },
    //切换显示主题色弹窗
    handleChangeCustomThemeDialog() {
      this.dialog.showCustomTheme = !this.dialog.showCustomTheme
    },
    //设置token
    handleChangeToken(token: string) {
      this.token = token
      setToken(token)
    },
    //退出登录
    handleLogout() {
      //删除token
      removeToken()
      this.token = ''
    }
  }
})
