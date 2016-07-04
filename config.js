'use strict'

const path = require('path')
const pkg = require('./app/package.json')
const platform = process.env.PLATFORM_TARGET || 'all'

let config = {
  name        : pkg.name,
  devtron     : true,
  eslint      : true,
  port        : 9080,
  vueDevTools : true,
  building    : {
    'app-version' : pkg.version,
    arch          : 'x64',
    asar          : true,
    dir           : path.join(__dirname, 'app'),
    icon          : path.join(__dirname, 'app/icons/icon'),
    ignore        : /node_modules|src|main.ejs|icons/,
    out           : path.join(__dirname, 'builds'),
    overwrite     : true,
    platform
  }
}

config.building.name = config.name

module.exports = config
