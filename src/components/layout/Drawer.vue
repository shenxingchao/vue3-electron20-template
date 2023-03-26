<template>
    <el-drawer class="drawer" v-model="store.setting.showDrawer" :with-header="false">
        <el-row class="version">
            当前版本:{{ packageJson.version }}
        </el-row>
        <el-row>
            <toggle-theme></toggle-theme>
        </el-row>
    </el-drawer>
</template>

<script setup lang="ts" name="Drawer">
import { onMounted, reactive } from 'vue'
import { useStore } from '@/store/index'
import packageJson from '@/../package.json'
import ToggleTheme from '@/components/common/ToggleTheme.vue'

//状态
const store = useStore()

//数据对象
let { } = $(reactive({
}))

//初始化钩子
onMounted(() => {
})

//方法
</script>
<style lang="scss">
.drawer {
    width: 200px;
    max-width: 200px;
    padding-top: 60px;
    overflow: auto;
}
</style>
<style lang="scss" scoped>
.version {
    font-size: 12px;
    color: var(--h3);
}
</style>