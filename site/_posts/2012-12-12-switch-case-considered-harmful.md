---
layout: post
title: "Switch … Case 不被推荐使用"
date: 2012-12-12 10:11
tag: javascript
comments: true
---

本文为原创译文，英文原文：[Switch … Case Considered Harmful](http://ericleads.com/2012/12/switch-case-considered-harmful/)

> Don’t Use Switch.

> Eric Elliott - [《Programming JavaScript Applications》](http://shop.oreilly.com/product/0636920024231.do)

JavaScript 有着良好的控制流程语句，这些语句往往用花括号包裹着。不过有个例外：`switch ... case` 语句。`switch ... case` 的另类之处在于你必须在每个 `case` 末尾加上关键字 `break`，以防止流程控制权穿越进入下一个 `case` 语句中。穿越是指让多条 `case` 执行的手法，当未遇见预期的 `break` 时，控制权就自动交到下一句 `case` 手中。然而，就如同分号与花括号一样，你很有可能会在不经意之间忘了写 `break`，当这发生时，后期的错误排查就比较痛苦，因为语句本身是没错的。因此，配对地写 `case ... break` 是个好习惯。

我们通常讲，JavaScript 有着优雅的对象字面量与全局函数，这些都使得特定的方法查询变的非常简单。为方法查询所创建的对象，我们称之为 *活动对象(action object)* 或 *命令对象(command object)*，它被运用在许多软件设计模式中，包括强大的而有用的命令模式。

假设你要创建一个游戏程序，非玩家的格斗动作是基于一段特定算法来进行选择处理，作为字符串传给 `doAction` 方法。`switch ... case` 的形式如下：

``` js
function doAction(action) {
  switch (action) {
    case 'hack':
        return 'hack';
    break;
    case 'slash':
        return 'slash';
    break;
    case 'run':
        return 'run';
    break;
    default:
        throw new Error('Invalid action.');
    break;
  }
}
```

方法查询的版本：

``` js
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },
    'slash': function () {
      return 'slash';
    },
    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }
  return actions[action]();
}
```

另一个输入分组（频繁使用 `case` 语句的穿越特性）的例子：假定你正在写一个编程语言解析器，并且你要执行一个动作：当遇到一个记号符(token)，打开对象或数组；当遇到另一个记号符(token)，关闭它们。假设已存在以下方法：

``` js
function handleOpen(token) {
  return 'Open object / array.';
}

function handleClose(token) {
  return 'Close object / array';
}
```

`switch … case` 的写法是：

``` js
function processToken (token) {
  switch (token) {
    case '{':
    case '[':
      handleOpen(token);
    break;
    case ']':
    case '}':
      handleClose(token);
    break;
    default:
      throw new Error('Invalid token.');
    break;
  }
}
```

而方法查询则是像这样：

``` js
var tokenActions = {
    '{': handleOpen,
    '[': handleOpen,
    ']': handleClose,
    '}': handleClose
  };

function processToken(token) {
  if (typeof tokenActions[token] !== 'function') {
    throw new Error('Invalid token.');
  }
  return tokenActions[token](token);
}
```

乍看上去，方法查询的做法稍显复杂，但是它有以下几个优点：

- 使用标准花括号构成的语句块，就像在 JavaScript 中的大部分语句一样；
- 不必担心遗漏 `break`；
- 方法查询更加灵活。使用活动对象允许你在程序运行时改分支条件，比如，动态加载模块以扩展分支条件。甚至在逻辑段落的上下文切换时，改变部分或全部分支条件；
- 方法查询在定义上是面向对象的。而用 `switch … case`，令你的程序更加地面向过程。

最后的观点也许是最重要的：`switch` 语句与 `goto` 语句是十分类似的，后者是近二十年来普遍被科学界精英们要求退出现代编程语言舞台的。它们有着相同的弊端：我在到处都能见到 `switch ... case`，是的它被滥用了。开发者们将不相干的功能整合入过于分离的分支逻辑中。换句话说，`switch ... case` 倾向于驱使人们写出稀疏松散的代码，而代码查询则有助于人们写出组织良好、面向对象的代码。很常见地， `switch ... case` 语句的执行其实是对代码高凝聚逻辑低干扰原则的一种破坏。

我曾是 `switch ... case` 的支持者，认为它是 `if ... else` 的更好的替换方案，但在熟悉 JavaScript 后，我就自然而然的用条件查询将其取代。我的编程生涯中已经好久未遇 `switch ... case` 了，我也一点都不想念它。

当你发现自己在写一句 `switch` 语句时，停下思考：

- 将来需要增加更多的条件分支吗？（队列，堆栈，插入式结构）
- 能在运行时修改分支列表吗？例如：根据上下文改变启用的选项列表（模式切换）
- 能对执行过的分支语句提供日志吗？比如：创建一个“撤销/重做”的堆栈表，或记录用户动作以提供给你的服务器做用户分析（命令管理）
- 你是否用递增数字来做你的条件分支？例如：case 1:, case: 2, etc… （迭代目标）
- 你是否试着将相关的输入语句组织在一起利用穿透特性使它们之间共享代码？

如果你对以上任一问题的回答是 yes，那么你都有很好的理由远离 `switch` ，还有它那难以控制穿透特性。