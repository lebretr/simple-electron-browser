const { app, BaseWindow, WebContentsView } = require('electron');

const createWindow = () => {
    const win = new BaseWindow({ width: 800, height: 400 /*, fullscreen :true*/});
    win.maximize();

    const winBounds=win.getBounds();

    const view1 = new WebContentsView();
    win.contentView.addChildView(view1);
    view1.webContents.loadURL('http://google.com');
    view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });

    win.on('maximize',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });
    });
    win.on('unmaximize',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });
    });
    win.on('restore',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });
    });
    win.on('resize',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });
    });
    win.on('enter-full-screen',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });
    });
    win.on('leave-full-screenn',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-20, height: winBounds.height-20 });
    });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})