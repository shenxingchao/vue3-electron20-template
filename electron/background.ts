//主进程
import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  Tray
} from 'electron'

const path = require('path')

//移除安全策略警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

//环境变量
const isDevelopment = process.env.NODE_ENV == 'development'

//定义窗口加载的初始URL
const loadUrl = isDevelopment
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../index.html')}`

//主界面
let mainWin: BrowserWindow | null = null

//创建窗口方法
function createWindow() {
  mainWin = new BrowserWindow({
    // parent: win,//不能作为子窗口，否则会一起最小化
    width: 1040,
    height: 680,
    minWidth: 1040,
    minHeight: 680,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), //预加载脚本：在渲染器进程加载前加载,这个脚本的作用就是获取node版本号...
      nodeIntegration: false, //渲染进程不使用node
      contextIsolation: true, //使用preload则该项必须为true
      webSecurity: false, //否则会跨域
      sandbox: false //关闭沙盒环境才能在preload.js使用第三方module
    },
    show: false, //解决第一次显示时画面闪烁问题
    resizable: true
  })

  //加载首页
  mainWin.loadURL(loadUrl + '#/')

  //在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁
  mainWin.once('ready-to-show', () => {
    mainWin!.show()
    //聚焦 否则不显示在顶层
    mainWin!.focus()
  })

  //关闭css拖拽引起的右键菜单
  mainWin.hookWindowMessage(278, function (e) {
    mainWin!.setEnabled(false) //窗口禁用
    setTimeout(() => {
      mainWin!.setEnabled(true)
    }, 100) //延时太快会立刻启动，太慢会妨碍窗口其他操作，可自行测试最佳时间
    return true
  })

  //注册开发者工具快捷键
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    return false
  })
  globalShortcut.register('CTRL+F12', function () {
    mainWin!.webContents.openDevTools()
  })

  //注册托盘图标
  const tray = new Tray(path.join(__dirname, '../favicon.ico'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      type: 'normal',
      click: () => {
        app.quit()
      }
    }
  ])
  tray.setToolTip('应用标题')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWin!.show()
  })

  //关闭主界面窗口按钮
  ipcMain.handle('mainWin-close', async (event, args) => {
    mainWin!.hide()
  })

  //主进程监听渲染进程最大化
  ipcMain.handle('mainWin-max', async (event, args) => {
    try {
      if (mainWin?.isMaximized()) {
        mainWin.unmaximize()
      } else {
        mainWin?.maximize()
      }
    } catch (e) {}
  })

  //主进程监听渲染进程最小化
  ipcMain.handle('mainWin-min', async (event, args) => {
    BrowserWindow.getFocusedWindow()?.minimize()
  })

  //渲染进程请求监听最大化状态 回复渲染进程
  ipcMain.on('listen-maximize', async event => {
    if (mainWin) {
      mainWin.on('maximize', () => {
        event.reply('maximize-change', true)
      })
      mainWin.on('unmaximize', () => {
        event.reply('maximize-change', false)
      })
    }
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
