---
layout: post
title: 购搬瓦工安装 SS 翻越“长城”
data: 2017-11-08
tags: vps
toc: true
comments: true
---

[搬瓦工（Bandwagon）](https://bandwagonhost.com/aff.php?aff=18390)是一家有口皆碑的美国老牌 VPS 服务商，以性价比高而闻名。

## 购买

国内用户购买的一般是选 SPECIAL 10G KVM PROMO V3 - LOS ANGELES - CN2 ([点击购买](https://bwh1.net/cart.php?a=confproduct&i=0)) 这档产品，参数如下：

| SSD | RAM | Transfer | Link speed | Price |
| :-----------: |:-----: |:--------: | :-------: | :-------: |
| 10 GB RAID-10 | 512 MB | 500 GB/mo | 1 Gigabit | $29.99/年 |

差不多 30 刀一年，用优惠码 `BWH1ZBPVK` 购买可享 6.00% 的折扣幅度。

洛杉矶机房的 ping 一般在 200 ms 左右，如若觉得还不能满足，可选香港机房：SPECIAL 20G KVM PROMO V3 - HONG KONG ([点击购买](https://bwh1.net/aff.php?aff=18390&pid=61))。但一般要靠抢，常年都是 out of stock 的状态，手慢无😂。配置是比上一个高了一档：

| SSD | RAM | Transfer | Link speed | Price |
| :-----------: |:------: |:--------: | :-------: | :-------: |
| 20 GB RAID-10 | 1024 MB | 100 GB/mo | 1 Gigabit | $9.99/月<br>$99.99/年 |

但价格也高了一个层次，月付 9.99 刀，年付要 99.99 刀，实在是不便宜。而且每月流量只有 100G，还不如洛杉矶的 500G 呢。优势呢就是超低的 ping（估计应该和阿里云香港机房的 100ms 左右差不多），容量内存大一倍。

买搬瓦工还有一个理由是支持支付宝支付，相对来说，其它很多国外的 VPS 服务商，用信用卡支付要填写一大堆资料，繁琐不说，有时候还要审核（预防信用卡欺诈等）一等好多天，甚是麻烦。

## 开启 BBR

为了让 CN2 的速度更加理想，可以开启 BBR[^1]。开启 BBR，需要内核版本的支持，不过搬瓦工也贴心的提供了支持 BBR 的系统模板，可以直接重新初始化系统，并选择带有 BBR 的系统模板即可：

[^1]: BBR 是来自于 Google 的黑科技，目的是通过优化和控制 TCP 的拥塞，充分利用带宽并降低延迟，起到神奇般的加速效果。

![](https://s10.mogucdn.com/mlcdn/c45406/171108_1426akkj5f56jh7bc8ff5d79fgl8d_1135x631.jpg)

## 一键安装 SS 服务端

在控制面版左侧菜单的底部，找到 Shadowsocks Server，选择后点击安装即可：

![](https://s10.mogucdn.com/mlcdn/c45406/171108_1g9ff4afd6lgbfeh1g4b8i82g4cgg_845x793.jpg)

接下来等待一会儿会提示安装完成：

![](https://s10.mogucdn.com/mlcdn/c45406/171108_3f9h7ak8i56b199b4eceb7d2ik2f4_822x505.jpg)

安装完成后即可看到服务的配置项，依次是：

- Shadowsocks server encryption: 加密方式
- Shadowsocks server port: 端口
- Shadowsocks server password: 密码

## 安装 SS 客户端

- Mac: [下载地址][Mac]
- Window: [下载地址][Window][^2]
- Android: [下载地址][Android]
- iOS: [下载地址][iOS][^3]

[^2]: *shadowsocks-win-xxx.zip* 是 for windows 7 及之前的版本的，*shadowsocks-win-dotnet-xxx.zip* 是 for windows 8 以及现在最新的 windows 10 的。

[^3]: iOS 的 APP 目前只限美国商店。你要是没有美国的 Apple 账户，那还是算了。

安装好后，对照着之前配置好的服务端参数，进行一番配置，开启运行即可。

![](https://s10.mogucdn.com/mlcdn/c45406/171108_71j926h508135748gjg9bgk1fh5l4_488x331.png)

[Mac]: https://github.com/shadowsocks/ShadowsocksX-NG/releases/
[Window]: https://sourceforge.net/projects/shadowsocksgui/files/dist/
[Android]: https://play.google.com/store/apps/details?id=com.github.shadowsocks
[iOS]: https://github.com/shadowsocks/shadowsocks-iOS/wiki/Help
