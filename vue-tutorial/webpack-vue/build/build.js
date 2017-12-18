require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora') // 简单的终端输出
var rm = require('rimraf') // 以包的形式包装rm -rf命令，就是用来删除文件和文件夹的，不管文件夹是否为空，都可以删除
var path = require('path') // 这个模块包含了用于处理文件路径相关的操作的函数
var chalk = require('chalk') // 修改控制台中字符串的样式
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...') 
spinner.start() // 会这样子展示： loading框 building for production...

// 移除dist及static目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
