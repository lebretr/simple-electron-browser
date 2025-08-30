const { app, BaseWindow, WebContentsView } = require('electron');

app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BaseWindow({ 
        width: 800, 
        height: 400, 
        autoHideMenuBar: true 
        /*, fullscreen :true*/
    });
    win.maximize();

    const winBounds=win.getBounds();

    const view1 = new WebContentsView();
    win.contentView.addChildView(view1);
    view1.webContents.loadURL('http://192.168.1.99:5000');
    view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });

    win.on('maximize',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });
    });
    win.on('unmaximize',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });
    });
    win.on('restore',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });
    });
    win.on('resize',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });
    });
    win.on('enter-full-screen',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });
    });
    win.on('leave-full-screenn',() => {
        const winBounds=win.getBounds();
        view1.setBounds({ x: 0, y: 0, width: winBounds.width-5, height: winBounds.height-5 });
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
