const { app, BaseWindow, WebContentsView } = require('electron');

app.disableHardwareAcceleration();

const createWindow = () => {
  const widthOffsetView1 = 15
    , heightOffsetView1 = 5
    , win = new BaseWindow({
      fullscreen: true
      , width: 1200
      , height: 720
      , autoHideMenuBar: true
    })
    ;

  win.maximize();

  const view1 = new WebContentsView();

  view1.updateSizeView = function updateSizeView () {
    const winBounds = win.getBounds();
    view1.setBounds({
      x: 0
      , y: 0
      , width: winBounds.width - (win.fullScreen ? 0 : widthOffsetView1)
      , height: winBounds.height - (win.fullScreen ? 0 : heightOffsetView1)
    });
  };

  win.contentView.addChildView(view1);
  view1.webContents.loadURL('http://www.google.com');
  view1.updateSizeView();

  win.on('restore', () => {
    view1.updateSizeView();
  });
  win.on('resize', () => {
    view1.updateSizeView();
  });
  win.on('enter-full-screen', () => {
    view1.updateSizeView();
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
