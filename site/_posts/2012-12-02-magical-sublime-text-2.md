---
layout: post
title: "编辑神器：Sublime Text 2"
date: 2012-12-02 22:49
tags: sublime tool
comments: true
---

Sublime Text 2 (以下简称 ST2)，无疑是我所用过的最好用的文本（代码）编辑器，没有之一！基于它的某些诱人特性，总让人在不经意间就眼前一亮，所以最近身边有好多同事都因无意一瞥，就被其吸引，继而让我推荐。

先来说说它的优势所在：

+   **启动快速，运行流畅**，而且这是在拥有众多功能和加载许多插件的前提下，单凭这一点，就达到了我内心“神器”的标准；
+   **UI 漂亮精美**，内置多款主题，无论你喜欢深色背景，还是钟意浅色皮肤，它都能满足你；
+   支持各种流行编程语言的**语法高亮**，非常齐全，还可通过插件扩展；
+   **代码自动补全提示**，注意：它只是个编辑器，不是 IDE，虽然提示的代码有限，但十分实用（特别是写 CSS，太爽了）；
+   **可定制性和可扩展性**，这个可就因人而异了，有人嫌麻烦，有人要个性，但毫无疑问的是，ST2 因为这一点而无比强大！

有没有心动呢？心动不如行动，赶紧来试试吧。

