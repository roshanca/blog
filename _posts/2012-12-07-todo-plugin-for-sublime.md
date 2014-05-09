---
layout: post
title: "TODO 插件 for Sublime Text 2"
date: 2012-12-07 20:30
tags: sublime tool
comments: true
---

用 ST2 来实现日常与工作中的 TODO，详细请查看这篇文章：[《Sublime Text 2 插件：PlainTasks》](http://lucifr.com/2012/09/18/sublime-text-extension-plaintasks/)

安装与使用文中已经的很详细了，很感谢 Lucifr 翻译了 [PlainTasks](https://github.com/aziz/PlainTasks) 自带的英文教程：

{% gist 4232437 %}

### 自动关联图标

关于如何将 TODO 文档自动关联作者提供的那漂亮的图标，我去搜索了一番，具体做法如下：

1.  右键点击 ST2 选择“显示包内容”，进入 `Contents => Resources`；
1.  将图标文件 `TODO.icns` 复制到此目录下；
1.  返回 `Contents` 目录，编辑 `info.plist`，在键值 `CFBundleDocumentTypes` 内的首个 `<array>` 后加入以下代码：

    ``` xml
    <dict>
      <key>CFBundleTypeExtensions</key>
      <array>
        <string>todo</string>
        <string>todolist</string>
        <string>tasks</string>
        <string>taskpaper</string>
      </array>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleTypeName</key>
      <string>Tasks</string>
      <key>CFBundleTypeIconFile</key>
      <string>TODO</string>
    </dict>
    ```

1.  保存，关闭退出 ST2；
1.  重建 Launchservice：在终端中输入：

    ``` bash
    /System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -r -f /Applications/Sublime\ Text\ 2.app/
    ```

1.  注销电脑或者在终端中输入 `killall Finder`。

ok，新建一个 TODO 文档，保存至电脑看看效果吧 ☺
