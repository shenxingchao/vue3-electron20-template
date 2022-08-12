//主进程
const { app, BrowserWindow } = require("electron");
const path = require("path");
const loadUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(loadUrl);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
