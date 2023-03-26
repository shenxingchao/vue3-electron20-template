//login 预加载脚本
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', {
  //暴露给渲染进程调用的方法 他是挂载到window对象上的window.ipcRenderer.xxx 可以写任何方法 这里只提供一个转发服务
  /**
   * 异步发送事件并同步等待结果 当需要返回结果时使用等待结果会阻塞渲染进程
   * @param {string} channel 转发的事件名称
   * @param  {...any} args 参数只能是字符串,可以多个
   * @returns
   */
  invoke: (channel: string, ...args: any) => {
    return ipcRenderer.invoke(channel, args)
  },
  /**
   * 异步发送主进程 没有返回结果 不需要返回结果时使用 可以用invoke代替 基本用不到
   * @param {string} channel 转发的事件名称
   * @param  {...any} args 参数只能是字符串,可以多个
   */
  send: (channel: string, ...args: any) => {
    ipcRenderer.send(channel, args)
  },
  /**
   * 同步发送主进程 没有返回结果 不需要返回结果时使用 会阻塞渲染进程 基本用不到
   * @param {string} channel 转发的事件名称
   * @param  {...any} args 参数只能是字符串,可以多个
   */
  sendSync: (channel: string, ...args: any) => {
    ipcRenderer.sendSync(channel, args)
  },
  /**
   * 异步监听主进程消息(event.reply(...)) 配合invoke/send使用
   * @param {string} channel 转发的事件名称
   * @param {*} listener
   */
  on: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
  ) => {
    ipcRenderer.on(channel, (event: Electron.IpcRendererEvent, ...args: any) =>
      listener(event, ...args)
    )
  },
  /**
   * 异步监听一次主进程消息(event.reply(...)) 配合invoke/send使用
   * @param {string} channel 转发的事件名称
   * @param {*} listener
   */
  once: (
    channel: string,
    listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
  ) => {
    ipcRenderer.once(
      channel,
      (event: Electron.IpcRendererEvent, ...args: any) =>
        listener(event, ...args)
    )
  }
})
