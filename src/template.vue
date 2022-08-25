<template>
    <h1>
        测试数据{{ msg }}
        <input v-model="msg" type="text" />
    </h1>
    <h1>
        <!-- 使用svg -->
        <svg-icon icon-class="mini" />
        <!-- 使用el-icon -->
        <el-icon>
            <alarm-clock />
        </el-icon>
    </h1>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router';

//属性接口定义方式
export interface Props {
    propValue?: string
}

//组件配置 使用了插件
defineOptions({
    name: 'Template',
})

//定义属性，这样可以使用默认值
const props = withDefaults(defineProps<Props>(), {
    propValue: '',
})

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
let { msg } = $(reactive({
    msg: '测试数据',
}))

//初始化钩子
onMounted(() => {
    msg = 'hello world'
})

//方法

//这里导出的属性/方法可以在父组件使用
defineExpose({})
</script>

<style lang="scss" scoped>
</style>
