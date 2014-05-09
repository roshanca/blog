---
layout: post
title: "Hello Octopress"
date: 2012-03-07 10:37
tags: octopress
comments: true
---

这个网站使用 [Octopress](http://octopress.org/) 架设，并通过免费的 [Heroku](http://www.heroku.com/) 部署到网上。

第一次使用 Octopress，就发现“回不去了”！

> 看到 Octopress 让我觉得很惊艳，用 Markdown 语法很快写好一篇博文，接着用 `rake generate` 就能很快的生成整个网站并迅速 deploy 到 GitHub ， 就像在 Coding 一样快乐无比， 很有亲切感。

这里有 Octopress 的[介绍](http://octopress.org/) －（[中文](http://fancyoung.com/blog/octopress-study/)），以及[安装教程](http://octopress.org/docs/) － （[中文](http://lyhdev.com/note:octopress)）。

自己在安装和使用的过程中也遇到了一些问题，在此记录一下。

## 安装环境
-   win 7 sp1
-   Apatna Studio 3 (自带 git)

## 下载 Ruby 以及开发工具 DevKit
-   [RubyInstaller](http://rubyinstaller.org/downloads/)（我下载的是 1.9.3 的版本）<br />
-   [DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)

## 安装 Ruby & DevKit
安装完 ruby 后会自动将其路径添加至系统变量的 PATH 中，否者需手动添加。`Win + R` 键入 `cmd` 打开命令行 输入 `ruby -v` 确认 ruby 是否已成功安装。

安装完 DevKit 进入目录会发现两个 bat 文件都打不开，进入编辑后发现一句

```
rem A value similar to C:\msys\1.0\bin is what the "Start in:" field needs
```

就依照提示在 C 分区下创建目录路径 `msys/1.0`，再将文件都转移其中，这回 `msys.bat` 可以启动了。

## 重头戏，安装 Octopress
打开 Aptana，新建 Ruby Project，Generate APP 选项中选择 Clone a existing git project，然后在 Location 中填入

```
git://github.com/imathis/octopress.git
```

这个时候 Aptana 工作区面板里的 Terminal 是无法 `ruby --version` 成功的，别着急，先启动下 `path/to/ruby/bin` 目录下的 `ruby.exe` 即可。

**我一开始尝试在此 Terminal 中输入命令来安装 Octopress 所需的 `bundle`，后来发现不行，非得要用 DevKit 才能装上，估计要编译什么的吧。**

那好，就先打开 DevKit，cd 定位到你新建的 Ruby Project，也就是 Octopress 主程序。
###安装依赖包

``` bash
gem install bundler
bundle install
```

###安装默认主题

``` bash
rake install
```

## 配置 Octopress

关于网站的信息都可在 `_config.yml` 里的到配置，具体的可参见[这里](http://octopress.org/docs/configuring/)。

## 本地预览

从这步开始，可以用 Aptana 中的 Terminal 更加方便的输命令行了。

``` bash
rake generate
rake preview
```

即可在 localhost:4000 中预览你的 Octopress 了。

**Bug 1: 关于 "Could not determine content-length of response body. Set content-length of the response or set Response#chunked = true" 的警告，解决方法如下：**

打开 `path/to/ruby/lib/ruby/1.9.1/webrick/httpresponse.rb` 搜索以上错误内容，定位到

``` ruby
if chunked? || @header['content-length']
```

一般是 Line 205，将其改为

``` ruby
if chunked? || @header['content-length'] || @status == 304 || @status == 204
```

## 部署 Heroku

你得先有个 Heroku 账号，[注册一个](https://api.heroku.com/signup)！

Aptana Studio 3 中自带了 Heroku 图形化的插件，只需 Run Web Demployment Wizard，按照提示配置即可。

你也可以自己手动配置，这也许更加有趣：

``` bash
gem install heroku

# 创建一个 heroku app
heroku create

# 这里你可以重命名你的 heroku app
heroku rename newname

# 登陆 heroku，需填 email 和 password
heroku login

# 添加你的 SSH Key，后可跟路径，例如 /Users/Administrator/.ssh/id_rsa.pub
heroku keys:add
```

关于如何生成 SSH Key，请看[这里](http://help.github.com/set-up-git-redirect/)。

编辑 `.gitignore` 去除 `public`，否则生成内容无法部署到 Heroku 上。

``` bash
rake generate
git add .
git commit -m 'site updated'
git push heroku master
```

## 发表文章

只需一句

``` bash
rake new_post["title"]
```

生成的 `Source/_posts/` 下的 markdown 即为文章内，你可以用 [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) 语法来编辑它。

关于 Markdown 的更多介绍，请看[这里](http://daringfireball.net/projects/markdown/syntax) － （[中文](http://wowubuntu.com/markdown/index.html)）。

**Bug 2: 关于中文字符的问题，解决方法如下：**

打开 `path/to/ruby/lib/ruby/gems/1.9.1/gems/jekyll-0.11.0/lib/jekyll/convertible.rb`，找到

``` ruby
self.content = File.read(File.join(base, name))
```

修改为

``` ruby
self.content = File.read(File.join(base, name), :encoding => "utf-8")
```

在 windows 平台上，还有一些特殊的错误。

**Bug 3: 关于 jekyll 的 "invalid byte sequence in GBK (ArgumentError)" 错误，你可能需要在命令行下改变当前代码页到 UTF-8：**

``` bash
chcp.com 65001
```

**Bug 4: 关于语法高亮无法使用报 "Liquid error: No such file or directory - python -c 'import sys; print sys.executable'" 错误的解决方法：**

1.   安装 [python for windows](http://www.python.org/getit/) （不推荐安装  3.3 版本的）;
1.   下载[这个文件](http://blog.yesmryang.net/downloads/code/pythonexec.rb "pythonexec.rb")；
1.   用下载文件替换 `path/to/ruby/lib/ruby/gems/1.9.1/gems/rubypython-0.5.1/lib/rubypython` 目录下的同名文件；
1.   记得重启电脑 :)

## 参考文章（部分地址需 FanQ1ang）

-   <https://bugs.ruby-lang.org/attachments/2300/204_304_keep_alive.patch>
-   <http://www.soimort.org/tech-blog/2011/11/19/introduction-to-jekyll_zh.html>
-   <http://blog.yesmryang.net/windows-octopress-python/>
-   <http://ruby-taiwan.org/topics/154>
