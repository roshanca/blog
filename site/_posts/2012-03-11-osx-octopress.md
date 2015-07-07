---
layout: post
title: "OS X 下的 Octopress 搭建"
date: 2012-03-11 14:04
tags: octopress mac
comments: true
---

终于将家中的 [Hackintosh](http://baike.baidu.com/view/2173094.htm) 完善了，尝试下在 Mac 中搭建 Octopress吧。

我目前在用的是 Lion 10.7.3 的系统，自带 ruby 1.8.7，看来要 update 下。

## 必备工具
-	Xcode 或 [GCC Installer](https://github.com/downloads/kennethreitz/osx-gcc-installer/GCC-10.7-v2.pkg)，用于编译；
-	RVM(Ruby Version Management)：一个命令行工具，可以提供一个便捷的多版本ruby环境的管理和切换。

## 安装 RVM
安装 RVM 的方法有点不同：

```bash
bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
```

配置一下，添加 RVM 方法：

```bash
echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile
source ~/.bash_profile
```

这个时候用下面命令可以验证 RVM 是否安装成功：

```bash
type rvm | head -1
```

如若看到 `rvm is a function` 表示已安装成功了。

## 安装 Ruby

```bash
rvm install 1.9.3
```

如果失败，可以采用如下方式：

```bash
rvm reinstall 1.9.3 --with-gcc=clang
```

设置目前的 ruby 为默认版本：

```bash
rvm --default use 1.9.3
```

## 安装 Octopress

由于我之前在公司电脑上已经创建了本站的 heroku 的 app，那我只要通过 git 获取目前线上的资源就 ok 啦～

用 Aptana 创建一个空白的 Ruby Project，命名为 Octopress

![创建一个空白的 Ruby Project, 命名为 Octopress](http://farm8.staticflickr.com/7051/6971729423_3a9f79e468.jpg)

接着定位到工程目录下

```bash
# 初始化 git:
git init

# ok，接下来为这个 git 添加远程仓库：
git remote add heroku git@heroku.com:losttemple.git

# 将远程仓库资源 `pull` 到本地 project：
git pull heroku master
```

恩，这下我之前使用的 Octopress 又重新出现到了我的视线中：）

![Octopress Project](http://farm8.staticflickr.com/7177/6825679466_d7b9a71aee.jpg)

## 使用 Octopress

老样子，依旧要先安装依赖包：

```
gem install bundler
bundle install
```

但这次好像出现了个问题：

```
Installing rb-fsevent (0.4.3.1) with native extensions Unfortunately, a fatal error has occurred. Please report this error to the Bundler issue tracker at https://github.com/carlhuda/bundler/issues so that we can fix it. Thanks!
/Users/wwj1983/.rvm/rubies/ruby-1.9.3-p125/lib/ruby/site_ruby/1.9.1/rubygems/installer.rb:552:in 'rescue in block in build_extensions': ERROR: Failed to build gem native extension. (Gem::Installer::ExtensionBuildError)
```

`rb-fsevent` 这个依赖包死活安装不上，于是单独安装

```
gem install rb-fsevent
Successfully installed rb-fsevent-0.9.0
1 gem installed
Installing ri documentation for rb-fsevent-0.9.0...
Installing RDoc documentation for rb-fsevent-0.9.0...
```

但是，这个版本与 `Gemfile.lock` 中的版本 0.4.3.1 不符。你应该知道怎么做了，哼哼，手动更改为 0.9.0 即可。好吧，把剩下的 `bundle` 装完，然后尽情地 `rake generate` 吧～

## 参考（部分地址需 FanQ1ang）
-	<http://www.unfoldingcode.com/2012/02/ruby-193-via-rvm-on-mac-osx-lion.html>
-	<http://beginrescueend.com/rvm/install/>
-	<http://devcenter.heroku.com/articles/git>
