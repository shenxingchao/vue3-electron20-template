import SvgIcon from './SvgIcon.vue'

const componentPlugin = {
  install: function (app: any, options: any) {
    //注册svg组件
    app.component(SvgIcon.name, SvgIcon)
  }
}
export default componentPlugin
