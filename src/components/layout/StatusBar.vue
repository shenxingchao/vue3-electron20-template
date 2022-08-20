<template>
    <div class="title-bar">
        <div class="title">
            <div class="logo" @click="router.replace('/')">
                <slot name="title">默认状态栏标题</slot>
            </div>
            <svg-icon icon-class="router_back" :class-name="store.router.isBack ? '' : 'icon-disabled'"
                @click="handleClickRouterBack()" />
            <svg-icon icon-class="router_forward" :class-name="store.router.isForward ? '' : 'icon-disabled'"
                @click="handleClickRouterForward()" />
        </div>
        <div class="tool-btn">
            <svg-icon icon-class="theme" @click="handleClickCustomTheme()" />
            <svg-icon icon-class="setting" @click="handleClickSetting()" />
            <svg-icon icon-class="mini" @click="handleClickToolBtn('minimize')" />
            <svg-icon :icon-class="max ? 'maxi_re' : 'maxi'" @click="handleClickToolBtn('maximize')" />
            <svg-icon icon-class="close" @click="handleClickToolBtn('winclose')" />
        </div>
        <div class="title-line"></div>
    </div>
    <!-- 主题弹窗 -->
    <custom-theme></custom-theme>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router';
import { useIpcRenderer } from '@vueuse/electron'

import CustomTheme from '@/components/common/CustomTheme.vue'

//组件配置 使用了插件
defineOptions({
    name: 'StatusBar',
})

//从渲染器进程到主进程的异步通信
const ipcRenderer = useIpcRenderer()

//状态
const store = useStore()

//router
//路由
const router = useRouter()
const route = useRoute()

//数据对象
let { max } = $(reactive({
    max: false,//是否是最大化状态  用于恢复按钮显示
}))

//初始化钩子
onMounted(() => {
    //监听最大化状态变化 去改变最大化或者是恢复按钮
    ipcRenderer.send('listen-maximize')
    ipcRenderer.on('maximize-change', (event: any, arg: any) => {
        max = arg
    })
})

//方法
//打开主题色设置
const handleClickCustomTheme = () => {
    store.handleChangeCustomThemeDialog()
}

//打开抽屉设置
const handleClickSetting = () => {
    store.handleChangeDrawer()
}

//窗口操作
const handleClickToolBtn = (type: string) => {
    switch (type) {
        // 最小化
        case 'minimize':
            ipcRenderer.send('win-min', '')
            break
        // 最大化
        case 'maximize':
            ipcRenderer.send('win-max', '')
            break
        // 关闭
        case 'winclose':
            ipcRenderer.send('win-close', '')
            break
        default:
            break
    }
}

//点击路由返回按钮
const handleClickRouterBack = () => {
    if (!store.router.isBack) {
        return false
    }
    window.history.back()
}

//点击路由前进按钮
const handleClickRouterForward = () => {
    if (!store.router.isForward) {
        return false
    }
    window.history.forward()
}

//这里导出的属性/方法可以在父组件使用
defineExpose({})
</script>

<style lang="scss" scoped>
.title-bar {
    width: calc(100% - 40px);
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 99999999;
    -webkit-app-region: drag;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: #ffffff;
    font-size: 14px;
    background: $theme;

    .title {
        flex: 1;
        height: 60px;
        display: flex;
        align-items: center;

        .logo {
            color: #ffffff;
            -webkit-app-region: no-drag;
            cursor: pointer;
        }

        .svg-icon {
            -webkit-app-region: no-drag;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            padding: 8px;
            fill: #ffffff;
            cursor: pointer;
            background: #00000010;

            &:hover {
                background: #00000080;
            }

            &:active {
                background: $theme-dark;
            }

            &:nth-of-type(1) {
                margin-left: 100px;
            }

            &:nth-of-type(2) {
                margin-left: $inline-margin;
            }
        }

        .icon-disabled {
            fill: #ffffff40;
            cursor: not-allowed;

            &:last-child {
                fill: #ffffff25;
            }

            &:hover {
                background: #00000010;
            }

            &:active {
                background: #00000010;
            }
        }
    }

    .tool-btn {
        width: 200px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .svg-icon {
            -webkit-app-region: no-drag;
            width: 14px;
            height: 14px;
            padding: 13px;
            fill: #ffffff;
            cursor: pointer;

            &:hover {
                background: $theme-light;
            }

            &:active {
                background: $theme-dark;
            }

            &:first-child {
                width: 18px;
                height: 18px;
                padding: 11px;
            }

            &:nth-child(2) {
                width: 18px;
                height: 18px;
                padding: 11px;
            }
        }
    }

    .title-line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        -webkit-app-region: no-drag;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        -webkit-app-region: no-drag;
    }
}
</style>
