const { app, BaseWindow, WebContentsView } = require('electron');

console.log(process.platform);

app.disableHardwareAcceleration();
app.commandLine.appendSwitch('password-store', 'basic');

const createWindow = function () {
  const widthOffsetView1 = (process.platform === 'win32' ? 15 : 0)
    , heightOffsetView1 = (process.platform === 'win32' ? 5 : 0)
    , win = new BaseWindow({
      width: 1200
      , height: 720
      , fullscreen: true
      , autoHideMenuBar: true
    })
    ;

  if (!win.fullScreen) {
    win.maximize();
  }

  const view1 = new WebContentsView();

  view1.updateSizeView = function updateSizeView (win) {
    const winBounds = win.getBounds();
    this.setBounds({
      x: 0
      , y: 0
      , width: winBounds.width - (win.fullScreen ? 0 : widthOffsetView1)
      , height: winBounds.height - (win.fullScreen ? 0 : heightOffsetView1)
    });
  };

  win.contentView.addChildView(view1);

  setTimeout(function () {
    view1.webContents.loadURL('http://www.google.com');
    view1.updateSizeView(win);
  }, 500);

  win.on('restore', () => {
    win.contentView.children[0].updateSizeView(win);
  });
  win.on('resize', () => {
    win.contentView.children[0].updateSizeView(win);
  });
  win.on('enter-full-screen', () => {
    win.contentView.children[0].updateSizeView(win);
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BaseWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
