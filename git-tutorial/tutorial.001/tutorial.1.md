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

### 查看状态

`$ git status`

### 添加新增文件

`$ git add README.MD`

加入文件到暂存区

### 提交

`$ git commit -m "add README"`

### 查看日志

`$ git log`

### 提交到github

`$ git push`

