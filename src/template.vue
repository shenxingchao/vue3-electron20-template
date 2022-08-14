<template>
    <h1>
        测试数据{{ data.msg }}
        <input v-model="data.msg" type="text" />
    </h1>
    <h1>
        测试状态 {{ store.routeList.length + 1 }}
        <button @click="handleClick()">改变状态</button>
    </h1>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { ComponentInternalInstance, reactive } from 'vue'

import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router';


//渲染进程里打开子窗口
const { BrowserWindow } = require("@electron/remote")

let win = new BrowserWindow({ width: 500, height: 500 })

win.on('close', () => {
    win = null
})

//当前组件实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

//状态
const store = useStore()

//router
//路由
const router = useRouter()
const route = useRoute()

//数据对象
let data = reactive({
    msg: '测试数据',
})

//初始化钩子
onMounted(() => {
    data.msg = 'hello world'
})

//方法
const handleClick = () => {
    store.handleChangeRouteList(store.routeList.concat([1] as any))
}
</script>

<style>
</style>
