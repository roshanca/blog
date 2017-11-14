---
layout: post
title: Mac 中解决 gitk 模糊问题
data: 2017-11-14
tags: git
toc: true
comments: true
---

gitk 是个 git 自带的 gui 小工具。

> 用于显示仓库或所选的一系列提交的改动。它包含了提交的可视化图形，展现了各提交点之间的关联信息，以及各个版本的文件树。

好用是挺好用，可年久未更，在 Retina 屏漫天飞的当下，显得有点丑陋了。如图所示：

[![][before]][before]

如何不用一些第三方工具（e.g. [retinizer](http://retinizer.mikelpr.com/)），顺利开启 gitk 的 retina 模式呢？Let's do it~

## 临时关闭系统保护

Mac 自 OS X EI Capitan 版本之后，无法直接修改系统的 System 目录，需关闭系统保户才行。想要关闭，得先进入系统 Recover 模式：重启电脑，按住 `⌘ + R` 不放。

进入 Recover 模式后，在菜单栏中选择 "Utilities → Terminal"（实用工具 → 终端），输入以下命令：

```
csrutil status
```

系统会提示保户状态是 enable 还是 disable，如果是 enable 的话，需要我们手动 disable 一下：

```
csrutl disable
```

重启进入正常模式。

## 修改 Wish.app 的 Info.plist

利用终端定位到 Wish.app 的目录：

```
cd /System/Library/Frameworks/Tk.framework/Versions/Current/Resources
```

打开 Info.plist

```
sudo vi Wish.app/Contents/Info.plist
```

在结束标签 `</dict>` 之前，插入以下两行代码：

```xml
<key>NSHighResolutionCapable</key>
<true/>
```

## 更新 Wish.app

要使其生效，需更新 Wish.app，有两种方式：

1. 直接在终端中执行:

    ```
    sudo touch Wish.app
    ```

1. 如果你不放心想做个备份的话，可以这样操作：

    ```
    sudo cp -R Wish.app WishCopy.app
    sudo mv Wish.app WishOriginal.app
    sudo mv WishCopy.app Wish.app
    ```

## 再次开启系统保户

完成以上步骤后，重启按 `⌘ + R` 再次进入 Recover 模式，一样调出终端，输入：

```
csrutil enable
```

然后重启回到正常模式，done.

## 效果展示

[![][after]][after]

稍微调整下字体后，立刻顺眼多了 (ಠ‿ಠ)

[before]: https://s10.mogucdn.com/mlcdn/c45406/171114_87g4dk0195cfcceajclb63eei6e7b_1050x984.png 'Origin Wish App'
[after]: https://s10.mogucdn.com/mlcdn/c45406/171114_1g8ak522be15bdfdd7hh6dhi60f44_1050x829.png 'Retina Wish App'
