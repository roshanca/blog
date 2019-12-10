---
layout: post
title: 对数字的金融货币格式化
data: 2018-05-04
tags: javascript format
toc: true
comments: true
---

浸淫金融行业多年，这样的需求做了太多。解释下金融货币格式化，主要包含两点：

1. 保留小数两位（单位元，意思就是要精确到分）
2. 千位分隔符（显得严肃且专业）

另外还可能附带一些小要求：比如显示货币符号“￥”、“$” 等等。

来点图示：

- 情况一：

  ![](https://s10.mogucdn.com/mlcdn/c45406/180504_5363k12cijga0aaggl5hk19690gl5_137x33.png)

- 情况二：

  ![](https://s10.mogucdn.com/mlcdn/c45406/180504_2lekfjgfbi1i210kl57l31klc7lei_405x265.png)

- 情况三：

  ![](https://s10.mogucdn.com/mlcdn/c45406/180504_28k0l1d4e9be6bdh75hah6ek2eafb_190x64.png)

看了网上的各种 js 解决方案简直吓尿，都是写了个比较复杂的 function 来解决。如若无需兼容一些远古浏览器，js 自带的 `Array.prototype.toLocaleString()` 就可以解决问题。

## toFixed

我们看看情况一：

比如后端返回金额为分，我们赋给一个变量 `amount`，那保留两位小数，大部分人的解决方案是 `(amount / 100).toFixed(2)`。

可是要注意 `toFixed` 使用的是银行家舍入规则：

> 所谓银行家舍入法，其实质是一种四舍六入五取偶（又称四舍六入五留双）法。简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。

大部分情况下，用用是够了，特别是数据约定的最小单位就是“分”的情况下。如需更加精确，就要考虑到 js 浮点数计算精度缺失的问题。具体的可以参考：[toFixed 计算错误(依赖银行家舍入法的缺陷)解决方法](http://www.chengfeilong.com/toFixed)

## toLocaleString

情况二是既要保留两位小数，又要加千位分隔符，`toFixed` 就不堪用了。那就轮到上面提到的 `toLocaleString` 登场了，详细的用法见：[MDN web docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)。

{% gist roshanca/97c180d8b5fb5867bb5c8f5bf4808d3c currency.js %}

情况三看来也一并解决了。

## 兼容性

`toFixed` 基本上没什么兼容性的问题，`toLocaleString` 的兼容情况如下：

- IE >= 11
- Android >= 4.4
- iOS >= 10

可以看到，移动端主流设备已基本覆盖。
