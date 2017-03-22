## 什么是NPM？ node package manager

> npm使JavaScript开发人员更容易分享和重用代码，并能轻松地更新共享代码。


## 安装 Node.js 与更新 NPM

> http://nodejs.cn/ 官网进行下载安装Node.js

> 安装成功之后，通过 `node -v` 测试安装是否成功

> 成功安装Node.js之后应该也附带安装了一个版本的NPM， 也可以从https://registry.npmjs.org/npm/-/npm-{VERSION}.tgz 下载手动安装

> `npm -v` 测试安装是否成功

> `npm install npm@latest -g` npm更新频繁，使用该命令更新至最新版本


## 设置NPM权限

> 当通过npm全局安装package时，提示EACESS错误时，表明你没有往npm设定为存储全局packages的目录写入的权限

> 解决方法：获取写入权限； 变更存储目录； 由node的包管理器提供;

### 获取写入权限

- 1、`npm config get prefix` 获取npm的目录
- 2、` sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}` 这条命令改变了npm所使用的子文件夹的权限

### 改变默认的目录

- `mkdir ~/.templateDir` 在用户目录添加.templateDir目录
- `npm config set prefix '~/.templateDir'` 设置新的默认全局安装目录
- 创建和打开~/.profile 文件, 向其中添加 `export PATH=~/.templateDir/bin:$PATH`
- `source ~/.profile` 更新系统变量

- 使用 `NPM_CONFIG_PREFIX=~/.templateDir` 代替只上的2-4步，可以保持一致的系统环境变量

### 使用包管理器搞定

## 本地安装npm package

> 安装包分局部与全局两种方式，默认为局部安装

### 安装

- `npm install package_name` 局部安装package_name包，它会在当前路径下创建`node_modules`目录，并安装包进改目录
- 如果存在package.json 文件，则安装包的版本遵守文件中定义的规则，如果没有该文件则使用最后的版本

> eg.

安装lodash
> npm install lodash

创建index.js文件，其内容如下：
```js
// 引入lodash
var lodash = require('lodash');

// 调用lodash的without方法
var output = lodash.without([1,2,3], 1);

console.log(output); // [2, 3]
```

## package.json 文件全解

```js
// package.json
// package.json必须是一个严格的json文件，而不仅仅是js里边的一个对象。其中很多属性可以通过npm-config来生成
{
    // package.json中name和version两个属性必须存在，否则模块就无法被安装

    /**
    * name:
    *    不能含有大写字母
    *    不要使用和node核心模块一样的名称
    *    name中不要含有"js"和"node"
    *    name属性会成为模块url、命令行中的一个参数或者一个文件夹名称，任何非url安全的字符在name中都不能使用，也不能以"_"或"."开头
    *    name属性也许会被写在require()的参数中，所以最好取个简短而语义化的值。
    *    创建一个模块前可以先到后边的网址查查name是否已经被占用. https://www.npmjs.com/
    */
    "name": "npmtest",

    "version": "1.0.0",

    "description": "this is npm getting started",

    "keywords": ["npm", "hcxowe", "package", "json"],

    /**
    * 这个项目主页url和url属性不同，如果你填写了url属性，npm注册工具会认为你把项目发布到其他地方了，获取模块的时候不会从npm官方仓库获取，而是会重定向到url属性配置的地址。
    */
    "homepage": "https://github.com/hcxowe",

    // 填写一个bug提交地址或者一个邮箱
    "bugs": {
        "url": "https://github.com/hcxowe",
        "email": "hcxowe@126.com"
    },

    // 模块制定一个协议, 让用户知道他们有何权限来使用你的模块，以及使用该模块有哪些限制
    "license": "ISC",

    // 作者
    "author": "hcxowe",

    // 贡献者
    "contributors": ["user1", "user2"],

    // 内容是模块下文件名或者文件夹名
    "files": [],

    // 指定程序的主入口文件
    "main": "index.js",

    // 将一个或多个可执行模块配置到PATH路径下
    "bin": {
        "myapp": "./client.js"
    },

    // 制定一个或通过数组制定一些文件来让linux下的man命令查找文档地址
    "man" : "./man/doc.1",

    // CommonJs通过directories来制定一些方法来描述模块的结构
    "directories": {
        "bin": "./bin",
        "doc": "./doc",
        "lib": "./lib",
        "man": "./man"
    },

    // 指定代码存放地址
    "repository": {
        "type": "git",
        "url": "https://github.com/hcxowe/npm.git"
    },

    // 指定项目的生命周期各个环节需要执行的命令
    "script": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },

    // 设置一些项目不怎么变化的项目配置
    "config": {
        "name": "foo",
        "config": {
            "port": "8080"
        }
    },

    // 配置模块依赖的模块列表
    "dependencies": {
        "foo": "1.0.0 - 2.999.999",
        "boo": ">=1.9.3 <2.3.4",
        "baz": "2.0.0",
        "asd": "<1.2.3 || >=2.3.4",
        "def": "http://adfaf.com/dafwe.tar.gz",
        "eft": "~1.2",
        "dfr"" "1.x",
        "etg": "latest"
    },

    // 运行的node版本范围
    "engines": {
        "node": ">=0.10.3"
    },

    // 指定模块运行的系统
    "os": ["linux", "win32"],

    // CPU
    "cpu": ["x64", "ia32"],

    // 这个属性被设置为true，npm将拒绝发布它，这是为了防止一个私有模块被无意间发布出去
    "private": false,

    // 配置是会在模块发布时用到的一些值的集合。如果你不想模块被默认被标记为最新的，或者默认发布到公共仓库，可以在这里配置tag或仓库地址
    "publishConfig": []
}

```

## 更新本地包

与package.json相同目录运行 `npm update` 

## 卸载本地包

`npm uninstall lodash`  --- 从node_moudles目录中移除lodash
`npm uninstall --save lodash` --- 从package.json文件中移除lodash

`npm install --save-dev lodash`
`npm uninstall --save-dev lodash` --- 安装时带有dev需要相应的移除命令

## 全局安装

`npm install -g lodash`

## 全局包更新

`npm update -g lodash`

## 卸载全局包

`npm uninstall -g lodash`

## 创建Node.js模块

1. 创建目录并进入
2. `npm install`创建package.json
3. 配置package.json文件，必须name与version属性
4. 设置main属性，配置入口，默认为index.js
5. 配置export对象，作为模块的导出

## 发布包

你可以发布任何有package.json文件的目录

### 创建用户

`npm adduser` 可以创建用户

### 发布

`npm publish` 发布， 他会上传该目录下所有不在.gitignore 和 .npmignore文件中列出的文件

### 更新

`npm version 1.2.3` 设置版本
`npm publish` 再次发布

## 包的版本语义

`1.2.3`
- Bug修复和其他一些小的变化:补丁版本,增加最后一个数字,例如1.0.1
- 新功能不打破现有功能，向后兼容, 增加中间的数,例如1.1.0
- 变化打破向后兼容性:主要版本,增加第一个数字,例如2.0.0