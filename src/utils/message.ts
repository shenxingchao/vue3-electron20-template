import { ElMessage } from "element-plus"

let messageInstane: any = null

export const $_message = (params: {
  message?: string
  type?: any
  duration?: number
  offset?: number
  onClose?: () => void
}) => {
  //关闭所有弹窗
  if (messageInstane) {
    messageInstane.close()
  }
  if (!params.message) {
    params.message = ""
  }
  if (!params.type) {
    params.type = "success"
  }
  if (!params.duration) {
    params.duration = 1000
    if (params.type == "error") {
      params.duration = 3000
    }
  }
  if (!params.offset) {
    params.offset = 68
  }
  if (!params.type) {
    params.type = "success"
  }
  if (!params.onClose) {
    params.onClose = () => {}
  }
  messageInstane = ElMessage({
    message: params.message,
    type: params.type,
    duration: params.duration,
    offset: params.offset,
    onClose: function () {
      if (params.onClose) params.onClose()
    },
  })
}
