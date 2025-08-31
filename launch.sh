#!/bin/bash

temp=$( realpath "$0"  )
p=$(dirname "$temp")
cd "$p"
#(/home/pc/.nvm/versions/node/v22.18.0/bin/node ./node_modules/.bin/electron .)
(./out/simple-electron-browser-linux-x64/simple-electron-browser)
#(npm run start)
