### 设置姓名和邮箱地址

`$ git config --global user.name "hcxowe"`

`$ git config --global user.email "hcxowe@126.com"`

### 设置命令输出的样式

`$ git config --global color.ui auto`

### 创建SSH key

`$ ssh-keygen -t rsa -C "hcxowe@126.com"`

按照提示输入密码，即可在用户目录生产id_rsa 私钥 与 id_rsa.pub 公钥

### 克隆已有仓库到本地

`$ git clone git@github.com:hcxowe/book-tutorial.git`

第一次需要输入生产SSH key时设置的密码


### 初始化仓库

`$ git init`

### 查看状态

`$ git status`

### 添加文件

`$ touch README.md`

### 添加新增文件

`$ git add README.md`

加入文件到暂存区

### 提交

`$ git commit -m "add README"`

`$ git commit --amend` // 修改上次提交的描述信息

### vim操作

git commit 命令会直接跳转到vim编辑模式，用以输入多行提交信息
在vim模式下使用操作：
- 按 a, i 或 o 进入编辑模式
- 按 ESC 进入操作模式
- 在操作模式下，:wq 为写入退出，:q! 不保存退出  

### 查看日志

`$ git log`

`$ git log --pretty=short` // 简要日志

`$ git log README.md` // 显示README.md文件的提交日志， 也可以是目录

`$ git log -p` // 附加文件的改动

`$ git log -p README.md` // 附加文件的改动

`$ git log --graph` // 以图标的是形式查看分支

`$ git reflog` // 查看当前仓库执行过的操作日志

### 查看更改前后的差别

`$ git diff` // 工作树与暂存区的差别

`$ git diff HEAD` // 本次提交与上次提交的差别

### 显示分支一览表

`$ git branch` // 列出所有分支，*标识的名称是当前所在分支

`$ git branch -a` // 同时查看本地与远程仓库的分支的相关信息

### 创建、切换分支

`$ git branch feature-A` // 创建分支

`$ git checkout feature-A` // 切换到feature-A分支

或

`$ git checkout -b feature-A` // 创建并切换到feature-A分支

`$ git checkout -` // 切换回上一个分支

### 合并分支

`$ git branch master` // 切换回master

`$ git merge --no-ff feature-A` // 合并feature-A

### 回溯到指定目标的时间点

`$ git reset --hard acf416fb6aeb73132328da7ca7eb3e6e75cc35f0` // 回溯到指定哈希值的时间点

### 压缩历史

`$ git rebase -i HEAD~2` // 合并最近两次提交

### 添加远程仓库

`$ git remote add origin git@github.com:hcxowe/git-test.git` // 关联到github上的仓库

### 提交到github

`$ git push -u origin master` // 推送master到远程仓库 -u参数将远程仓库master分支的设置为本地仓库当前分支的upstream，将来使用git pull获取远程仓库内容时，本地仓库这个分支就可以直接拉去内容，不用额外添加参数

### 获取最新的远程仓库分支

`$ git pull origin feature-D` // 拉去指定分支内容
