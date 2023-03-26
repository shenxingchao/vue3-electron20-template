<template>
    <el-switch v-model="useDarkMode" @change="handleChangeTheme" inline-prompt active-icon="Moon" inactive-icon="Sunny">
    </el-switch>
</template>

<script setup lang="ts" name="ToggleTheme">
import { reactive } from 'vue'
import { useDark, useStorage, useToggle } from '@vueuse/core'

//数据对象
let { useDarkMode } = $(reactive({
    useDarkMode: useStorage('vueuse-color-scheme', 'auto').value == 'dark'
}))

//方法
const isDark = useDark()

const toggleDark = useToggle(isDark)

const handleChangeTheme = (bool: boolean) => {
    toggleDark(bool)
    if (bool) {
        document.documentElement.style.cssText = ''
    } else {
        //读取缓存中的主题颜色
        const style = localStorage.getItem('style')
        document.documentElement.style.cssText = (style && style) as string
    }
}

//这里导出的属性/方法可以在父组件使用
defineExpose({})
</script>

<style></style>
