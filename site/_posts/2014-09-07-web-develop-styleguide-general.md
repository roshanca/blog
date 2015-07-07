---
layout: post
title: 前端编码风格规范之一般规范
data: 2014-09-07
tags: code
comments: true
---

原文：[Web Styleguide - Style guide to harmonize HTML, Javascript and CSS / SASS coding style](https://github.com/gionkunz/chartist-js/blob/develop/CODINGSTYLE.md)

这是一份旨在增强团队的开发协作，提高代码质量和打造开发基石的编码风格规范，其中包含了 HTML, JavaScript 和 CSS/SCSS 这几个部分。

我们知道，当一个团队开始指定并实行编码规范的话，错误就会变得更加显而易见。如果一段特定的代码不符合规范的话，它有可能只是代码风格错误，而也有可能会是 bug。早期指定规范就使得代码审核得以更好的开展，并且可以更精确的地定位到错误。

只要开发者们能够保证源代码源文件都严格遵循规范，那接下去所使用的混淆、压缩和编译工具则可投其所好不尽相同。

***

## 一般规范

以下章节列举了一些可应用在 HTML, JavaScript 和 CSS/SCSS 上的通用规则。

***

### 文件/资源命名

在 web 项目中，所有的文件名应该都遵循同一命名约定。以可读性而言，减号（-）是用来分隔文件名的不二之选。同时它也是常见的 URL 分隔符（i.e. `//example.com/blog/my-blog-entry` or `//s.example.com/images/big-black-background.jpg`），所以理所当然的，减号应该也是用来分隔资源名称的好选择。

请确保文件命名总是以字母开头而不是数字。而以特殊字符开头命名的文件，一般都有特殊的含义与用处（比如 compass[^1] 中的下划线就是用来标记跳过直接编译的文件用的）。

[^1]: Compass 是一个基于 Sass 开源的 CSS 框架，而 Sass 是一个非常流行的 CSS 预编译器。

资源的字母名称必须全为小写，这是因为在某些对大小写字母敏感的操作系统中，当文件通过工具压缩混淆后，或者人为修改过后，大小写不同而导致引用文件不同的错误，很难被发现。

还有一些情况下，需要对文件增加前后缀或特定的扩展名（比如 .min.js, .min.css），抑或一串前缀（比如 `3fa89b.main.min.css`）。这种情况下，建议使用点分隔符来区分这些在文件名中带有清晰意义的元数据。

**不推荐**

```
MyScript.js
myCamelCaseName.css
i_love_underscores.html
1001-scripts.js
my-file-min.css
```

**推荐**

```
my-script.js
my-camel-case-name.css
i-love-underscores.html
thousand-and-one-scripts.js
my-file.min.css
```

***

### 协议

不要指定引入资源所带的具体协议。

当引入图片或其他媒体文件，还有样式和脚本时，URLs 所指向的具体路径，不要指定协议部分（`http:`, `https:`），除非这两者协议都不可用。

不指定协议使得 URL 从绝对的获取路径转变为相对的，在请求资源协议无法确定时非常好用，而且还能为文件大小节省几个字节。

**不推荐**

```html
<script src="http://cdn.com/foundation.min.js"></script>
```

**推荐**

```html
<script src="//cdn.com/foundation.min.js"></script>
```

**不推荐**

```css
.example {
  background: url(http://static.example.com/images/bg.jpg);
}
```

**推荐**

```css
.example {
  background: url(//static.example.com/images/bg.jpg);
}
```

***

### 文本缩进

一次缩进两个空格。

```html
<ul>
  <li>Fantastic</li>
  <li>Great</li>
  <li>
    <a href="#">Test</a>
  </li>
</ul>
```

```css
@media screen and (min-width: 1100px) {
  body {
    font-size: 100%;
  }
}
```

```js
(function(){
  var x = 10;

  function y(a, b) {
    return {
      result: (a + b) * x
    }

  }
}());
```

***

### 注释

注释是**你自己**与你的小伙伴们了解代码写法和目的的唯一途径。特别是在写一些看似琐碎的无关紧要的代码时，由于记忆点不深刻，注释就变得尤为重要了。

编写自解释代码只是一个**传说**，没有任何代码是可以完全自解释的。而代码注释，则是永远也不嫌多。

当你写注释时一定要注意：不要写你的代码都干了些什么，而要写你的代码为什么要这么写，背后的考量是什么。当然也可以加入所思考问题或是解决方案的链接地址。

**不推荐**

```js
var offset = 0;

if(includeLabels) {
  // Add offset of 20
  offset = 20;
}
```

**推荐**

```js
var offset = 0;

if(includeLabels) {
  // If the labels are included we need to have a minimum offset of 20 pixels
  // We need to set it explicitly because of the following bug: http://somebrowservendor.com/issue-tracker/ISSUE-1
  offset = 20;
}
```

一些注释工具可以帮助你写出更好的注释。[JSDoc](http://usejsdoc.org/) 或 [YUIDoc](http://yui.github.io/yuidoc/) 就是用来写 JavaScript 注释用的。你甚至可以使用工具来为这些注释生成文档，这也是激励开发者们写注释的一个好方法，因为一旦有了这样方便的生成文档的工具，他们通常会开始花更多时间在注释细节上。

***

### 代码检查

对于比较宽松自由的编程语言来说，严格遵循编码规范和格式化风格指南就显得极为重要。遵循规范固然很好，但是有自动化流程来确保其执行情况，岂不更佳。Trust is good, control is better.

对于 JavaScript，建议使用 [JSLint](http://www.jslint.com/) 或 [JSHint](http://www.jshint.com/)。

***

## 系列文章

* [前端编码风格规范之 HTML](//roshanca.com/2014/web-develop-styleguide-html)
* [前端编码风格规范之 JavaScript](//roshanca.com/2014/web-develop-styleguide-javascript)
