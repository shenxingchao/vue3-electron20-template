//主进程
const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  Tray
} = require('electron')

const path = require('path')

//移除安全策略警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

//环境变量
const isDevelopment = process.env.NODE_ENV == 'development'

//定义窗口加载的初始URL
const loadUrl = isDevelopment
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../dist/index.html')}`

//创建窗口方法
function createWindow() {
  const win = new BrowserWindow({
    width: 1040,
    height: 680,
    minWidth: 1040,
    minHeight: 680,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), //预加载脚本：在渲染器进程加载前加载,这个脚本的作用就是获取node版本号...
      nodeIntegration: true, //集成node
      contextIsolation: false,
      webSecurity: false
      // enableRemoteModule: true
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

  //注册托盘图标
  const tray = new Tray(
    path.join(
      __dirname,
      isDevelopment ? '../public/favicon.ico' : '../favicon.ico'
    )
  )
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      type: 'normal',
      click: () => {
        app.quit()
      }
    }
  ])
  tray.setToolTip('豆豆听歌')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    win.show()
  })

  //主进程监听渲染进程 关闭操作
  ipcMain.on('win-close', () => {
    win.hide()
  })

  //主进程监听渲染进程最大化
  ipcMain.on('win-max', () => {
    try {
      if (win?.isMaximized()) {
        win.unmaximize()
      } else {
        win?.maximize()
      }
    } catch (e) {}
  })

  //主进程监听渲染进程最小化
  ipcMain.on('win-min', () => {
    BrowserWindow.getFocusedWindow()?.minimize()
  })

  //渲染进程请求监听最大化状态 回复渲染进程
  ipcMain.on('listen-maximize', event => {
    // console.log(e)
    win.on('maximize', () => {
      event.reply('maximize-change', true)
    })
    win.on('unmaximize', () => {
      event.reply('maximize-change', false)
    })
  })
}

//当Electron 初始化完成 返回 Promise<void>
app.whenReady().then(() => {
  //创建窗口
  createWindow()

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
