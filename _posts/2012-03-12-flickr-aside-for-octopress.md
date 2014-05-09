---
layout: post
title: "为 Octopress 添加 Flickr 边栏"
date: 2012-03-12 21:30
tags: octopress
comments: true
---

今天为自己的 Octopress 添加上了 Flickr 边栏，见右侧。

![](http://farm8.staticflickr.com/7061/6829895096_262b9ef4af.jpg)

步骤如下：

1.	在 `source/_includes/custom/asides/` 目录下新建 `flickr.html`，粘贴如下代码：{% gist 1421792 flickr.html %}P.S. `script` 外链地址中所带的参数你可以进一步的自定义，比如我就将 `display` 的参数改为了 `random`，以随机显示我的照片～

1.  在 `_config.yml` 中添加：{% gist 1421792 Code%20added%20to%20_config.yml %}把 flickr_user 换成自己的 id。

1.  最后，在 `_config.yml` 中的 `default_asides` 里添加 `custom/asides/flickr.html`，即大功告成。
	
本方法作者：[lucifr](http://lucifr.com/)
