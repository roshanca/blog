---
layout: post
title: 在 CentOS 上布署 node 程序
data: 2016-05-29
tags: deploy
comments: true
---

前后端分离已经提了有一年，在一家半互联网化的公司困难重重（传统 IT 企业历史上一直都是以后端开发为重，各种 Java, C#, .net 等...）。现在终于看到了一点曙光，实属不易。当然，这对一些大公司来说，完全都不是事，人家早就自动化测试自动化布署持续集成一套组合拳打完不费力。一些小公司还在自己摸索着，我们也是。

最近正好要上一个前后端分离的项目，布署只能自己来，因为公司的运维和实施之前压根都没听过什么 node 之类的东东。之前没怎么倒腾过 Linux 的我，还好有多年的 OS X 使用经验，倒也没遇到什么很大的困难（会 vim 很重要），以下是一些记录。

PS. 这里要吐槽一下，虽然做着互联网的产品，但我听说居然有些客户（传统券商）的机房环境是无法顺畅地访问外网的环境，要想访问特定的网站还要去专门申请端口。。。真是无语。所以为此我还特地考虑无法用系统自带的包管理工具比如 yum 或者 apt-get 什么的，尽量都采用源码安装所需软件工具。

运行环境
---
CentOS 6.4

Ready
---

1. Git（版本管理工具）

    1. 下载 git 源码：https://github.com/git/git/releases

    1. 安装 git

        ```
        tar -zxf git-2.7.4.tar.gz
        cd git-2.7.4
        make configure
        ./configure --prefix=/usr/local
        make install
        ```
        执行 `git --version` 确认安装成功。

    1. 配置 git

        ```
        git config --global user.name release
        git config --global user.email release@cairenhui.com
        ```

    1. 配置 SSH Key
        1. 原本无 Key 的，要生成 Key，具体操作见：
        
            >   http://git.cairenhui.com/gitlab/how-to-use/wikis/Generating-SSH-keys
        
        1. 原先有 Key 的，操作以上链接内容的第三到第五步即可。

1. Node（程序运行环境）

    1. 安装 nvm（CentOS 6.x 的 gcc++ 版本过低无法用源码安装 node）

        ```
        git clone https://github.com/creationix/nvm.git ~/.nvm
        cd ~/.nvm
        git checkout `git describe --abbrev=0 --tags`
        ```
    
    1. 配置 nvm

        ```
        export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
        ```
        将以上这句加入到 `~/.bashrc` 或者 `~/.bash_profile` 或者 `~/.profile`，执行 `nvm --help` 确认安装成功。

    1. 用 nvm 来安装 node：
    
        ```
        nvm install 4.4.5
        ```
        
        执行 `node -v` 确认安装成功。
        
1. npm & bower（包管理工具）

    1. 为包管理器加入淘宝镜象（如果无以下 `.npmrc` 配置文件则创建一个）

        ```
        vi ~/.npmrc
        ```
        
        在其内容中加入：
        >   registry=https://registry.npm.taobao.org/


    1. 更新 npm 到最新版本

        ```
        npm install -g npm
        ```

        执行 `npm -v` 确认更新成功。
        
    1. 安装 bower

        ```
        npm install -g bower
        ```

1. PM2（进程管理器）

    1. 安装
        
        ```
        npm install -g pm2
        ```

    更多操作请查看[这里](https://github.com/Unitech/pm2/blob/master/README.md)
    
Deploy
---

下面开始布署我们的 node 程序：

1. 到 `/usr/local` 目录下创建目录 `nodeApp` 来放置 node 程序

1. 克隆项目

    ```
    git clone git@git.cairenhui.com:<Namespace>/<Project>.git
    ```
    
1. 检出版本

    ```
    cd <Project>
    
    // 查看 tag
    git tag
    
    // 检出指定版本
    git checkout <tag>
    ```
    
1. 安装倚赖包

    ```
    bower install --allow-root // 需要 root 权限
    npm install --production // 只安装 dependencies 而不安装 devDependencies
    ```
     
1. 启动程序

    ```
    pm2 start pm2.json
    ```
    
1. 查看状态

    ```
    pm2 list
    pm2 show <id|name>
    
    // 监控 CPU / Memory
    pm2 monit
    ```

1. 查看日志：
    
    ```
    pm2 logs <id|name>
    ```
    
1. 更新程序

    ```
    git fetch --tags
    git checkout <new tag>
    ``` 

遇到一些坑，可能要特别注意：

1. 如果程序是用 pm2 watch 的，当停止进程时，是必须要加参数 `--watch` 的，否则是停不掉的。比如：

    ```
    pm2 stop 0 --watch
    ```
    
1. 进程启动后，是常驻状态，因此有些关于 pm2 的配置改动，需要用 `pm2 update` 来进行一下更新。

1. 我没用 cluster 模式而是 fork 模式，好像程序老是会隔一段时间就自动重启，虽然用户无感，但我至今还没搞懂是内存不够还是什么鬼。。。之后用 cluster 模式尝试看看。 
