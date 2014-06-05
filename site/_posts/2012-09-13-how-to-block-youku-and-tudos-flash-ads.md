---
layout: post
title: "如何屏蔽优酷和土豆的 Flash 广告"
date: 2012-09-13 13:17
tags: flash html5 video
comments: true
---

大家出来混都不容易，按理说视频网站的播放不收费只内嵌点广告，无可厚非。可最近看来，这些视频网站的 Flash 内嵌广告，越来越长，直逼老婆娘的裹脚布，让人有点忍无可忍了。我见过最长的广告长达1分45秒，how about u？真叫人怀念那个15秒广告的年代啊！而且现如今广告的质量也不咋样，我曾在追一部无脑国产连续剧时（哎，哥也有无聊的时候啊），被生逼着看了好几遍的“苏菲”广告。质量差点也就算了，还不让跳过。看看人家 YouTube，5秒后可选 Skip 的设计多棒，不过人家也是对广告内容的自信。

好了，言归正传，来看看有什么方法让优酷和土豆，甚至是奇艺、sina、网易、QQ、迅雷...等的视频广告消失不见。

### host 修改法
这是比较普遍的修改法，但效果不太尽人意。具体的可以参考以下文章：

-   [MAC 下屏蔽优酷的黑屏等待](http://www.gracecode.com/archives/3099/)
-   [彻底屏蔽优酷广告：最新反“反屏蔽”的方法……](http://joys.name/2011/09/block-youku-ad.html)

### userScript 注入法
使用 [userScript](http://userscripts.org) 的注入技术以达到不可告人的目的，说白了，就是允许用户脚本运行在 web 页面上，与其交互。So, 我们可以在页面加载或 Flash 载入前，做好多自己想做事情。有人就研究出了偷梁换柱的方法，见 [OpenGG.Clean.Player](http://player.opengg.me)。注意：这个脚本是将整个 Flash 播放源替换了，所以 host 修改法解决不了的问题，在此得到了彻底的解决。

简单说下如何使用。

-   Firefox：[Greasemonkey](http://www.greasespot.net)
-   Chrome：[Tampermonkey Beta](https://chrome.google.com/webstore/detail/gcalenpjmijncebpfijmoaglllgpjagf?hl=zh-CN&utm_source=chrome-ntp-launcher) 

安装完相应的插件后，非常 simple 了，前往此偷梁换柱神奇脚本的地址：<http://userscripts.org/scripts/show/120679>，点击右上角的 `Install` 即可。

####update:
[OpenGG.Clean.Player](http://player.opengg.me) 在 Chrome Web Store 上上架了，用 Chrome 的童鞋可以直接访问以下地址进行安装了：

[OpenGG.Clean.Player for Chrome](https://chrome.google.com/webstore/detail/openggcleanplayer/doleffkdbkfeokcanjaagploacdflcff)（已停止更新）

![OpenGG.Clean.Player for Chrome](http://i93.photobucket.com/albums/l57/ShakeSpace/QQ20121115-1.png)

### HTML 5 转换法

可以说这是更高级的 userScript 注入法，对页面元素的改动更大。

简单来说，就是获取网络视频针对于移动设备（主要是 iOS 设备）的媒体流地址，再用浏览器内建的 HTML 5 播放器来进行播放。这个媒体流的格式一般是 `m3u8` 或 `mp4`，目前只有 OSX 下的 Safari 支持 `m3u8`，而且好多视频都无 `mp4` 格式的提供，所以其局限性不言而喻（Windows 的使用者可直接跳过此方法了）。

多亏或者是多怪苹果公司不断壮大以及 iPhone iPad 的普及，Adobe 公司的 Flash 被众人口诛笔伐甚至被吹口哨要求其登下历史舞台。Flash 的诟病无需多说，至少它让我 Macbook 成了“煎蛋器”。但它的优势也显而易见，对于其要被 HTML 5 取代的说法，似乎有些危言耸听。但很高兴看到的是，目前向 HTML 5 视频中嵌入广告以及获取用户隐私的技术尚不成熟，得益于此，我乐于在自己的 Macbook 上尽量采用 HTML 5 来替代 Flash 的方案。

好吧，来看看怎么做，方法有三：

-   [更改 Safari UA](http://www.mac52ipod.cn/post/apple-safari-flv-html5-tudou-youku.php)：若嫌要每次手工更改略显麻烦，可以在终端中执行以下代码设置 UA 默认为 iPad：
        
    ``` bash 
    defaults write com.apple.Safari CustomUserAgent “‘Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3′”
    ```

    要还原只需执行：

    ``` bash
    defaults delete com.apple.Safari CustomUserAgent
    ```

-   [一个在线转换优酷土豆视频的 bookmark](http://zythum.free.bg/youkuhtml5playerbookmark/)：also, safari supported only.

    ![html5bookmark](http://i93.photobucket.com/albums/l57/ShakeSpace/html5bookmark.jpg)

-   [ClickToPlugin & ClickToFlash](http://hoyois.github.com/safariextensions/clicktoplugin/)：这是老外写的 Safari Extension，前者是后者的扩展版。从字面上看是用于控制 Flash 等浏览器插件（Java, Silverlight etc.）加载的，实际上，as it says
    > Further, it can replace many plug-in-based media players by Safari’s native HTML5 media player

    这可是意外的惊喜。更加惊喜的是，它经过国内一位[88年的小伙子](https://twitter.com/ilools)一番 DIY 后，支持了大陆众多视频网的播放器替换。看看截图就知道它的覆盖面有多广了：

    ![killers](http://i93.photobucket.com/albums/l57/ShakeSpace/killers.jpg)
    ![preview](http://i93.photobucket.com/albums/l57/ShakeSpace/preview.jpg)

    它的优势显而易见：
    
    -   降温：据我观测，看同样的视频，从用 Flash 到 HTML 5，我的设备温度从50多度下降至40度左右；
    -   减噪：温度低了，风扇转速自然就下来了；
    -   网页加载更快：因为所有插件都被阻止，直到用户点击才去请求加载插件内容。

    当然，目前来说，它还有许多不足：比如支持还不够广泛（许多微博的内嵌视频不支持），比如亮度对比度的调节、画面尺寸调节功能的缺失等等。

    但相对于其带来的巨大优势来说，这些小瑕疵都不算什么。
