---
layout: post
title: "用 AppleScript 创建工作流"
date: 2012-11-20 22:18
tags: applescript octopress workflow
comments: true
---

自从用了 [Octopress](http://octopress.org)，每次写新文章 & 生产部署，都要在终端中反复敲打几个命令，重复劳动。出于职业习惯，开始琢磨有没有偷懒的方法，用工具或者程序来代替这体力活。

一开始看上了 OS X 自带的实用小工具小机器人——Automator，可以录制用户在系统中的各种操作而串联成工作流，有点类似 PhotoShop 中“动作”，也像一些应用程序中的 Macros（宏指令）。可试了一把后，觉得不太靠谱，这玩意儿不仅将你的动作记录了下来，废操作也一并囊括。而且执行工作流时，鼠标的控制权被强行夺取，感觉被人远程协助中，这让我除了傻呆呆地望着屏幕啥事也不能干。

![Automator](http://i93.photobucket.com/albums/l57/ShakeSpace/Automator.png)

后来试了试 AppleScript，感觉还是自己纯代码来写工作流比较爽，DIY 的空间更大而且执行起来更加高效。

## 什么是 AppleScript

-	一种脚本语言，和我们所知道的 VBScript 和 JavaScript 类似
-	内建于 OS X
-	用于实现应用程序控制
-	使繁琐重复的机械操作自动化

## 入门

[AppleScrip 简明基础教程](http://ishare.iask.sina.com.cn/f/14009129.html?w=MTQ0MjA5NTIzNg%3D%3D)

两个小例子：

1.   让 Safari 打开一个 URL

    ``` applescript
    tell application "Safari"
        open location "http://roshanca.com"
    end tell
    ```

1.   在桌面新建一个名为 "workflow" 的文件夹

    ``` applescript
    tell application "Finder"
        make new folder at desktop with properties {name:"workflow"}
    end tell
    ```

## 进阶

也来两个小列子吧，感觉都还挺有用的~

1.   转换日期格式

    ``` applescript
    set {year:y, month:m, day:d} to (current date) -- date "2012年11月20日星期二 下午4:33:51"
    set dateList to {y, m * 1, d} -- {2012, Novemver * 1, 20} => {2012, 11, 20}
    set newDateList to reverse of rest of dateList -- {20， 11}
    set theYear to first item of dateList as string -- "2012"
    set restDate to ""

    repeat with theItem in newDateList
        set restDate to "-" & theItem & restDate
    end repeat

    return theYear & restDate -- "2012-11-20"
    ```

1.   获取用户文稿中最近修改文件的文件名（以下代码 `new_post.applescript` 中也有用到）

    ``` applescript
    tell application "Finder"
        set thePath to (path to documents folder) -- 获取文稿文件夹路径
        set fileList to files in thePath -- 获取路径下的文件集合记录
        set fileList to sort fileList by modification date -- 按最新修改排序
        set fileName to name of first item in fileList -- 获取记录集中第一个文件的文件名
        return fileName
    end tell
    ```

## 实战

![my AppleScripts](http://i93.photobucket.com/albums/l57/ShakeSpace/applescript.png)

综合基础教程与谷歌搜索，自己写了两个 Script，分别用于创建博客新文章与博客本地预览。

{% gist roshanca/4118971 new_post.applescript %}

{% gist roshanca/4118971 blog_preview.applescript %}
