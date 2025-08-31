#!/bin/bash

temp=$( realpath "$0"  )
p=$(dirname "$temp")
cd "$p"
(npm run make -- --targets "$p"/node_modules/@electron-forge/maker-deb)
