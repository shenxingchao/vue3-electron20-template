<template>
    <status-bar></status-bar>
    <drawer></drawer>
    <router-view :key="route.fullPath" />
</template>
  
<script setup lang="ts" name="Main">
import Drawer from "@/components/layout/Drawer.vue"
import StatusBar from "@/components/layout/StatusBar.vue"
import { useStore } from "@/store/index"
import { useDark, useStorage, useToggle } from "@vueuse/core"
import { getCurrentInstance, onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

//当前组件实例
const { proxy } = getCurrentInstance() as any

//路由
const router = useRouter()
const route = useRoute()

//状态
const store = useStore()

//类型定义
type dataType = {}

//数据对象
let { }: dataType = $(reactive({}))

onMounted(() => {
    initTheme()
})

//方法
//初始化主题
const initTheme = () => {
    //设置主题模式
    if (useStorage("vueuse-color-scheme", "auto").value == "dark") {
        const isDark = useDark()
        const toggleDark = useToggle(isDark)
        toggleDark(true)
    } else {
        //读取缓存中的主题颜色
        const style = localStorage.getItem("style")
        document.documentElement.style.cssText = (style && style) as string
    }
}

</script>
<style lang="scss">
//全局背景色
html,
body {
    background: var(--el-bg-color-page);
}

#app {
    width: 100%;
    padding-top: 60px;
    height: calc(100vh - 60px);
    overflow: hidden;
    position: relative;
}
</style>
  