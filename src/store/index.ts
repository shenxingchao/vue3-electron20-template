import { defineStore } from 'pinia'

//定义store
export const useStore = defineStore('globalStore', {
  //全局状态维护
  state: () => ({
    routeList: [] //维护一个路由数组,用于判断是否可以返回或者前进
  }),
  //取状态基本不用
  getters: {},
  //动作
  actions: {
    //改变路由数组
    handleChangeRouteList(routeList: any) {
      this.routeList = routeList
    }
  }
})
