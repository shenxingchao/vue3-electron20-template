<template>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance, onMounted, reactive } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router';

//组件配置 使用了插件
defineOptions({
    name: 'Index',
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
    msg: '',
}))


//初始化钩子
onMounted(() => {
})
</script>

<style>
</style>
