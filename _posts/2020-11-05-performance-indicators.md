---
layout: post
title: 页面性能(W3C)指标说明及定义
data: 2020-11-05
tags: performance javascript
toc: true
comments: false
---

## 性能指标说明及定义

{% figure caption:"图 1 (来源：www.w3.org)" %}
[![](https://s10.mogucdn.com/mlcdn/c45406/201105_8cig0b7bk130j5010lkf890g0dfh9_1473x879.png)](https://s10.mogucdn.com/mlcdn/c45406/201105_8cig0b7bk130j5010lkf890g0dfh9_1473x879.png)
{% endfigure %}

## 指标说明

| 指标名称      | 描述                       | 计算方式                                      |
|:----------|:-------------------------|:------------------------------------------|
| 首字节       | 收到首字节的时间                 | responseStart - fetchStart                |
| DOM Ready | HTML加载完成时间               | domContentLoadedEventEnd - fetchStart     |
| 页面完全加载    | 页面完全加载时间                 | loadEventStart - fetchStart               |
| DNS查询     | DNS解析耗时                  | domainLookupEnd - domainLookupStart       |
| TCP连接     | TCP链接耗时                  | connectEnd - connectStart                 |
| 请求响应      | Time to First Byte(TTFB) | responseStart - requestStart              |
| 内容传输      | 数据传输耗时                   | responseEnd - responseStart               |
| DOM解析     | DOM 解析耗时                 | domInteractive - responseEnd              |
| 资源加载      | 资源加载耗时(页面中同步加载的资源)       | loadEventStart - domContentLoadedEventEnd |

## 参考

- <https://www.w3.org/TR/navigation-timing/?spm=a2c4g.11186623.2.15.59982e88Be3sxh>