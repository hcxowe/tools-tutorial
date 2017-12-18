require('./check-versions')()

var config = require('../config')

// 检查Node的环境变量，如果没有则使用配置文件中设置的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// opn -- A better node-open. Opens stuff like websites, files, executables. Cross-platform.
// 这里用来打开默认浏览器，打开dev-server监听的端口
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware') // express中间件，用于http请求代理到其他服务器
var webpackConfig = require('./webpack.dev.conf')

// dev-server默认端口
var port = process.env.PORT || config.dev.port

// 自动打开浏览器 true | false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 定义HTTP代理到自己的API后端
var proxyTable = config.dev.proxyTable

var app = express()

// 根据webpack的config创建Compiler对象
var compiler = webpack(webpackConfig)

// 使用compiler相应的文件进行编译和绑定，编译后的内容将存放在内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 用于实现热重载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// force page reload when html-webpack-plugin template changes
// 当html-webpack-plugin提交页面之后，使用热重载强制页面重载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 在express上使用代理表中的配置
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 一个解决单页的重定向错误的插件
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 使用devMiddleware，webpack编译后的文件将挂到express服务器上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 使用热重载中间件
app.use(hotMiddleware)

// serve pure static assets
// 配置静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// devMiddleware valid之后，启动服务
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  // 如果设置为自动打开浏览器，通过opn打开uri
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
