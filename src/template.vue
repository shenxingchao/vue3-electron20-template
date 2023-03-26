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
import { useStore } from "@/store/index"
import { getCurrentInstance, onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"

//属性接口定义方式
export interface Props {
    propValue?: string
}

//定义属性，这样可以使用默认值
const props = withDefaults(defineProps<Props>(), {
    propValue: "",
})

//当前组件实例
const { proxy } = getCurrentInstance() as any

//状态
const store = useStore()

//router
//路由
const router = useRouter()
const route = useRoute()

//类型定义
type dataType = {
    msg: string
}

//数据对象
let { msg }: dataType = $(
    reactive({
        msg: "测试数据",
    })
)

//初始化钩子
onMounted(() => {
    msg = "hello world"
})

//方法

//这里导出的属性/方法可以在父组件使用
defineExpose({})
</script>
  
<style lang="scss" scoped></style>
  