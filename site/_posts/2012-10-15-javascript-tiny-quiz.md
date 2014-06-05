---
layout: post
title: "一道 JavaScript 小题"
date: 2012-10-15 14:01
tags: javascript
comments: true
---

``` js
var add = ___;
add(3)(4)(5); // 输出60;
```

在网上看到这样一道题，有点意思，由此展开了一点联想。

能显而易见的是 `60 = 3 * 4 * 5`，但该如何来组织编写 `add` 这个方法呢？

### 先来看看屌丝版：

``` js
var add = function foo(x) {
  if (x == 5){
    return 60;
  } else {
    return foo;
  }
}
```

啥也不说了，这个方法虽然能实现题意，但无论是引入递归还是无下限的程度，都让人不禁对其唉声叹息。

### 再来看看普通青年版：

``` js
var add = function (a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    }
  }
}
```

多层嵌套，不尽优雅，倘若遇上 `add(3)(4)(5)⋯(N)` 输出 3 * 4 * 5 * ⋯ * N 的要求那岂不是要 `return` 个 N - 2 次？

### 最后是高富帅版：

``` js
var add = function (m) {
  function temp (n) {
    return add(m * n);
  }

  temp.toString = function () {
    return m;
  }

  return temp;
}
```

在内部定义一个临时的方法，是不是有种运筹帷幄的赶脚？特别是这 `toString` 的用法，有些鬼斧神工呀。这样一来，还将 `add` 方法抽象成了输出 N 个参数的乘积的方法。所以此时：

``` js
add(3)(4)(5)⋯(N); 
// 输出 3 * 4 * 5 * ⋯ * N
```
