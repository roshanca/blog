---
layout: post
title: "用 Canvas 实现一个极简贪食蛇"
date: 2020-05-20 23:43:09 +0800
tags: javascript canvas game
toc: true
comments: false
---

## 前言

笔者曾经在学习 TS 时写过一个[贪食蛇小游戏](/2015/write-a-simple-snake-game-with-typescript/)，但那是基于 DOM 的，代码较为啰唆（毕竟是用来学习基于静态类型的 TS）。这次无意间看见网上某位高人写的贪食蛇小游戏，寥寥几行代码搞定，叹为观止。初看代码，是很大程度地利用了 JS 弱语言的灵活度，以少量代码做了大量的工作，是真正体现了 JS 在脚本领域无人能敌的强大本领。

先来看看 👉 [Demo](https://lab.roshanca.com/greedy-snake/)。

接下来晒下代码，然后做一些思路解读，以便于理解其原理。

首先用 HTML 和 CSS 布置好画布（Canvas）:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake Game</title>
  <link rel="stylesheet" href="./index.css">
</head>
<body>
  <canvas width="400" height="400">Sorry, your browser does not support canvas</canvas>
  <script src="./index.js"></script>
</body>
</html>
```

```css
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
}

canvas {
  background-color: black;
}
```

通过以上代码我们在页面中央开辟了一块 400 × 400 像素的黑底画布。以 20 × 20 做为一个基本单位，将画布划分为 20 行 20 列的方阵。如图所示：

![](https://s10.mogucdn.com/mlcdn/c45406/200520_6cbd63jcb3a6heed1a4chig2h77eg_1332x1324.png)

大体的思路就是用绿色来填充这些小格子来表示蛇身，用黄色的一格来代表随机出现的食物。蛇身要动，要有个定时器，按一定的频率去更新画布。

```js
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas')
const box = canvas.getContext('2d')

let snake = [41, 40]
let food = 43
let direction = 1
let n

const draw = (seat, color) => {
  box.fillStyle = color
  box.fillRect((seat % 20) * 20 + 1, ~~(seat / 20) * 20 + 1, 18, 18)
}

document.onkeydown = (evt) => {
  direction =
    snake[1] - snake[0] == (n = [-1, -20, 1, 20][(evt || event).keyCode - 37] || direction)
      ? direction
      : n
}

!(function () {
  snake.unshift((n = snake[0] + direction))

  if (
    snake.indexOf(n, 1) > 0 ||
    n < 0 ||
    n > 399 ||
    (direction == 1 && n % 20 == 0) ||
    (direction == -1 && n % 20 == 19)
  ) {
    return alert('GAME OVER!')
  }

  draw(n, 'lime')

  if (n == food) {
    while (snake.indexOf((food = ~~(Math.random() * 400))) > 0);
    draw(food, 'yellow')
  } else {
    draw(snake.pop(), 'black')
  }

  setTimeout(arguments.callee, 150)
})()
```

通常这种情况下我们都拿二维数组来代表一个点，或一个格子，比如 `[0, 0]` 就是左上角第一个格子。但这次不一样，作者是按从左到右，至上而下，依次来标记这些格子的，这样我们就标记出了 0~399 个格子。

## 画蛇不添足

```js
let snake = [41, 40]
let food = 43
let direction = 1
let n
```

蛇身用一维数组来表示即可。`food` 代表食物出现的位置，`direction` 表示蛇头下一次运动的转向位移量。最有意思的是这个 `n`，它是用来记录蛇身单位时间内的移动位移，也就是蛇运动动画当前帧的绘制目标格子。看到这一行：

```js
snake.unshift((n = snake[0] + direction))
```

这里是两步操作：

1. 先将蛇头根据方向转向获取到下一步的位移量，赋值给 `n`;
2. 蛇身把下一步的位移 `n` 做为新的蛇头，加入到一维数组里。

这里还比较好理解。那么接下来看到如何在 canvas 上画格子：

```js
const draw = (seat, color) => {
  box.fillStyle = color
  box.fillRect((seat % 20) * 20 + 1, ~~(seat / 20) * 20 + 1, 18, 18)
}

...

draw(n, 'lime')
```

根据 20 × 20 的划分标记，我们通过 `seat / 20` 取整来得到行，`seat % 20` 来获得列。行和列应该都是 0~19 之间的整数。如果用 `row` 和 `col` 分别表示其行和列的结果，按道理应该是这般绘制：`box.fillRect(col * 20, row * 20, 20, 20)`——这是画满格的情况。留个一像素的内边距，就是原示例中的写法。

```js
if (n == food) {
  ...
} else {
  draw(snake.pop(), 'black')
}
```

后续 `n == food` 时表示蛇吃到食物，那就进入到再随机生成食物的逻辑。结合 else 的逻辑，通篇看下来现在我们可以把在一帧内的蛇身操作放在一起看了：

```js
// next step
n = snake[0] + direction

// append head
snake.unshift(n)

// cut off tail
snake.pop()
```

## direction

`direction` 的计算也颇为巧妙：

```js
document.onkeydown = (evt) => {
  direction =
    snake[1] - snake[0] == (n = [-1, -20, 1, 20][(evt || event).keyCode - 37] || direction)
      ? direction
      : n
}
```

数组 `[-1, -20, 1, 20]` 做为四个方向的位移量[^1]，而 `(evt || event).keyCode - 37` 做为其索引值，按不同方向键可以取到其对应的偏移量。

[^1]: 分别为：左、上、右、下。

```js
[-1, -20, 1, 20][(evt || event).keyCode - 37] || direction
```

这里的巧妙之处在于**如果按下的按键不是方向键，在数组中将得不到对应的值**。所以 `...|| direction` 这步操作，可以使得 `n` 取到原来 `direction` 的值，而不是 `undefined`。所以此时 `n` 的取值，要么是数组 `[-1, -20, 1, 20]` 中的某个值，要么就是前一个 `direction` 的值。

```js
snake[1] - snake[0] == ... ? direction : n
```

我们已经能很完美地拿到 `n` 的值了，那上面的这个三元判断又是怎么回事呢？答案是防反转。就是当按键方向与蛇运动方向相反时，如果没有这个判断的话，就会错乱。`snake[1] - snake[0]` 可视为当前的反方向，即 `-direction`，如果此时 `n` 真的取值为 `-direction`，则需将其矫正为 `direction`。

## 条件判断

好了，其它就较为简单了。

```js
// GAME OVER 的判断条件

if (
  // 蛇头碰到自身
  snake.indexOf(n, 1) > 0 ||
  // 碰到上边界
  n < 0 ||
  // 碰到下边界
  n > 399 ||
  // 碰到右边界
  (direction == 1 && n % 20 == 0) ||
  // 碰到左边界
  (direction == -1 && n % 20 == 19)
) {
  return alert('GAME OVER!')
}
```

```js
while (snake.indexOf((food = ~~(Math.random() * 400))) > 0);

// 这句可翻译为
do {
  food = ~~(Math.random() * 400)
} while (snake.indexOf(food) > 0);
```

在随机生成 food 位置的同时，也避免了生成位与蛇身重合的问题。

## IIFE

看到最后一部分：

```js
!(function () {
  ...
})()
```

这是一个立即执行函数（IIFE），这里有[介绍](/2012/traps-in-javascript-part-I#坑五函数的自执行)。

顺便提一下其中的 `arguments.callee`，指的是：

> 引用参数所属的当前执行函数 —— [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

所以这里 `setTimeout` 就能让这段函数不停地执行下去。当然我们也可以换作 `setInterval` 来实现。
