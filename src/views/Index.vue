<template>
    主页
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import { ComponentInternalInstance, reactive } from 'vue'

import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'

//当前组件实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance

//状态
const store = useStore()

//路由
const router = useRouter()
const route = useRoute()

//数据对象
let data = reactive({
})

//初始化钩子
onMounted(() => {
})
</script>

<style>
</style>
