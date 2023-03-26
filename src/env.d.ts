declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

//定义preload里的函数类型
declare interface Window {
  ipcRenderer: {
    invoke: (channel: string, ...args: any) => Promise<any>
    send: (channel: string, ...args: any) => void
    sendSync: (channel: string, ...args: any) => any
    on: (
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
    ) => Electron.IpcRenderer
    once: (
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...arg: any) => void
    ) => Electron.IpcRenderer
  }
}
