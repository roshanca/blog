---
layout: post
title: 前端编码风格规范之 JavaScript 规范
data: 2014-09-12
tags: code
comments: true
---

原文：[Web Styleguide - Style guide to harmonize HTML, Javascript and CSS / SASS coding style](https://github.com/gionkunz/chartist-js/blob/develop/CODINGSTYLE.md)

## JavaScript 规范

***

### 全局命名空间污染与 IIFE

总是将代码包裹成一个 IIFE(Immediately-Invoked Function Expression)，用以创建独立隔绝的定义域。这一举措可防止全局命名空间被污染。

IIFE 还可确保你的代码不会轻易被其它全局命名空间里的代码所修改（i.e. 第三方库，window 引用，被覆盖的未定义的关键字等等）。

**不推荐**

```js
var x = 10,
    y = 100;

// Declaring variables in the global scope is resulting in global scope pollution. All variables declared like this
// will be stored in the window object. This is very unclean and needs to be avoided.
console.log(window.x + ' ' + window.y);
```

**推荐**

```js
// We declare a IIFE and pass parameters into the function that we will use from the global space
(function(log, w, undefined){
  'use strict';

  var x = 10,
      y = 100;

  // Will output 'true true'
  log((w.x === undefined) + ' ' + (w.y === undefined));

}(window.console.log, window));
```

***

### IIFE（立即执行的函数表达式）

无论何时，想要创建一个新的封闭的定义域，那就用 IIFE。它不仅避免了干扰，也使得内存在执行完后立即释放。

所有脚本文件建议都从 IIFE 开始。

立即执行的函数表达式的执行括号应该写在外包括号内。虽然写在内还是写在外都是有效的，但写在内使得整个表达式看起来更像一个整体，因此推荐这么做。

**不推荐**

```js
(function(){})();
```

**推荐**

```js
(function(){}());
```

so，用下列写法来格式化你的 IIFE 代码：

```js
(function(){
  'use strict';

  // Code goes here

}());
```

如果你想引用全局变量或者是外层 IIFE 的变量，可以通过下列方式传参：

```js
(function($, w, d){
  'use strict';

  $(function() {
    w.alert(d.querySelectorAll('div').length);
  });
}(jQuery, window, document));
```

***

### 严格模式

ECMAScript 5 严格模式可在整个脚本或独个方法内被激活。它对应不同的 javascript 语境会做更加严格的错误检查。严格模式也确保了 javascript 代码更加的健壮，运行的也更加快速。

严格模式会阻止使用在未来很可能被引入的预留关键字。

你应该在你的脚本中启用严格模式，最好是在独立的 IIFE 中应用它。避免在你的脚本第一行使用它而导致你的所有脚本都启动了严格模式，这有可能会引发一些第三方类库的问题。

**不推荐**

```js
// Script starts here
'use strict';

(function(){

  // Your code starts here

}());
```

**推荐**

```js
(function(){
  'use strict';

  // Your code starts here

}());
```

***

### 变量声明

总是使用 `var` 来声明变量。如不指定 var，变量将被隐式地声明为全局变量，这将对变量难以控制。如果没有声明，变量处于什么定义域就变得不清（可以是在 Document 或 Window 中，也可以很容易地进入本地定义域）。所以，请总是使用 var 来声明变量。

采用严格模式带来的好处是，当你手误输入错误的变量名时，它可以通过报错信息来帮助你定位错误出处。

**不推**

```js
x = 10;
y = 100;
```

**推荐**

```js
var x = 10,
    y = 100;
```

***

### 理解 JavaScript 的定义域和定义域提升

在 JavaScript 中变量和方法定义会自动提升到执行之前。JavaScript 只有 function 级的定义域，而无其他很多编程语言中的块定义域，所以使得你在某一 function 内的某语句和循环体中定义了一个变量，此变量可作用于整个 function 内，而不仅仅是在此语句或循环体中，因为它们的声明被 JavaScript 自动提升了。

我们通过例子来看清楚这到底是怎么一回事：

**原 function**

```js
(function(log){
  'use strict';

  var a = 10;

  for(var i = 0; i < a; i++) {
    var b = i * i;
    log(b);
  }

  if(a === 10) {
    var f = function() {
      log(a);
    };
    f();
  }

  function x() {
    log('Mr. X!');
  }
  x();

}(window.console.log));
```

**被 JS 提升过后**

```js
(function(log){
  'use strict';
  // All variables used in the closure will be hoisted to the top of the function
  var a,
      i,
      b,
      f;
  // All functions in the closure will be hoisted to the top
  function x() {
    log('Mr. X!');
  }

  a = 10;

  for(i = 0; i < a; i++) {
    b = i * i;
    log(b);
  }

  if(a === 10) {
    // Function assignments will only result in hoisted variables but the function body will not be hoisted
    // Only by using a real function declaration the whole function will be hoisted with its body
    f = function() {
      log(a);
    };
    f();
  }

  x();

}(window.console.log));
```

根据以上提升过程，你是否可理解以下代码？

**有效代码**

```js
(function(log){
  'use strict';

  var a = 10;

  i = 5;

  x();

  for(var i; i < a; i++) {
    log(b);
    var b = i * i;
  }

  if(a === 10) {
    f = function() {
      log(a);
    };
    f();

    var f;
  }

  function x() {
    log('Mr. X!');
  }

}(window.console.log));
```

正如你所看到的这段令人充满困惑与误解的代码导致了出人意料的结果。只有良好的声明习惯，也就是下一章节我们要提到的声明规则，才能尽可能的避免这类错误风险。

***

提升声明

为避免上一章节所述的变量和方法定义被自动提升造成误解，把风险降到最低，我们应该手动地显示地去声明变量与方法。也就是说，所有的变量以及方法，应当定义在 function 内的首行。

只用一个 `var` 关键字声明，多个变量用逗号隔开。

**不推荐**

```js
(function(log){
  'use strict';

  var a = 10;
  var b = 10;

  for(var i = 0; i < 10; i++) {
    var c = a * b * i;
  }

  function f() {

  }

  var d = 100;
  var x = function() {
    return d * d;
  };
  log(x());

}(window.console.log));
```

**推荐**

```js
(function(log){
  'use strict';

  var a = 10,
      b = 10,
      i,
      c,
      d,
      x;

  function f() {

  }

  for(i = 0; i < 10; i++) {
    c = a * b * i;
  }



  d = 100;
  x = function() {
    return d * d;
  };
  log(x());

}(window.console.log));
```

把赋值尽量写在变量申明中。

**不推荐**

```js
var a,
    b,
    c;

a = 10;
b = 10;
c = 100;
```

**推荐**

```js
var a = 10,
    b = 10,
    c = 100;
```

### 总是使用带类型判断的比较判断

总是使用 `===` 精确的比较操作符，避免在判断的过程中，由 JavaScript 的强制类型转换所造成的困扰。

如果你使用 `===` 操作符，那比较的双方必须是同一类型为前提的条件下才会有效。

如果你想了解更多关于强制类型转换的信息，你可以读一读 [Dmitry Soshnikov 的这篇文章](http://dmitrysoshnikov.com/notes/note-2-ecmascript-equality-operators/)。

在只使用 `==` 的情况下，JavaScript 所带来的强制类型转换使得判断结果跟踪变得复杂，下面的例子可以看出这样的结果有多怪了：

```js
(function(log){
  'use strict';

  log('0' == 0); // true
  log('' == false); // true
  log('1' == true); // true
  log(null == undefined); // true

  var x = {
    valueOf: function() {
      return 'X';
    }
  };

  log(x == 'X');

}(window.console.log));
```

***

### 明智地使用真假判断

当我们在一个 if 条件语句中使用变量或表达式时，会做真假判断。`if(a == true)` 是不同于 `if(a)` 的。后者的判断比较特殊，我们称其为真假判断。这种判断会通过特殊的操作将其转换为 true 或 false，下列表达式统统返回 false：`false`, `0`, `undefined`, `null`, `NaN`, `''`（空字符串）.

这种真假判断在我们只求结果而不关心过程的情况下，非常的有帮助。

以下示例展示了真假判断是如何工作的：

```js
(function(log){
  'use strict';

  function logTruthyFalsy(expr) {
    if(expr) {
      log('truthy');
    } else {
      log('falsy');
    }
  }

  logTruthyFalsy(true); // truthy
  logTruthyFalsy(1); // truthy
  logTruthyFalsy({}); // truthy
  logTruthyFalsy([]); // truthy
  logTruthyFalsy('0'); // truthy

  logTruthyFalsy(false); // falsy
  logTruthyFalsy(0); // falsy
  logTruthyFalsy(undefined); // falsy
  logTruthyFalsy(null); // falsy
  logTruthyFalsy(NaN); // falsy
  logTruthyFalsy(''); // falsy

}(window.console.log));
```

***

### 变量赋值时的逻辑操作

逻辑操作符 `||` 和 `&&` 也可被用来返回布尔值。如果操作对象为非布尔对象，那每个表达式将会被自左向右地做真假判断。基于此操作，最终总有一个表达式被返回回来。这在变量赋值时，是可以用来简化你的代码的。

**不推荐**

```js
if(!x) {
  if(!y) {
    x = 1;
  } else {
    x = y;
  }
}
```

**推荐**

```js
x = x || y || 1;
```

这一小技巧经常用来给方法设定默认的参数。

```js
(function(log){
  'use strict';

  function multiply(a, b) {
    a = a || 1;
    b = b || 1;

    log('Result ' + a * b);
  }

  multiply(); // Result 1
  multiply(10); // Result 10
  multiply(3, NaN); // Result 3
  multiply(9, 5); // Result 45

}(window.console.log));
```

***

### 分号

总是使用分号，因为隐式的代码嵌套会引发难以察觉的问题。当然我们更要从根本上来杜绝这些问题[^1] 。以下几个示例展示了缺少分号的危害：

[^1]: 作者指的是采用严格规范的语句写法，从根本上杜绝由分号缺失而引起的代码歧义。


```js
// 1.
MyClass.prototype.myMethod = function() {
  return 42;
}  // No semicolon here.

(function() {
  // Some initialization code wrapped in a function to create a scope for locals.
})();


var x = {
  'i': 1,
  'j': 2
}  // No semicolon here.

// 2.  Trying to do one thing on Internet Explorer and another on Firefox.
// I know you'd never write code like this, but throw me a bone.
[ffVersion, ieVersion][isIE]();


var THINGS_TO_EAT = [apples, oysters, sprayOnCheese]  // No semicolon here.

// 3. conditional execution a la bash
-1 == resultOfOperation() || die();
```

**So what happens?**

1. JavaScript 错误 —— 首先返回 42 的那个 function 被第二个 function 当中参数传入调用，接着数字 42 也被“调用”而导致出错。
1. 八成你会得到 'no such property in undefined' 的错误提示，因为在真实环境中的调用是这个样子：`x[ffVersion, ieVersion][isIE]()`.
1. `die` 总是被调用。因为数组减 1 的结果是 `NaN`，它不等于任何东西（无论 `resultOfOperation` 是否返回 `NaN`）。所以最终的结果是 `die()` 执行完所获得值将赋给 `THINGS_TO_EAT`.

**Why?**

JavaScript 中语句要以分号结束，否则它将会继续执行下去，不管换不换行。以上的每一个示例中，函数声明或对象或数组，都变成了在一句语句体内。要知道闭合圆括号并不代表语句结束，JavaScript 不会终结语句，除非它的下一个 token 是一个中缀符[^2] 或者是圆括号操作符。

[^2]: 中缀符，指的是像 `x + y` 中的 `+`。

这真是让人大吃一惊，所以乖乖地给语句末加上分号吧。

**澄清：分号与函数**

分号需要用在表达式的结尾，而并非函数声明的结尾。区分它们最好的例子是：

```js
var foo = function() {
  return true;
};  // semicolon here.

function foo() {
  return true;
}  // no semicolon here.
```

***

### 嵌套函数

嵌套函数是非常有用的，比如用在持续创建和隐藏辅助函数的任务中。你可以非常自由随意地使用它们。

***

### 语句块内的函数声明

切勿在语句块内声明函数，在 ECMAScript 5 的严格模式下，这是不合法的。函数声明应该在定义域的顶层。但在语句块内可将函数申明转化为函数表达式赋值给变量。

**不推荐**

```js
if (x) {
  function foo() {}
}
```

**推荐**

```js
if (x) {
  var foo = function() {};
}
```

***

### 异常

基本上你无法避免出现异常，特别是在做大型开发时（使用应用开发框架等等）。

在没有自定义异常的情况下，从有返回值的函数中返回错误信息一定非常的棘手，更别提多不优雅了。不好的解决方案包括了传第一个引用类型来接纳错误信息，或总是返回一个对象列表，其中包含着可能的错误对象。以上方式基本上是比较简陋的异常处理方式。适时可做自定义异常处理。

在复杂的环境中，你可以考虑抛出对象而不仅仅是字符串（默认的抛出值）。

```js
if(name === undefined) {
  throw {
    name: 'System Error',
    message: 'A name should always be specified!'
  }
}
```

***

### 标准特性

总是优先考虑使用标准特性。为了最大限度地保证扩展性与兼容性，总是首选标准的特性，而不是非标准的特性（例如：首选 `string.charAt(3)` 而不是 `string[3]`；首选 DOM 的操作方法来获得元素引用，而不是某一应用特定的快捷方法）。

***

### 简易的原型继承

如果你想在 JavaScript 中继承你的对象，请遵循一个简易的模式来创建此继承。如果你预计你会遇上复杂对象的继承，那可以考虑采用一个继承库，比如 [Proto.js by Axel Rauschmayer](https://github.com/rauschma/proto-js).

简易继承请用以下方式：

```js
(function(log){
  'use strict';

  // Constructor function
  function Apple(name) {
    this.name = name;
  }
  // Defining a method of apple
  Apple.prototype.eat = function() {
    log('Eating ' + this.name);
  };

  // Constructor function
  function GrannySmithApple() {
    // Invoking parent constructor
    Apple.prototype.constructor.call(this, 'Granny Smith');
  }
  // Set parent prototype while creating a copy with Object.create
  GrannySmithApple.prototype = Object.create(Apple.prototype);
  // Set constructor to the sub type, otherwise points to Apple
  GrannySmithApple.prototype.constructor = GrannySmithApple;

  // Calling a super method
  GrannySmithApple.prototype.eat = function() {
    // Be sure to apply it onto our current object with call(this)
    Apple.prototype.eat.call(this);

    log('Poor Grany Smith');
  };

  // Instantiation
  var apple = new Apple('Test Apple');
  var grannyApple = new GrannySmithApple();

  log(apple.name); // Test Apple
  log(grannyApple.name); // Granny Smith

  // Instance checks
  log(apple instanceof Apple); // true
  log(apple instanceof GrannySmithApple); // false

  log(grannyApple instanceof Apple); // true
  log(grannyApple instanceof GrannySmithApple); // true

  // Calling method that calls super method
  grannyApple.eat(); // Eating Granny Smith\nPoor Grany Smith

}(window.console.log));
```

***

### 使用闭包

闭包的创建也许是 JS 最有用也是最易被忽略的能力了。[关于闭包如何工作的合理解释](http://jibbering.com/faq/faq_notes/closures.html)。

***

### 切勿在循环中创建函数

在简单的循环语句中加入函数是非常容易形成闭包而带来隐患的。下面的例子就是一个典型的陷阱：

**不推荐**

```js
(function(log, w){
  'use strict';

  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;

  for(i = 0; i < numbers.length; i++) {
    w.setTimeout(function() {
      // At the moment when this gets executed the i variable, coming from the outer function scope
      // is set to 3 and the current program is alerting the message 3 times
      // 'Index 3 with number undefined
      // If you understand closures in javascript you know how to deal with those cases
      // It's best to just avoid functions / new closures in loops as this prevents those issues

      w.alert('Index ' + i + ' with number ' + numbers[i]);
    }, 0);
  }

}(window.console.log, window));
```

接下来的改进虽然已经解决了上述例子中的问题或 bug，但还是违反了不在循环中创建函数或闭包的原则。

**不推荐**

```js
(function(log, w){
  'use strict';

  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;

  for(i = 0; i < numbers.length; i++) {
    // Creating a new closure scope with an IIFE solves the problem
    // The delayed function will use index and number which are
    // in their own closure scope (one closure per loop iteration).
    // ---
    // Still this is not recommended as we violate our rule to not
    // create functions within loops and we are creating two!

    (function(index, number){
      w.setTimeout(function() {
        // Will output as expected 0 > 1, 1 > 2, 2 > 3
        w.alert('Index ' + index + ' with number ' + number);
      }, 0);
    }(i, numbers[i]));
  }

}(window.console.log, window));
```

接下来的改进已解决问题，而且也遵循了规范。可是，你会发现看上去似乎过于复杂繁冗了，应该会有更好的解决方案吧。

**不完全推荐**

```js
(function(log, w){
  'use strict';

  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;

  // Create a function outside of the loop that will accept arguments to create a
  // function closure scope. This function will return a function that executes in this
  // closure parent scope.
  function alertIndexWithNumber(index, number) {
    return function() {
      w.alert('Index ' + index + ' with number ' + number);
    };
  }

  // First parameter is a function call that returns a function.
  // ---
  // This solves our problem and we don't create a function inside our loop
  for(i = 0; i < numbers.length; i++) {
    w.setTimeout(alertIndexWithNumber(i, numbers[i]), 0);
  }

}(window.console.log, window));
```

将循环语句转换为函数执行的方式问题能得到立马解决，每一次循环都会对应地创建一次闭包。函数式的风格更加值得推荐，而且看上去也更加地自然和可预料。

**推荐**

```js
(function(log, w){
  'use strict';

  // numbers and i is defined in the current function closure
  var numbers = [1, 2, 3],
      i;

  numbers.forEach(function(number, index) {
    w.setTimeout(function() {
      w.alert('Index ' + index + ' with number ' + number);
    }, 0);
  });

}(window.console.log, window));
```

***

### eval 函数（魔鬼）

`eval()` 不但混淆语境还很危险，总会有比这更好、更清晰、更安全的另一种方案来写你的代码，因此尽量不要使用 evil 函数。

***

### this 关键字

只在对象构造器、方法和在设定的闭包中使用 `this` 关键字。this 的语义在此有些误导。它时而指向全局对象（大多数时），时而指向调用者的定义域（在 eval 中），时而指向 DOM 树中的某一节点（当用事件处理绑定到 HTML 属性上时），时而指向一个新创建的对象（在构造器中），还时而指向其它的一些对象（如果函数被 `call()` 和 `apply()` 执行和调用时）。

正因为它是如此容易地被搞错，请限制它的使用场景：

*   在构造函数中
*   在对象的方法中（包括由此创建出的闭包内）

***

### 首选函数式风格

函数式编程让你可以简化代码并缩减维护成本，因为它容易复用，又适当地解耦和更少的依赖。

接下来的例子中，在一组数字求和的同一问题上，比较了两种解决方案。第一个例子是经典的程序处理，而第二个例子则是采用了函数式编程和 ECMA Script 5.1 的数组方法。

例外：往往在重代码性能轻代码维护的情况之下，要选择最优性能的解决方案而非维护性高的方案（比如用简单的循环语句代替 forEach）。

**不推荐**

```js
(function(log){
  'use strict';

  var arr = [10, 3, 7, 9, 100, 20],
      sum = 0,
      i;


  for(i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  log('The sum of array ' + arr + ' is: ' + sum)

}(window.console.log));
```

**推荐**

```js
(function(log){
  'use strict';

  var arr = [10, 3, 7, 9, 100, 20];

  var sum = arr.reduce(function(prevValue, currentValue) {
    return prevValue + currentValue;
  }, 0);

  log('The sum of array ' + arr + ' is: ' + sum);

}(window.console.log));
```

另一个例子通过某一规则对一个数组进行过滤匹配来创建一个新的数组。

**不推荐**

```js
(function(log){
  'use strict';

  var numbers = [11, 3, 7, 9, 100, 20, 14, 10],
      numbersGreaterTen = [],
      i;


  for(i = 0; i < numbers.length; i++) {
    if(numbers[i] > 10) {
      numbersGreaterTen.push(numbers[i]);
    }
  }

  log('From the list of numbers ' + numbers + ' only ' + numbersGreaterTen + ' are greater than ten');

}(window.console.log));
```

**推荐**

```js
(function(log){
  'use strict';

  var numbers = [11, 3, 7, 9, 100, 20, 14, 10];

  var numbersGreaterTen = numbers.filter(function(element) {
    return element > 10;
  });

  log('From the list of numbers ' + numbers + ' only ' + numbersGreaterTen + ' are greater than ten');

}(window.console.log));
```

***

### 使用 ECMA Script 5

建议使用 ECMA Script 5 中新增的语法糖和函数。这将简化你的程序，并让你的代码更加灵活和可复用。

***

### 数组和对象的属性迭代

用 ECMA5 的迭代方法来迭代数组。使用 `Array.forEach` 或者如果你要在特殊场合下中断迭代，那就用 `Array.every`。

```js
(function(log){
  'use strict';

  // Iterate over an array and break at a certain condition
  [1, 2, 3, 4, 5].every(function(element, index, arr) {
    log(element + ' at index ' + index + ' in array ' + arr);

    if(index !== 5) {
      return true;
    }
  });

  // Defining a simple javascript object
  var obj = {
    a: 'A',
    b: 'B',
    'c-d-e': 'CDE'
  };

  // Iterating over the object keys
  Object.keys(obj).forEach(function(element, index, arr) {
    log('Key ' + element + ' has value ' + obj[element]);
  });

}(window.console.log));
```

***

### 不要使用 switch

switch 在所有的编程语言中都是个非常错误的难以控制的语句，建议用 if else 来替换它。

***

### 数组和对象字面量

用数组和对象字面量来代替数组和对象构造器。数组构造器很容易让人在它的参数上犯错。

**不推荐**

```js
// Length is 3.
var a1 = new Array(x1, x2, x3);

// Length is 2.
var a2 = new Array(x1, x2);

// If x1 is a number and it is a natural number the length will be x1.
// If x1 is a number but not a natural number this will throw an exception.
// Otherwise the array will have one element with x1 as its value.
var a3 = new Array(x1);

// Length is 0.
var a4 = new Array();
```

正因如此，如果将代码传参从两个变为一个，那数组很有可能发生意料不到的长度变化。为避免此类怪异状况，请总是采用更多可读的数组字面量。

**推荐**

```js
var a = [x1, x2, x3];
var a2 = [x1, x2];
var a3 = [x1];
var a4 = [];
```

对象构造器不会有类似的问题，但是为了可读性和统一性，我们应该使用对象字面量。

**不推荐**

```js
var o = new Object();

var o2 = new Object();
o2.a = 0;
o2.b = 1;
o2.c = 2;
o2['strange key'] = 3;
```

应该写成这样：

**推荐**

```js
var o = {};

var o2 = {
  a: 0,
  b: 1,
  c: 2,
  'strange key': 3
};
```

***

### 修改内建对象的原型链

修改内建的诸如 `Object.prototype` 和 `Array.prototype` 是被严厉禁止的。修改其它的内建对象比如 `Function.prototype`，虽危害没那么大，但始终还是会导致在开发过程中难以 debug 的问题，应当也要避免。

***

### 自定义 toString() 方法

你可以通过自定义 `toString()` 来控制对象字符串化。这很好，但你必须保证你的方法总是成功并不会有其它副作用。如果你的方法达不到这样的标准，那将会引发严重的问题。如果 `toString()` 调用了一个方法，这个方法做了一个断言[^3] ，当断言失败，它可能会输出它所在对象的名称，当然对象也需要调用 `toString()`。

[^3]: 断言一般指程序员在测试测序时的假设，一般是一些布尔表达式，当返回是 true 时，断言为真，代码运行会继续进行；如果条件判断为 false，代码运行停止，你的应用被终止。


***

### 圆括号

一般在语法和语义上真正需要时才谨慎地使用圆括号。不要用在一元操作符上，例如 `delete`, `typeof` 和 `void`，或在关键字之后，例如 `return`, `throw`, `case`, `new` 等。

***

### 字符串

统一使用单引号(')，不使用双引号(")。这在创建 HTML 字符串非常有好处：

```js
var msg = 'This is some HTML <div class="makes-sense"></div>';
```

***

### 三元条件判断（if 的快捷方法）

用三元操作符分配或返回语句。在比较简单的情况下使用，避免在复杂的情况下使用。没人愿意用 10 行三元操作符把自己的脑子绕晕。

**不推荐**

```js
if(x === 10) {
  return 'valid';
} else {
  return 'invalid';
}
```

**推荐**

```js
return x === 10 ? 'valid' : 'invalid';
```

***

## 系列文章

* [前端编码风格规范之一般规范](//roshanca.com/2014/web-develop-styleguide-general)
* [前端编码风格规范之 HTML](//roshanca.com/2014/web-develop-styleguide-html)
