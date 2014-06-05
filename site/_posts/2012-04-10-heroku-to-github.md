---
layout: post
title: "从 Heroku 迁移至 GitHub"
date: 2012-04-10 17:00
tags: octopress github
comments: true
---

[Heroku](http://www.heroku.com/) 太慢了。

在 [Godaddy](http://www.godaddy.com/) 上申请了个域名：`roshanca.com`，9.99$ 一年，但两年的费用成了 23$，我都不知道咋整的。。。仔细一看，才发现 9.99 是优惠价，而且只限第一年优惠。晕了，不过相对国内来说，还算是便宜的了。

GitHub 上的部署见 <http://octopress.org/docs/deploying/github/> ，只需一句命令真是方便：

``` bash
rake setup_github_pages
```

等了半天，都没见页面出来，原来：

>	On the first push, it can take up to ten minutes before the content is available.

[GitHub Pages](http://pages.github.com/) 的第一次生成，真的很慢！

关于使用自主域名，非常 easy，到 Octopress 主程序的 Source 目录下，生成一个 CNAME 文件，注意不要有后缀哦。

``` bash
touch CNAME
```

文件内容就是你自己的域名，你可以用编辑器来编辑文件，当然也可以在终端里 vi 编辑。

或者依照 Octopress 官方指示，在终端中一句搞定：

``` bash
echo 'roshanca.com' >> source/CNAME
```