## 下载
-   稳定版：[Stable](http://www.sublimetext.com/2)
-   开发版：[Dev](http://www.sublimetext.com/dev) - Semi-frequently updated, available to anyone.
-   内测版：[Nightly](http://www.sublimetext.com/nightly) - Mostly frequently updated, available for registered users only.

推荐下载开发版（Dev）。

## 破解

其实未注册的免费版跟付费版功能完全相同，只是前者主窗口右上角有 "UNREGISTERED" 的水印而已，还有就是偶尔的提示注册弹窗（频率低的可以忽略不记），所以破解**我既不提倡，也觉得没那必要**。过程我就不赘述了，请移步至以下链接。

-   **OS X** - <http://mac.pcbeta.com/thread-114355-1-1.html>
-   **Windows & Linux** - <http://i.wanz.im/2012/04/07/cracking_sublime-text2/>

## 使用技巧 ##

提示：因为本文基于 OS X 环境所写，所以为了更好的阅读下文，请先确保理解 OS X 与 Windows 下的键盘映射关系。见表：

| OS X   |符号  |对应  |Windows
|:-------|:---:|:----:|:-------
| Command| ⌘   | =>   |Ctrl
| Shift  | ⇧   | =>   |Shift
| Option | ⌥   | =>   |Alt
| Control| ⌃   | =>   |Ctrl

### 多重选择(Multi-Selection)

![Multi-Selection](http://i93.photobucket.com/albums/l57/ShakeSpace/rename.jpg)

这项功能实在是太强大了！太让人随心所欲了，使得许多需要用正则、高级搜索、替换才能完成的任务，变得轻松 easy，不禁让我感慨：“当年没这神器，是怎么活过来的？！”

如何激活多重选择呢？

-   按住 `Command`，点击编辑区域内任何你所期望光标出现的位置；
-   通过多次 `Command + D`，即可将全文中与光标当前所在位置的词相同的词逐一加入选择。而在有词句选中状况下，通过 `Command + Control + G` 即可一次性选择全文中所有相同的词；
-   Windows 下可按住鼠标中键后拖动来进行垂直方向的纵列选择，OS X 下则是按住 `option` 键；
-   选中多行文本，通过 `Command + Shift + L` 来将光标打散至每行行尾。

### 随心所欲跳转(Goto Anything)

![Goto Anything](http://i93.photobucket.com/albums/l57/ShakeSpace/goto.jpg)

许多 IDE 都有这个功能，切换当前打开的文档嘛。但 ST2 的 Goto Anything 已经完全超越了，当我们按下 `Command + P` 时看看都能做些什么：

-   切换文档，不单单是在当前打开的文档之间哦，包括了整个 Project，并可用关键字过滤
-   关键字以 `@` 开头，匹配的是文档中的函数以及其它关键内容（例如：HTML 中就匹配元素 id，这有些类似一般 IDE 中的 "outline" 的功能），它的快捷键是 `Command + R`
-   关键字以 `#` 开头，其实就是个全文搜索
-   关键字以 `:` 开头，后跟数字可跳转至相应的行，它的快捷键是 `Ctrl + G`

### 边栏(Side Bar)

![Side Bar](http://i93.photobucket.com/albums/l57/ShakeSpace/Side-Bar.jpg)

很多编辑器（Notepad++ etc.）也有边栏，但 ST2 有点不同的是：单选左侧边栏中的文件，右侧自动出现文档预览（若选中的为图片等文件，则显示其二进制编码）。当你修改编辑它时，它才在 ST2 中以 Tab 的形式自动打开，so sweety ☺

### 命令面板(Command Palette)

![Command Palette](http://i93.photobucket.com/albums/l57/ShakeSpace/command_palette.jpg)

执行命令的快捷入口，我们一般以快捷键 `Command + Shift + P` 来快速调用，当然你也可以在菜单 `Tool` 下找到它。

### 无干扰模式(Distraction Free Mode)

在菜单 `View` 中选择 `Enter Distraction Free Mode` 就可进入无干扰模式。快捷键为 `Ctrl + Shift + Command + F`

![Distraction Free Mode](http://i93.photobucket.com/albums/l57/ShakeSpace/Distraction-Free-Mode.jpg)

通过修改 `Preferences -> Settings - More -> Distraction Free - User` 可以对防干扰模式进行一些设置：

``` json
{
    "line_numbers": false,      // 是否显示行号
    "gutter": false,            // 是否显示边列
    "draw_centered": true,      // 是否居中显示
    "wrap_width": 80,           // 换行宽度(单位：字符)
    "word_wrap": true,          // 是否自动换行
    "scroll_past_end": true     // 滚动能否超过结尾
}
```

### 迷你地图(Minimap)

右侧默认显示迷你地图，这其实是个全局预览加模糊定位文档位置的功能。当然如果你像增大编辑可视面积，也可通过菜单 "View" 选择 "Hide Minimap" 将其关闭。

## 设置

`Preferences -> Settings - Default`，这个是 ST2 的默认设置，不建议修改此文件，而是通过修改 `Preferences -> Settings - User` 来达到个性化的定制。例如，以下就是我的 User 设定：

``` json
{
    "folder_exclude_patterns":
    [
        ".svn",
        ".git",
        ".hg",
        "CVS",
        ".idea"
    ],
    "highlight_line": true,
    "highlight_modified_tabs": true,
    "scroll_past_end": true,
    "tab_size": 2,
    "theme": "Soda Dark.sublime-theme"
}
```

根据字面意思相信你都能看懂分别代表什么意思，这里要提一下的是如何开启鼎鼎大名的 Vim 模式（重度 Coder 的大爱），请添加这句：
    
``` json
{
    "ignored_packages": []
}
```

## 快捷键

类似设置，你可以进入 `Preferences -> Key Bindings - Default` 查看所有的快捷键设置，然后在 `Key Bindings - User` 来自定义快捷键。

附上常用的快捷键：（Windows 用户请移步至 **[这里](http://istyles.blog.163.com/blog/static/1811003892011828111418654/)**）

<div class="keyboard">
    <table>
        <thead>
            <tr>
                <th colspan="2">编辑</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>⌃⇧K</td>
                <td>删除整行</td>
            </tr>
            <tr>
                <td>⌘KK (⌃K)</td>
                <td>从光标处删除至行尾</td>
            </tr>
            <tr>
                <td>⌘⌫</td>
                <td>从光标处删除至行首</td>
            </tr>
            <tr>
                <td>⇧⌘↩</td>
                <td>在当前行之前插入新行</td>
            </tr>
            <tr>
                <td>⌘↩</td>
                <td>在当前行之后插入新行</td>
            </tr>
            <tr>
                <td>⌃⌘↑</td>
                <td>上移一行</td>
            </tr>
            <tr>
                <td>⌃⌘↓</td>
                <td>下移一行</td>
            </tr>
            <tr>
                <td>⌘]</td>
                <td>缩进当前行</td>
            </tr>
            <tr>
                <td>⌘[</td>
                <td>反缩进当前行</td>
            </tr>
            <tr>
                <td>⌘L</td>
                <td>选择行 (重复按下将下一行加入选择)</td>
            </tr>
            <tr>
                <td>⌘D</td>
                <td>选择词 (重复按下时多重选择相同的词)</td>
            </tr>
            <tr>
                <td>⌃⇧M</td>
                <td>选择括号内的内容</td>
            </tr>
            <tr>
                <td>⌃M</td>
                <td>跳转至对应的括号</td>
            </tr>
            <tr>
                <td>⇧⌘D</td>
                <td>复制(多)行</td>
            </tr>
            <tr>
                <td>⌘J</td>
                <td>合并(多)行</td>
            </tr>
            <tr>
                <td>⌘/</td>
                <td>注释</td>
            </tr>
            <tr>
                <td>⌥⌘/</td>
                <td>块注释</td>
            </tr>
            <tr>
                <td>⌘Y</td>
                <td>恢复或重复</td>
            </tr>
            <tr>
                <td>⇧⌘V</td>
                <td>粘贴并自动缩进</td>
            </tr>
            <tr>
                <td>⌘U</td>
                <td>软撤销（可撤销光标移动）</td>
            </tr>
            <tr>
                <td>⇧⌘U</td>
                <td>软重做（可重做光标移动）</td>
            </tr>
        </tbody>
    </table>

    <table>
        <thead>
            <tr>
                <th colspan="2">查找/替换</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>⌘F</td>
                <td>查找</td>
            </tr>
            <tr>
                <td>⌥⌘F</td>
                <td>替换</td>
            </tr>
            <tr>
                <td>⇧⌘F</td>
                <td>在文件中查找</td>
            </tr>
            <tr>
                <td>⌘G</td>
                <td>查找下一个</td>
            </tr>
            <tr>
                <td>⌃⌘G</td>
                <td>查找并选中全部</td>
            </tr>
        </tbody>
    </table>

    <table>
        <thead>
            <tr>
                <th colspan="2">XML/HTML</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>⇧⌘A</td>
                <td>选择标签内的内容</td>
            </tr>
            <tr>
                <td>⌃⇧W</td>
                <td>嵌套标签</td>
            </tr>
            <tr>
                <td>⌥⌘ .</td>
                <td>闭合当前标签</td>
            </tr>
        </tbody>
    </table>

    <table>
        <thead>
            <tr>
                <th colspan="2">拆分窗口</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>⌥⌘[1,2,3,4,5]</td>
                <td>单列、两列、三列、四列、栅格</td>
            </tr>
            <tr>
                <td>⌥⇧⌘[2,3]</td>
                <td>两栏、三栏</td>
            </tr>
        </tbody>
    </table>

    <table>
        <thead>
            <tr>
                <th colspan="2">其它</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>⌘P</td>
                <td>随心所欲跳转</td>
            </tr>
            <tr>
                <td>⇧⌘P</td>
                <td>打开命令面板</td>
            </tr>
            <tr>
                <td>⌘KB</td>
                <td>切换侧边栏（我的已修改为 ⌃S）</td>
            </tr>
            <tr>
                <td>⌃ `</td>
                <td>打开 python 控制台</td>
            </tr>
            <tr>
                <td>⌘T</td>
                <td>前往文件</td>
            </tr>
        </tbody>
    </table>
</div>

## 安装插件

ST2 的插件安装是通过所谓的 [Package Control (包控制)](//sublime.wbond.net/) 来实现的。如果你用过 `npm` 或者 `spm` ，那你一定不会对这种包管理的方式感到陌生。

安装 Package Control 的方法：

1. 打开 ST2，通过 `` Ctrl + ` `` 调出 Console (控制台)
1. 将以下代码粘贴进命令行中并回车：

    ``` python
    import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
    ```
1. 重启 ST2，如果在 `Preferences` 下见到 `Package Control` 这一项，就说明安装成功了。

接下来我们就可以利用 Package Control 来安装插件了：

1. 打开 ST2，通过 `Command + Shift + P` 打开命令面板，输入关键字调出 `Package Control: Install Package`

    ![](http://i93.photobucket.com/albums/l57/ShakeSpace/PCI.jpg)
1. 选择 `Package Control: Install Package`，稍等片刻后就可会出现插件列表，可输入插件名来在列表中查找选择所需插件

    ![](http://i93.photobucket.com/albums/l57/ShakeSpace/PCI-RESULT.jpg)
1. 等待安装（左下角 [ = ] 显示运行中），安装完毕后重启 ST2 即可

## 常用插件

这里就简单罗列一些，包括了网上热评的和自己在用的。

+   **Alignment**

    这插件用于对齐代码赋值语句, 例如:

        var name = "sublimt"
        var version = "2.0.1"
        var title = "sublime text"

    以上代码就能转化为：

        var name    = "sublimt"
        var version = "2.0.1"
        var title   = "sublime text"

+   **Clipboard History**

    粘贴板历史记录，方便使用复制/剪切的内容。
+   **ColorPicker**

    支持在各个平台下取色，没什么好说的。
+   **Ctags**

    可以在代码里直接查看函数定义，比如看一个函数的定义或者类的定义。不过可惜无法在 OS X 下使用。

+   **DocBlockr**

    自动生成标准 JSDoc 注释的好帮手，只需在函数声明定义上方输入 `/**` 然后回车，便会出现类似如下代码：

        /**
        * [width description]
        * @param  {[type]} px [description]
        * @return {[type]}    [description]
        */

+   **Emmet**

    你也许没听说它，但其前身：zen coding 可谓是鼎鼎大名（在前端界）。之所以更名，是因为它给自己的定位：
    > the essential toolkit for web-developers

    作为资深前端插件，它不仅可安装在 ST2 上，基本上流行的 IDE (Aptana/Eclipse etc.) 与编辑器 (Notepad++/TextMate etc.)，它都提供支持。详细的使用文档：[Emmet Documentation](http://docs.emmet.io)，[Emmet for ST2](https://github.com/sergeche/emmet-sublime)

+   **GBK Encoding Support**

    解决对中文编码不支持的问题，必装吧。因为你发现 ST2 菜单中 `File -> Reopen with Encoding` 压根就没有国标码！

+   **JsFormat**

    格式化 JS，当然也包括 JSON，快捷键是 `Ctrl + Shift + F` 非常方便。

+   **MarkdownEditing**

    > MarkdownEditing 从视觉和便捷性上针对 Markdown 文档的编辑进行了一系列的优化。

    附上 [Markdown 语法说明 (简体中文版)](http://wowubuntu.com/markdown/index.html)，and [MarkdownEditing 的详细中文介绍](http://lucifr.com/2012/07/12/markdownediting-for-sublime-text-2/)

+   **Markdown Preview**

    能在浏览器中对当前 Markdown 文件进行预览。甚至生成相应的 HTML 文档。使用要用命令面板，输入相应的关键字查找 Markdown Preview 命令。当然，你也可以自定义快捷键。

+   **SideBarEnhancements**

    加强在侧栏目录树中右键的选项。如图所示：

    ![SideBarEnhancements](http://i93.photobucket.com/albums/l57/ShakeSpace/sidebarenhancements.jpg)

+   最后介绍一个 **自动生成当天日期** 的小插件，TextMate 用户一定不会陌生，命令是 `isoD + Tab`，此非官方插件，所以要使用的话，必须将 [timestamp.py](https://github.com/sunteya/sublime-user-package/blob/master/timestamp.py) 这个文件加入到用户配置目录（`Packages -> User`）下。
