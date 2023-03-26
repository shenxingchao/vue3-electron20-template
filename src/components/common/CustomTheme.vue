<template>
    <el-dialog class="custom-theme-dialog" v-model="store.dialog.showCustomTheme" title="" :width="340" top="68px"
        :show-close="false" :modal="false" center>
        <div class="custom-theme">
            <div v-for="(item, index) in colorList" :key="index" class="color-item" :style="{ 'background': item }"
                @click="handleChangeTheme(item)">
                <el-icon v-if="color == item" color="#ffffff" :size="30">
                    <Check />
                </el-icon>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts" name="CustomTheme">
import { onMounted, reactive } from 'vue'
import { useStore } from '@/store/index'
import { mix } from '@/utils/theme'

//状态
const store = useStore()

// 变量前缀
const pre = '--el-color-primary'
// 白色混合色
const mixWhite = '#ffffff'
// 黑色混合色
const mixBlack = '#000000'

//数据对象
let { color, colorList } = $(reactive({
    color: localStorage.getItem('primaryColor') || '#ec4141',
    colorList: [
        '#ec4141',
        '#FF5C8A',
        '#FF7A9E',
        '#717FF9',
        '#4791EB',
        '#39AFEA',
        '#2BB669',
        '#6ACC19',
        '#E2AB12',
        '#FF8F57',
        '#FD726D',
        '#FD544E',
    ],
}))

//初始化钩子
onMounted(() => {
})

//方法
//更改主题
const handleChangeTheme = (colorStr = color) => {
    const node = document.documentElement
    // 主色调
    node.style.setProperty(pre, colorStr)
    localStorage.setItem('primaryColor', colorStr)
    // 这里是覆盖原有颜色的核心代码
    for (let i = 1; i < 10; i += 1) {
        node.style.setProperty(
            `${pre}-light-${i}`,
            mix(colorStr, mixWhite, i * 0.1)
        )
    }
    for (let i = 1; i < 3; i += 1) {
        node.style.setProperty(
            `${pre}-dark-${i}`,
            mix(colorStr, mixBlack, i * 0.1)
        )
    }
    // 本地缓存style，样式持久化，你也可以存在后端
    localStorage.setItem('style', node.style.cssText)
    //变量覆盖
    color = colorStr
}

//这里导出的属性/方法可以在父组件使用
defineExpose({})
</script>

<style lang="scss">
.custom-theme-dialog {
    .el-dialog__header {
        padding: 0;
    }
}

.custom-theme {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-left: -$inline-margin;

    .color-item {
        width: 40px;
        height: 40px;
        border-radius: $border-radius;
        cursor: pointer;
        margin-left: $inline-margin;
        margin-top: $inline-margin;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
