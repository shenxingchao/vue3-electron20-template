//主进程
const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
//定义窗口加载的初始URL
const loadUrl =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../dist/index.html')}`

//创建窗口方法
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), //预加载脚本：在渲染器进程加载前加载,这个脚本的作用就是获取node版本号...
      nodeIntegration: true, //集成node
      contextIsolation: false,
      enableRemoteModule: true
    },
    show: false //解决第一次显示时画面闪烁问题
  })

  //初始化remote模块
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(win.webContents)

  //加载首页
  win.loadURL(loadUrl)

  //在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁
  win.once('ready-to-show', () => {
    win.show()
  })

  //注册开发者工具快捷键
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    return false
  })
  globalShortcut.register('CommandOrControl+Shift+x', function () {
    win.webContents.openDevTools()
  })

  return win
}

//当Electron 初始化完成 返回 Promise<void>
app.whenReady().then(() => {
  //创建窗口
  const win = createWindow()

  //macOS 兼容
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

//当所有的窗口都被关闭时触发
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
