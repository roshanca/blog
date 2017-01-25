---
layout: post
title: React Native：用 JavaScript 构建应用
data: 2015-03-29
tags: js react
comments: true
---

原文：[Introducing React Native: Building Apps with JavaScript](//www.raywenderlich.com/99473/introducing-react-native-building-apps-javascript)

---

几个月前 Facebook 才刚向世人展露 [React Native](//facebook.github.io/react-native/)：一个用 JavaScript 来构建原生 iOS 应用的框架，现在它的 Beta [版官方源码](https://github.com/facebook/react-native)就已被放上了 github。

人们用 JavaScript 和 HTML5 写 iOS 应用，再用 [PhoneGap](//phonegap.com/) 进行封装，这样的工作模式有一阵子了，React Native 到底有何不同呢？

React Native 完全不是一码事，人们对其带来的两点倍感兴奋：

* 在 React Native 中，虽然你的应用逻辑是用 JavaScript 所写，然而应用的 UI 可完全是原生的；因此你不能用 HTML5 来绘制 UI 了，这是一个妥协。

* React 引入了一种非常大胆新颖的实现方式来构建用户界面。简单来说，应用的 UI 被简单地表示为当前应用的状态的一个方法。

React Native 的关键点是，它主要致力于为移动应用开发带来基于 [React](//facebook.github.io/react/) 编程模式的巨大威力。它的目标并不是成为一个 "一次编写到处运行" 的跨平台工具，它的目标是 "在任何地方都用一个框架”。这是个很重要的差别。这篇教程只针对 iOS，但是一旦你学习到了它的概念创建 Android 应用对你来说应该也不是什么难事。

若你曾经写过 Objective-C 或 Swift，你可能对这项 JavaScript 来替代它们工作的技术不会感到特别兴奋。不过，作为一名 Swift 开发者，上述的第二点应该会激起你的兴趣。

通过 Swift，毫无疑问你已学到了更多函数式的编码算法和那些鼓励你转变或不变的技术。但是，在你构建 UI 的方式上，它与用 Objective-C 开发时并没多大不同：它仍是基于 UIKit 的实现。

通过虚拟 DOM 和反射机制等概念，React 将函数式编程直接带入 UI 层。

本篇教程以构建一个用于搜索英国城市房产登记项目的应用来向大家展示其工作原理。

![](//cdn5.raywenderlich.com/wp-content/uploads/2015/03/PropertyFinder.png)

如果你之前从未写过任何 JavaScript，别担心；此教程会为你讲解每一步的代码原理。React 用 CSS 属性定义样式，一般来说它是足够易读易懂的，但如果需要的话，你可以参考优秀的 [Mozilla 开发网络参考](https://developer.mozilla.org/en-US/docs/Web/CSS)。

想要了解更多？继续阅读吧。

## 准备工作

React Native 框架已经在 Github 上建立了[仓库](https://github.com/facebook/react-native)，你可以通过 git 来克隆到本地，也可以选择下载 zip。一旦将它下载到了本地，在你开始写代码前，还有一些准备工作。

React Native 用到了 [Node.js](https://nodejs.org/)，一个 JavaScript 的运行环境，用来构建你的 JavaScript 代码。如果你还未安装它，那是时候装一个了。

第一步，[安装 Homebrew](//brew.sh/)，按照 Homebrew 网站上的指示做，然后安装 Node.js，你可以通过终端窗口输入：

```
$ brew install node
```

接下来，用 `homebrew` 安装 [watchman](https://facebook.github.io/watchman/)，一个来自 Facebook 的文件 watcher 工具：

```
$ brew install watchman
```

这是 React Native 用来观察代码变化并相应地作出重新构建用的，这好比每次你保存文件后 Xcode 就为你做了一次 build。

React Native 代码在运行之前先要解决它的依赖问题。打开终端窗口定位至 React Native 目录下，并执行：

```
$ npm install
```

这是在用 Node 的包管理器在获取依赖。这与 CocoaPods 和 Carthage 的功能类似。一旦命令运行成功，你会发现一个叫 `node_modules` 的文件夹被创建，大量的外部依赖文件就在其中。

最后一步是启动开发服务。只需在刚才的终端窗口中继续输入：

```
$ npm start
```

一旦执行，你会看到以下信息：

```
$ npm start
 
> react-native@0.1.0 start /Users/colineberhardt/Projects/react-native
> ./packager/packager.sh
 
 
 ===============================================================
 |  Running packager on port 8081.       
 |  Keep this packager running while developing on any JS         
 |  projects. Feel free to close this tab and run your own      
 |  packager instance if you prefer.                              
 |                                                              
 |     https://github.com/facebook/react-native                 
 |                                                              
 ===============================================================
 
 
React packager ready.
```

这就对了，我们有了一个好的开头！将运行着脚本的终端窗口暂时搁置一边，我们继续教程。

此时此刻，我建议你先跑一跑官方的例子，看看环境配置是否都正常运转。用 Xcode 打开 `react-native/Examples/Movies` 目录下的项目文件，编译运行，检查 `Movies` 应用有没有出现问题。

## 你好 React Native

在开始编写这款房产搜索应用之前，你将先创建一个极其简单的 Hello World 应用。在此过程中你将接触许多的组件和概念。

下载并解压缩这篇教程的[起步项目](//cdn5.raywenderlich.com/wp-content/uploads/2015/03/PropertyFinderStarter.zip)，将其移至 `react-native/Examples` 目录下。一旦解压完毕，用 Xcode 打开 `PropertyFinder` 项目文件。先不着急编译运行，你得先写一些 JavaScript。

用你的编辑器打开 `PropertyFinderApp.js` 在文件的开头加入以下这句：

```js
'use strict';
```

用以启动严格模式，它将带来更加严格的错误处理，提醒禁止使用一些不太理想的 JavaScript 语言特性。简而言之，它有助于我们写出更好的 JavaScript 代码。

接下来，加入以下这行：

```js
var React = require('react-native');
```

这将加载 `react-native` 模块并将其赋值给变量 `React`。React Native 采用与 Node.js 相同的模块加载技术，利用 `require` 方法导入。大致类似 Swift 中关联和导入库。

在 `require` 语句下方，加入以下：

```jsx
var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  }
});
```

这句为 "Hello World" 文本单独定义了一个样式。如果你之前做过 web 开发，那你大概都认得这些属性名称。React Native 用[层叠样式表（CSS）](//www.w3schools.com/css/)来定义应用 UI。

回到应用本身！在同一文件中，在刚才的样式申明语句下加入以下代码：

```jsx
class PropertyFinderApp extends React.Component {
  render() {
    return React.createElement(React.Text, {style: styles.text}, "Hello World!");
  }
}
```

是的，这是一个 JavaScript 类！

类概念在 ECMAScript 6 (ES6) 中才被引入。尽管 JavaScript 在不断地进化，web 开发者们仍然被老旧的浏览器的兼容性所限制。React Native 运行在 JavaScriptCore 中，因此，你可以运用现代语言的高级功能，而不必担心老旧浏览器不支持的问题。

`PropertyFinderApp` 扩展自 `React.Component`, React 最基础的 UI 组件。组件包含了不可变的属性，和可变的状态变量，并且曝露了一个用来渲染组件的方法。目前应用足以简单，只需一个渲染方法。

React Native 组件不属于 UIKit 类，但它们是有一些异曲同工。框架会将 React 组件树转化为所需的原生 UI。

最后，在文件底部加入：

```js
React.AppRegistry.registerComponent('PropertyFinderApp', function() { return PropertyFinderApp });
```

`AppRegistry` 定义了一个指向应用的入口并且提供了根组件。

保存 `PropertyFinderApp.js` 的改动，并回到 Xcode。确保 `PropertyFinder` 配置中指定过了具体的 iPhone 模拟器后，就可以开始编译运行了。没过几秒你就可以看见你的 “Hello World” 应用：

![](//cdn2.raywenderlich.com/wp-content/uploads/2015/03/react-helloworld.png)

那个跑在模拟器中的 JavaScript 应用，被渲染成了原生 UI，根本看不见浏览器的存在！

还是信不过我？:] 你可以自己验证：在 Xcode 中，选择菜单 `Debug\View Debugging\Capture View Hierarchy` 看一看原生视图的层级结构。你在任何地方都找不到 `UIWebView` 的实例。

![](//cdn4.raywenderlich.com/wp-content/uploads/2015/03/ViewDebugging.png)

是不是对其背后的运作原理感到好奇？在 Xcode 中打开 `AppDelegate.m` 并定位到 `application:didFinishLaunchingWithOptions:` 这句，这个方法构建了一个 `RCTRootView`，它加载了 JavaScript 应用并渲染了其对应的 view。

当应用开始运行时，`RCTRootView` 从以下 URL 来加载应用：

```
http://localhost:8081/Examples/PropertyFinder/PropertyFinderApp.includeRequire.runModule.bundle
```

回想起在教程开始时当你在终端窗口中执行 `npm start` 了吧，它其实是开启了一个容器和服务用以处理以上请求。

在 Safari 中打开这个 URL，你可以看到应用的 JavaScript 代码。你应该能找到你的 “Hello World” 应用代码，被包围在 React Native 框架代码之中。

当你的应用运行时，这段代码会被框架的核心加载与执行。在你的应用中，会加载 `PropertyFinderApp` 组件，然后构建原生 UIKit 视图。你会在接下来的教程中学到更多相关的内容。

## Hello World JSX

你的应用目前采用 `React.createElement` 来构建简单 UI，通过它 React 转变为相应的原生应用。你的 JavaScript 代码在当前格式下的可读性，不一会儿就会被更为复杂的多层嵌套的 UI 所迅速打破。

确保应用还在运行中，回到编辑器重新编辑 `PropertyFinderApp.js`。修改你的组件渲染方法中的 `return` 语句：

```jsx
return <React.Text style={styles.text}>Hello World (Again)</React.Text>;
```

这是 [JSX](//facebook.github.io/react/docs/jsx-in-depth.html)，或是 JavaScript 语法扩展，它采用类 HTML 语法来混入你的 JavaScript 代码中。如果你是一名 web 开发者，你会对此感到非常熟悉。我们将在接下来的通篇文章中都使用 JSX 语法。

保存 `PropertyFinderApp.js` 并回到模拟器中，按下 `Cmd+R` 你会发现你的应用刷新了界面将信息更新为了“Hello World (Again)”。

重新运行 React Native 应用方便至极，就像刷新浏览器一般简单！:]

从此只需关注 JavaScript 文件，一直保持着程序运行，在对 `PropertyFinderApp.js` 修改保存后，简单的刷新调试。

Okay，“Hello World” 玩够了，接下来尝试写个真正的应用吧！

## 添加导航

房产查找应用采用的是那一套基于标准导航栈的行为体验，提供自 UIKit 的导航控制器。是时候添加这项行为了。

在 `PropertyFinderApp.js` 中，重新命名 `PropertyFinderApp ` 为 `HelloWorld`：

```jsx
class HelloWorld extends React.Component { ...
```

保持 “Hello World” 文本再显示一会儿，但它将不再是你的应用的根组件了。

接下来在 `HelloWorld` 组件下方增加以下类：

```jsx
class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={% raw %}{{{% endraw %}
          title: 'Property Finder',
          component: HelloWorld,
        }}/>
    );
  }
}
```

这构建了一个导航控制器，应用了样式，设定了初始路由指向 `HelloWorld` 组件。在 web 开发中，`路由` 是一项用来定义应用导航组织结构的技术：在此应用中，哪些页面，或路由被映射至 URLs。

在同一文件中，更新样式申明以包含 container 样式：

```jsx
var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});
```

稍后你会看到关于 `flex: 1` 的介绍。

让我们回到模拟器并且按下 `Cmd+R` 发现 UI 变成了这样：

![](//cdn4.raywenderlich.com/wp-content/uploads/2015/03/react-helloworldagain.png)

这是导航控制器与其根视图，它目前为 “Hello World” 文本。棒极了 —— 你现在为你的应用添加了适宜的基础导航结构，该到时候添加“真正”的 UI 了！

## 创建搜索页

为工程新增名为 `SearchPage.js` 的文件，放置在与 `PropertyFinderApp.js` 同一目录中。为此文件添加以下代码：

```js
'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;
```

你已经在之前见过了严格模式的定义与 react-native 的导入，但接下来的赋值语句可是全新的。

这是**解构赋值语句**，它让你抽取出多个对象属性并用单条语句将其赋值给变量。所以，接下来你的代码中，可置 `React` 前缀。打个比方，你可以通过 `React.StyleSheet` 直接引用到 `StyleSheet`。解构赋值对于操作数组也是颇有用处，它也是[非常值得学习的](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)。

回到 `SearchPage.js` 文件，添加以下代码：

```jsx
var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});
```

同样的，这些是标准的 CSS 属性。像这样设置样式不如用界面构建工具来的直观，但它好过在你的 `viewDidLoad()` 方法中一个接着一个来设置视图属性！:]

在样式下方添加组件自身代码：

```jsx
class SearchPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
      </View>
    );
  }
}
```

`render` 是 JSX 和与之提供的结构的重大示例。透过这样的方式，你可以对这些组件构建成的 UI 一目了然：一个容器两个文本标签。

最后，我们在文件的结尾处添加：

```js
module.exports = SearchPage;
```

用以输出 `SearchPage` 类，它规定了其它文件允许引用的部分。

接着的步骤是要更新应用的路由以便初始化路由。

打开 `PropertyFinderApp.js`，在文件顶部 `require` 方法后加入：

```js
var SearchPage = require('./SearchPage');
```

`PropertyFinderApp` 类中的 `render` 方法内，更新 `initialRoute` 以引用新增页面，如下所示：

```
component: SearchPage
```

此刻你可以移除 `HelloWorld` 类和与之相关的样式了。如过你愿意，你将再也不需要那段代码了。

回到模拟器，敲打 `Cmd+R` 查看新 UI：

![](//cdn1.raywenderlich.com/wp-content/uploads/2015/03/react-searchstarter.png)

这就是运用了的新组件：`SearchPage`，你刚刚添加的。

## 用 Flexbox 定义样式

到目前为止，你已经见过了基础的 CSS 属性诸如 margins，paddings 和 color，但你可能不太熟悉 `flexbox`， 这是不久前才被加入 CSS 规范的属性，它对于应用 UI 排版布局那是相当的有用处。

React Native 采用了 [css-layout](https://github.com/facebook/css-layout) 库，一个 JavaScript 对于 flexbox 标准的实现，它将布局转化成 C (for iOS) 和 Java (for Android)。

它很了不起，因为 Facebook 已将其作为一个独立的项目来进行开发维护，旨在多种语言。自此诞生了不少新奇的应用，比如[在 SVG 上应用 flexbox 布局](//blog.scottlogic.com/2015/02/02/svg-layout-flexbox.html)（是的，那是我的作品...但噢不，我难尝饱眠已久）。

在你的应用中，容器拥有默认的列布局，这意味着它的子元素是按垂直堆叠排列的，像这样：

![](//cdn3.raywenderlich.com/wp-content/uploads/2015/03/FlexStack.png)

这被称为**主轴**，它的排列可垂直可水平。

每个子元素的垂直位置，由其 margin，height 和 padding 来共同决定。容器也设置了 `alignItems` 属性为 `center`，这将影响其水平轴交叉轴上的排列，导致文本居中。

该为其加上输入框和按钮了。打开 `SearchPage.js`，在第二个 `Text` 元素的闭合标签后加入以下代码：

```jsx
<View style={styles.flowRight}>
  <TextInput
    style={styles.searchInput}
    placeholder='Search via name or postcode'/>
  <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
    <Text style={styles.buttonText}>Go</Text>
  </TouchableHighlight>
</View>
<TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
  <Text style={styles.buttonText}>Location</Text>
</TouchableHighlight>
```

目前你已增加了两个顶级视图：一个拥有着一文本输入框和一按钮，另一个只包含了一按钮。一会儿再跟你解释如何定义这些元素样式的。

接下来，添加相应的样式到你的 `styles` 定义中：

```coffeescript
flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
}
```

格外小心它的格式，每一个样式属性定义块后必须用逗号来隔开。这意味着在 `container` 的样式定义结尾处也要有逗号。

这些样式将应用在你刚添加的输入框和按钮上。

回到模拟器按下 `Cmd+R` 以刷新 UI：

![](//cdn3.raywenderlich.com/wp-content/uploads/2015/03/react-searchpageinput.png)

文本域和 "Go" 按钮要并列一排，所以你要将其都包裹在同一容器中，并给容器增加 `flexDirection: 'row'` 的样式。不要为输入框和按钮设置具体的宽度，取而代之的是给它们一个 `flex` 值。文本域设置为 `flex: 4`，与此同时将按钮设置为 `flex: 1;`，所以它们的宽度是 4:1 比例。

你也许注意到了这些按钮，并不是真正的按钮！:] 在 UIKit 中，原生按钮比标签更不易点击，因此 React Native 团队决定直接在 JavaScript 中构建按钮来的更容易一些。在你的应用中，按钮使用 `TouchableHighlight` 来构建，这是一个 React Native 组件，当它被点击时它会变得透明从而使得其底层的颜色显露出来。

最后，完善应用搜索页面还差一张房子的图片。在 `location` 按钮的 `TouchableHighlight` 组件后加入：

```coffeescript
<Image source={require('image!house')} style={styles.image}/>
```

现在，在样式列表中增加图片相应的样式，别忘了它与它之前的样式定义之间要加入逗号。

```coffeescript
image: {
  width: 217,
  height: 138
}
```

语句 `require('image!house')` 用以引用定位在应用静态资源目录下的图片资源的。在 Xcode 中，打开 `Images.xcassets` 你会发现以上代码引用的 "house" 图标。

回到模拟器按下 `Cmd+R` 欣赏你的新 UI 吧：

![](//cdn2.raywenderlich.com/wp-content/uploads/2015/03/react-searchpagehouse.png)

现在你的应用看上去不错，但缺少相应的功能。所以当务之急是增加应用的状态和表现行为。

## 增加组件状态

每一个 React 组件都有自己的状态对象，它以键值的形式作为存储。在一个组件被渲染之前，我们必须先设置它的初始状态。

在 `SearchPage.js` 中，为 `SearchPage` 类加入以下代码，加在 `render()` 之前：

```js
constructor(props) {
  super(props);
  this.state = {
    searchString: 'london'
  };
}
```

组件当前拥有了 `state` 变量，其中的 `searchString` 被设置成了一个初始值：`london`。

看看怎么使用这个组件状态的。在 `render` 中，用以下代码替换 `TextInput` 元素：

```jsx
<TextInput
  style={styles.searchInput}
  value={this.state.searchString}
  placeholder='Search via name or postcode'/>
```

此处将 `TextInput` 的 value 属性 —— 那是向用户展示文本用的 —— 设置为了当下 `searchString` 状态变量的值。这只是用以处理初始状态的设置，那接下来当用户编辑本文又会发生什么呢？

第一步是为此动作创建一个事件方法。在 `SearchPage` 类定义中增加如下方法：

```jsx
onSearchTextChanged(event) {
  console.log('onSearchTextChanged');
  this.setState({ searchString: event.nativeEvent.text });
  console.log(this.state.searchString);
}
```  

这可从事件的 `text` 属性获取值并且用它来更新组件状态，同时也增加了一些打印信息的代码用以测试。

为使文本变化时方法被调用，回到在 `render` 方法中的 `TextInput` 元素上，我们为其增添 `onChange` 属性，它看起来成了这样：

```jsx
<TextInput
  style={styles.searchInput}
  value={this.state.searchString}
  onChange={this.onSearchTextChanged.bind(this)}
  placeholder='Search via name or postcode'/>
```

只要用户一改变输入文本，`onChange` 即刻被触发，`onSearchTextChanged` 方法被执行。

在你刷新应用前我们再做一步操作：将下列打印语句加入到 `render()` 顶部，`return` 之前：

```js
console.log('SearchPage.render');
```

你稍后会对这些打印语句有所了解的！:]

回到模拟器，按下 `Cmd+R`，你应该看到输入框内的初始文本显示为 "london" 并且一旦对其进行编辑一些调试语句就被打印在了 Xcode 的控制台里。

![](//cdn3.raywenderlich.com/wp-content/uploads/2015/03/react-renderconsole.png)

查看以上截图，打印语句的顺序有些奇怪：

1. 初始调用 `render()` 以创建视图。
2. 当文本改变时执行 `onSearchTextChanged()`。
3. 接着更新组件状态反应在新的输入框文本上，后者又触发了另一轮 render。
4. `onSearchTextChanged()` 在日志中输出新的搜索字符串。

无论何时，只要是应用一更新任意组件的状态，它都将会触发整个 UI 进行重新渲染，在此期间，所有组件的 `render` 方法都会调用执行。这是一个很赞的思路，因为它完全地对渲染逻辑进行了解耦，这些逻辑由影响 UI 的状态变化所产生。

在其它众多的 UI 框架中，要么是由你负责手动地更新基于 UI 的状态变化，要么是利用某种绑定框架来创建一个的应用状态和它的 UI 呈现之间内在关联。

看，举个例子，我的文章：实现[在 ReactiveCocoa 中的 MVVM 模式](//www.raywenderlich.com/74106/mvvm-tutorial-with-reactivecocoa-part-1)。

用 React，你不必再为究竟是哪一部分的 UI 也许受到了状态变化的影响而感到担心，整个 UI 都像是作为一个你的应用状态的方法函数来进行简单传递。

这一刻你可能会指出这套概念当中的一个缺点。没错，就是 —— 性能。

当然了你不可能删除整个 UI 再重新生成，每次一有状态改变就这么做？这可是 React 聪明之处。每一次 UI 渲染，它都会将渲染方法返回的视图树与当前的 UIKit 视图进行比对。比对的结果中相差异的部分才是 React 需要对当前视图做出更新的部分，也就是说，只有改动的一小部分才会被真正的重新渲染生成。

令人刮目相看的是这新奇的理念使得 ReactJS 如此独特 —— 虚拟 DOM (文档对象模型, web 文档的可视树)和反射机制 —— 运用在 iOS 应用之中。

你可以到时候再回头看这些东西，我们仍要继续完善当前的 app。删除打印信息语句，你不再需要它们来扰乱你的代码了。

## 开始搜索

为了实现搜索功能你需要在 “Go” 按钮的点击事件上做些文章。创建一个合适的 API 请求，并且为用户在此数据查询的等待过程中提供一个可视化的指示界面。

在 `SearchPage.js` 中，更新初始状态：

```js
this.state = {
  searchString: 'london',
  isLoading: false
};
```

新增的 `isLoading` 属性用来跟踪数据查询是否完成。

将以下逻辑加入到 `render` 的开头：

```jsx
var spinner = this.state.isLoading ?
  ( <ActivityIndicatorIOS
      hidden='true'
      size='large'/> ) :
  ( <View/>);
```

这是一个三元的 `if` 判断语句，它的执行结果不是增加一个动态指示器就是一个空视图，这取决于组件的 `isLoading` 状态。因为整个组件每次都会渲染，所以你可以对 JSX 和 JavaScript 逻辑代码随意混用。

JSX 在 `return` 中定义的搜索 UI 里，加入下列一行，位于 `Image` 下方：

```jsx
{spinner}
```

现在，在 `TouchableHighlight` 包裹着的 "Go" 文本视图上增加以下属性：

```jsx
onPress={this.onSearchPressed.bind(this)}
```

接着，在 `SearchPage` 类里添加以下方法：

```js
_executeQuery(query) {
  console.log(query);
  this.setState({ isLoading: true });
}
 
onSearchPressed() {
  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
  this._executeQuery(query);
}
```

`_executeQuery()` 会执行最终的查询，但现在我们先让它简单地输出一些信息在控制台里，并将 `isLoading` 设置设置为 `true` 以便 UI 更新。

当 "Go" 按钮被点击时，`onSearchPressed()` 将被执行以开展查询。

最后，在 `SearchPage` 类申明之前加入以下工具类方法：

```js
function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return '//api.nestoria.co.uk/api?' + querystring;
};
```

这个方法不依赖于 `SearchPage`，所以它以一个独立的函数而不是一个类方法的形式存在。它一开始创建了基于参数的查询字符串在 `data` 之中，接下来它将数据转换成要求的字符串格式，`name=value`结队成组并用 & 字符连接着。这里的 `=>` 语法是表示一个箭头函数，这是[新近加入的 JavaScript 语言](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)中用以创建匿名函数的简要语法。

回头看模拟器，按下 `Cmd+R` 重新载入应用并点击 "Go" 按钮，你将能看到旋转的动态指示器。查看 Xcode 控制台，你将看到如下：

![](//cdn1.raywenderlich.com/wp-content/uploads/2015/03/SearchAcitivityIndicator.png)

菊花图展现在视图中数据请求 URL 显示在控制台日志里。复制粘贴这段 URL 到你的浏览器中看看结果如何。你将会看到大段的 JSON 对象，别担心 —— 你不必了解它！你将编写代码解析它。

下一步我们在应用中处理这项请求。

## 处理 API 请求

还是在 `SearchPage.js` 中，更新初始状态，在构造方法中加入 `message` 变量：

```js
this.state = {
  searchString: 'london',
  isLoading: false,
  message: ''
};
```

在 `render` 中，在 UI 底部加入：

```js
<Text style={styles.description}>{this.state.message}</Text>
```

它为向用户显示了信息条数。

在 `SearchPage` 类中，加入以下代码到 `_executeQuery()` 结尾处：

```js
fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error => 
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
```

这里采用了 `fetch` 函数，它是 [Web API 中的一部分](https://fetch.spec.whatwg.org/)，提供了大量改进的针对 `XMLHttpRequest` 的 API。异步响应将以一个 [promise](http://www.html5rocks.com/en/tutorials/es6/promises/) 的形式返回，在成功回路中将解析的 JSON 提供给一个接下来要新增的方法。

最后一步是增加下列方法到 `SearchPage`：

```js
_handleResponse(response) {
  this.setState({ isLoading: false , message: '' });
  if (response.application_response_code.substr(0, 1) === '1') {
    console.log('Properties found: ' + response.listings.length);
  } else {
    this.setState({ message: 'Location not recognized; please try again.'});
  }
}
```

这将清除 `isLoading` 状态和请求成功后显示在调试日志内的房产数量信息。

保存你的修改，然后回到模拟器刷新之，试着搜索关键字 "london"，你应该能在日志中看到 20 处房产已被找到的信息。接下来试着搜索一个不存在的地点，比如 "narnia"，迎接你的将是以下信息：

![](//cdn5.raywenderlich.com/wp-content/uploads/2015/03/react-narnia.png)

到了展现这伦敦真实位置的 20 处房产的时刻了。

## 展示结果

创建一个 `SearchResults.js` 文件，加入以下代码：

```js
'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Image, 
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;
```

对，没错，一个包含着 `react-native` 模块的 `require` 语句，还有一个解构赋值。这些都在之前提过了对吧？

接着添加组件自身：

```jsx
class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }
 
  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
          <Text>{rowData.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
 
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}
```

以上代码使用到了更加特殊的组件 —— `ListView` —— 它在一个可滚动的容器中展现多排数据，类似 `UITableView`。你可以通过 `ListView.DataSource` 和一个方法来向 `ListView` 提供数据，这个方法每一行数据提供 UI 的实现。

构建数据源时，你应当提供一个能两两比较行 id 的方法。`ListView` 用此在核对进程中来明确列表数据的具体改动。在这种情况下，Nestoria 房产的 API 所返回的 `guid` 属性，正好符合这一目的。

现在增加模块输出定义在文件底部：

```js
module.exports = SearchResults;
```

增加以下代码至 `SearchPage.js` 文件顶部位置，插入在用以请求 React 的 `require` 之下：

```js
var SearchResults = require('./SearchResults');
```
这样做使得我们在 `SearchPage` 中得以运用刚才添加的 `SearchResults` 类。

修改当前的 `_handleResponse` 方法，将 `console.log` 语句替换为下列代码：

```js
this.props.navigator.push({
  title: 'Results',
  component: SearchResults,
  passProps: {listings: response.listings}
});
```

以上代码将为你导航到新增的 `SearchResults` 组件并通过 API 请求来为列表传递数据。使用 `push` 方法可保证搜索结果页被推入之导航栈中，这意味着你可以通过返回按钮来回到根目录。

回到模拟器刷新并搜索，展现在你面前的是一份房产列表：

![](//cdn4.raywenderlich.com/wp-content/uploads/2015/03/react-searchresults1.png)

很高兴得到了我们期望已久的房产列表，但这列表展示略挫，让我们来让它变的更好一些。

## 接触样式

这些 React Native 代码自此应该一回生二回熟了，以此以下教程可以两步并作一步来快速讲解。

在 `SearchResults.js` 中的解构赋值语句后添加以下样式定义：

```js
var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});
```

以上定义了每一行即将要被渲染的列表样式。

接着用以下代码替换 `renderRow()` 方法：

{% raw %}
```jsx
renderRow(rowData, sectionID, rowID) {
  var price = rowData.price_formatted.split(' ')[0];
 
  return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
          <View  style={styles.textContainer}>
            <Text style={styles.price}>£{price}</Text>
            <Text style={styles.title} 
                  numberOfLines={1}>{rowData.title}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
  );
}
```
{% endraw %}

这对返回的价格数据做了一点操作，将其 "300,000 GBP" 固定格式中的 GBP 后缀给去掉。然后渲染每一行 UI 采用的是你已熟烂于心的技术了。这一次，略缩图的数据是以 URL 的方式提供的，React Native 不会在主线程对其进行解码。

注意 `TouchableHighlight` 组件的 `onPress` 属性，它利用了箭头函数来获取每一行的 `guid`。

最后我们增加 press 的处理方法：

```js
rowPressed(propertyGuid) {
  var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];
}
```

这个方法能定位哪一行房产正被用户点击中。目前它还起不了作用，一会我们再来修复它。但现在，我们来欣赏下你的作品吧。

回到模拟器刷新，来看看你的搜索结果页吧：

![](//cdn4.raywenderlich.com/wp-content/uploads/2015/03/react-searchresults2.png)

看上去好很多了 —— 虽然这让人感到惊奇谁能住的起伦敦！

到了添加应用最后的视图的时候了。

## 房产详细页视图

增加新文件 `PropertyView.js` 到项目中，接着在文件中加入代码：

```js
'use strict';
 
var React = require('react-native');
var {
  StyleSheet,
  Image, 
  View,
  Text,
  Component
} = React;
```

我敢确定这些都已无需再过多介绍，你在梦里都做到了！:]

接下来增添下列样式：

```js
var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});
```

再来增加组件：

{% raw %}
```jsx
class PropertyView extends Component {
 
  render() {
    var property = this.props.property;
    var stats = property.bedroom_number + ' bed ' + property.property_type;
    if (property.bathroom_number) {
      stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1
        ? 'bathrooms' : 'bathroom');
    }
 
    var price = property.price_formatted.split(' ')[0];
 
    return (
      <View style={styles.container}>
        <Image style={styles.image} 
            source={{uri: property.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>£{price}</Text>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{stats}</Text>
        <Text style={styles.description}>{property.summary}</Text>
      </View>
    );
  }
}
```
{% endraw %}

第一部分的 `render()` 方法处理数据操作。通常来讲，由 API 返回来的数据往往不是很完美，所以我们要写一些简单的逻辑来处理得到我们想要的数据格式。

其余的 `render` 不用说也很简单，它是一个组件的不可变状态的方法。

最后我们在文件底部加上输出：

```js
module.exports = PropertyView;
```

回到 `SearchResults.js` 并增加 `require` 语句在文件头部，紧随 React `require` 这一行：

```js
var PropertyView = require('./PropertyView');
```

接下来更新 `rowPressed()` 将导航转向你新增的 `PropertyView`：

```js
rowPressed(propertyGuid) {
  var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];
 
  this.props.navigator.push({
    title: "Property",
    component: PropertyView,
    passProps: {property: property}
  });
}
```

你懂的，回到模拟器按下 `Cmd+R`，一路搜索查看下来，你会看到：

![](//cdn4.raywenderlich.com/wp-content/uploads/2015/03/react-property.png)

负担的起的生活才是最好滴 —— 那个软垫真好看！（译者注：作者你又调皮了）

至此你的应用已基本完成。还差一步就是允许用户搜索其周边房产。

## 基于地理位置的搜索

在 Xcode 中，打开 `Info.plist` 新增一个键，通过点击右键选择 `Add Row` 来完成。键名为 `NSLocationWhenInUseUsageDescription`，并用取值为：

```
PropertyFinder would like to use your location to find nearby properties
```

这是你完成后 plist 文件的样子：

![](//cdn5.raywenderlich.com/wp-content/uploads/2015/03/Screen-Shot-2015-03-20-at-21.49.06.png)

这副键值是用来提示用户确认是否要使用他们的地理位置的。

打开 `SearchPage.js`，定位到 "Location" 按钮的 `TouchableHighlight` 上，加入以下属性值：

```js
onPress={this.onLocationPressed.bind(this)}
```

当你点击这个按钮时，它将执行 `onLocationPressed` —— 接下来要添加的。

在 `SearchPage` 类中添加：

```js
onLocationPressed() {
  navigator.geolocation.getCurrentPosition(
    location => {
      var search = location.coords.latitude + ',' + location.coords.longitude;
      this.setState({ searchString: search });
      var query = urlForQueryAndPage('centre_point', search, 1);
      this._executeQuery(query);
    },
    error => {
      this.setState({
        message: 'There was a problem with obtaining your location: ' + error
      });
    });
}
```

用户当前位置通过 `navigator.geolocation` 被取回，这是一个被 [Web API 定义](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)的接口，所以它对于曾在浏览器当中用过定位服务的人来说非常熟悉了。React Native 框架提供了自身对原生 iOS 定位服务的 API 实现。

如果当前位置被成功捕获，将执行第一个箭头函数，它向 Nestoria 发起了一个查询请求。如果出错，它将显示一个基本的报错信息。

一旦你更改了 plist 文件，就必须重启应用才能生效。`Cmd+R` 无效了这回 —— 抱歉。在 Xcode 停止运行应用，重新构建运行。

在使用基于定位服务的搜索时，你的具体位置必须是在 Nestoria 房产公司的数据库中。从模拟器的菜单选项中选择 `Debug\Location\Custom Location...` 并输入维度 `55.02` 和经度 `-1.42`，这坐标来自英格兰北部的一座海滨小镇，我称之为故乡！

![](//cdn1.raywenderlich.com/wp-content/uploads/2015/03/WhitleyBaySearch-647x500.png)

虽然不如伦敦 —— 但起码住的起！:]

## 接下来该做什么？

恭喜你完成了第一个 React Native 应用！你可以[下载本教程的最终完成项目](//cdn1.raywenderlich.com/wp-content/uploads/2015/03/PropertyFinder-Final1.zip)跑起来试试。

如果你来自 Web 界，你会发现用 JavaScript 和 React定义界面和导航并从中获得完整的原生 UI 是多么地容易。但如果你是原生应用的开发者，我希望你能从 React Native 获得一点感官上的启发：快速应用迭代，现代的 JavaScript 语言和清晰的 CSS 样式。

也许你希望用这套框架来写你下一个应用？亦或，你仍坚持 Swift 或 Objective-C? 无论你选择哪条路，我都希望你能从这篇文章中受益，并且能为你今后的项目中带来一些想法。

如果对本篇教程有任何的意见或建议，请加入论坛[^1]来讨论。

[^1]: 译者注：抱歉，根本没发现任何的论坛链接，估计作者说的是文章下方的留言区。
