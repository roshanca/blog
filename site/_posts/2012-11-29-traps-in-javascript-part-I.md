---
layout: post
title: "JavaScript 中的一些坑（一）"
date: 2012-11-29 14:47
tags: javascript
comments: true
---

“坑”这个字，在此的意思是“陷阱”。由于 JavaScript “弱语言”的性质，使得其在使用过程中异常的宽松灵活，但也极为容易“中招”。

## 坑一：全局变量

>	JavaScript 通过函数管理作用域。在函数内部声明的变量只在这个函数内部，函数外面不可用。另一方面，全局变量就是在任何函数外面声明的或是未声明直接简单使用的。

“未声明直接简单使用”，指的是不用 `var` 关键字来声明变量。这个我们已经非常清楚，避免造成隐式产生全局变量的方法就是声明变量尽量用 `var` 关键字。

可你以为用了 `var` 就 ok 了？来看看这个坑：

``` js
function foo() {
	var a = b = 0;
	// body...
}
```

也许你期望得到的是两个局部变量，但 `b` 却是货真价实的全局变量。why? Because **赋值运算是自右往左的**，所以这相当于：

``` js
function foo() {
	var a = (b = 0);
	// body...
}
```

所以 `b` 是全局变量。

填坑：变量声明，最好一个个来，别搞批发~_~;

## 坑二：变量声明

先来看坑：

``` js
myName = "global";

function foo() {
	alert(myName);
	var myName = "local";
	alert(myName);
}

foo();
```

乍看上去，我们预计期望两次 `alert` 的结果分别为 "global" 与 "local"，但真实的结果是 "undefined" 与 "local"。why? 因为：
>   变量在同一作用域（同一函数）中，声明都是被提至作用域顶部先进行解析的。

所以以上代码片段的执行行为可能就像这样：

``` js
function foo() {
	var myName;
	alert(myName); // "undefined"
	myName = "local";
	alert(myName); // "local"
}
```

用另一个坑来测试下你是否真的理解了预解析：

``` js
if (!("a" in window)) {
	var a = 1;
}

alert(a);
```

`a` 变量的声明被提前到了代码顶端，此时还未赋值。接下来进入 `if` 语句，判断条件中 `"a" in window` 已成立（`a` 已被声明为全局变量），所以判断语句计算结果为 `false`，直接就跳出 `if` 语句了，所以 `a` 的值为 `undefined`。

``` js
var a; // "undefined"
console.log("a" in window); // true

if (!("a" in window)) {
	var a = 1; // 不执行
}

alert(a); // "undefined"
```

填坑：变量声明，最好手动置于作用域顶部，对于无法当下赋值的变量，可采取先声明后赋值的手法。

## 坑三：函数声明

>   函数声明也是被提前至作用域顶部，先于任何表达式和语句被解析和求值的

``` js
alert(typeof foo); // "function"

function foo() {
	// body...
}
```

可以对比一下：

``` js
alert(typeof foo); // "undefined"

var foo = function () {
	// body...
};
```

明白了这个道理的你，是否还会踩以下的坑呢？

``` js
function test() {
	alert("1");
}

test();

function test() {
	alert("2");
}

test();
```

运行以上代码片段，看到的两次弹窗显示的都是 "2"，为什么不是分别为 "1" 和 "2" 呢？很简单，`test` 的声明先于 `test()` 被解析，由于后者覆盖前者，所以两次执行的结果都是 "2"。

填坑：多数情况下，用函数表达式来代替函数声明是一个好习惯，特别是在一些语句块中。

## 坑四：函数表达式

先看命名函数表达式，理所当然，就是它得有名字，例如：

``` js
var bar = function foo() {
	// body...
};
```

要注意的是：函数名只对其函数内部可见。如以下坑：

``` js
var bar = function foo() {
	foo(); // 正常运行
};

foo(); // 出错：ReferenceError
```

填坑：尽量少用命名函数表达式（除了一些递归以及 debug 的用途），切勿将函数名使用于外部。

## 坑五：函数的自执行

对于函数表达式，可以通过后面加上 `()` 立即执行。并且可在 `()` 中传递参数，而函数声明不可以。

``` js
// (1) 这只是一个分组操作符，不是函数调用！
// 所以这里函数未被执行，依旧是个声明
function foo(x) {
  alert(x);
}(1);
```

以下代码片段分别执行都弹窗显示 "1"，因为在 `(1)` 之前，都为函数表达式，所以这里的 `()` 非分组操作符，而为运算符，表示调用执行。

``` js
// 标准的匿名函数表达式
var bar = function foo(x) {
  alert(x);
}(1);

// 前面的 () 将 function 声明转化为了表达式
(function foo(x) {
  alert(x);
})(1);

// 整个 () 内为表达式
(function foo(x) {
  alert(x);
}(1));

// new 表达式
new function foo(x) {
  alert(x);
}(1);

// &&, ||, !, +, -, ~ 等操作符（还有逗号），在函数表达式和函数声明上消除歧义
// 所以一旦解析器知道其中一个已经是表达式了，其它的也都默认为表达式了
true && function foo(x) {
  alert(x);
}(1);​
```

填坑：要解决这个坑的关键在于，弄清楚形形色色的函数表达式之实质。

## 坑六：循环中的闭包

以下演示的是一个常见的坑：

{% jsfiddle GNDd4 result,html,js %}

``` js
var links = document.getElementsByTagName("ul")[0].getElementsByTagName("a");

for (var i = 0, l = links.length; i < l; i++) {
	links[i].onclick = function (e) {
		e.preventDefault();
		alert("You click link #" + i);        
	}		
}
```

我们预期当点击第 `i` 个链接时，得到此序列索引 `i` 的值，可实际无论点击哪个链接，得到的都是 `i` 在循环后的最终结果："5"。

解释一下原因：当 `alert` 被调用时，`for` 循环内的匿名函数表达式，保持了对外部变量 `i` 的引用（闭包），此时循环已结束，`i` 的值被修改为 "5"。

填坑：为了得到想要的结果，需要在每次循环中创建变量 `i` 的拷贝。以下演示正确的做法：

{% jsfiddle UTy8Z result,html,js %}

``` js
var links = document.getElementsByTagName("ul")[0].getElementsByTagName("a");

for (var i = 0, l = links.length; i < l; i++) {
	links[i].onclick = (function (index) {
		return function (e) {
			e.preventDefault();
			alert("You click link #" + index);        
		}
	})(i);
}
```

可以看到，`(function () { ... })()` 的形式，就是上文提到的**函数的自执行**，`i` 作为参数传给了 `index`，`alert` 再次执行时，它就拥有了对 `index` 的引用，此时这个值是不会被循环改变的。当然，明白了道理后，你也可以这样写：

``` js
for (var i = 0, l = links.length; i < l; i++) {
	(function (index) {
		links[index].onclick = function (e) {
			e.preventDefault();
			alert("You click link #" + index);        
		}
	})(i);
}
```

It works too.








