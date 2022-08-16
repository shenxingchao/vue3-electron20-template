<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

//属性接口定义方式
export interface Props {
  iconClass: string
  className?: string
}

//组件配置 使用了插件
defineOptions({
  name: 'SvgIcon',
})

//定义属性，这样可以使用默认值
const props = withDefaults(defineProps<Props>(), {
  iconClass: '',
  className: ''
})

//数据对象
const { isExternal, iconName, svgClass, styleExternalIcon } = $(reactive({
  isExternal: computed(() => /^(https?:|mailto:|tel:)/.test(props.iconClass)),
  iconName: computed(() => `#icon-${props.iconClass}`),
  svgClass: computed(() => {
    if (props.className) {
      return 'svg-icon ' + props.className
    } else {
      return 'svg-icon'
    }
  }),
  styleExternalIcon: computed(() => {
    return {
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
    }
  }),
}))
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
