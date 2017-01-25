---
layout: post
title: 用 TypeScript 写一个贪食蛇小游戏
data: 2015-09-03
tags: javascript typescript
comments: true
---

## TypeScript & VS code

已经忘了是如何缘结 [TypeScript](http://www.typescriptlang.org/) 的了，应该是偶然使用过 [Visual Studio Code](https://code.visualstudio.com/) 这款优秀的 IDE 才认识 TS 的吧。目前还是 Preview 版本的 VS code，集众多优秀卓越的功能特性，已经深深地征服了我，在它身上看不到一点以往对微软的那种繁冗晦涩质感，取而代之的是轻灵优美且功能上不乏先进之处。有关 VS code 这是后话，下面先说说 TypeScript。

## TypeScript & CoffeeScript

提到它很多人会拿 [CoffeeScript](http://coffeescript.org/) 与之比对，我作为两者都使用过的过来人，简单介绍下两者的异同：

在我看来相同点只有一点：都是 JavaScript Compiler 的定位，有点类似于 Sass, Less 之于 CSS。

不同点很多：

1. TypeScript 是 JavaScript 的超集，这使得它能够与普通的 JavaScript 混用，而 CoffeeScript 使用自己的那一套类 Ruby 的语法使得这是不可能滴;
2. TypeScript 玩的概念比较多，比如 Module, Interface 等，而 CoffeeScript 自己实现的语法糖则比较多；
3. TypeScript 已经开始支持 ES6，CoffeeScript 会不会支持和什么时候支持，还都是未知数；
4. 最大的一点不同：TypeScript 在编译过程中可对类型进行检查，将 JavaScript 这个灵活的动态型语言变成了**静态类型**的语言。算是有利有弊吧：好处是相当于将部分的“测试”工作提前了，问题的定位也更加精准；坏处是丧失了一点灵活性与增加了一些代码量。

## TypeScript & Go

不管怎样，我对 TypeScript 初识就有好感。这种好感源自之前看到过的关于 Go 语言的介绍系列：[build web application with golang](https://github.com/astaxie/build-web-application-with-golang)

虽然我不是后端工程师，但冲着它优雅的语法，我在当下是很有冲动来学习 Go 的。

TypeScript 在某些方面与 Go 很像，是我喜欢的部分（也许是我接触的静态型语言实在太少）。比如定义一个取两数较大值的函数：

Go:

```go
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

TypeScript:

```typescript
function max(a: number, b: number): number {
    if (a > b) {
        return a
    }
    return b
}
```

Go 的自定义类型：

```go
type Human struct {
    name string
    age int
    phone string
}

var person Human
```

TypeScript 的 Type Interface：

```typescript
interface Human {
    name: string
    age: number
    phone: string
}

var person: Human
```

以上。我认为静态类型的好处，不止在于它在编译时提前找出错误，还在于它可以在你程序设计初期，帮助你去理清思路。

## 贪食蛇

下面进入正题，看看如何用 TypeScript 实现一个简单的贪食蛇小游戏。

![Snake Game](http://i93.photobucket.com/albums/l57/ShakeSpace/Blog/snake-game_zps4k2h7dhw.png)

首先，我们看构成这个游戏的要素，主要由这三个部分组成：

1. 地板: Floor
2. 蛇: Snake
3. 食物: Food

可以看到，它们的组成单位，其实是一样，都是由单个“块”组成的：Floor 是由纵横两个维度的块组成，Snake 是由一列块组成，而 Food 是单个块。块是这个游戏世界构建的基本单位，我们改如何来实现这个块呢？这至关重要。

简单来分析下，从图中可看出，块有三种颜色，分别是：

1. Floor: 白色
2. Snake: 黑色
3. Food: 红色

可以对全体的块进行三种分类，每类有相应的样式：

```js
const FLOOR = {
    SPACE: 'space',
    BODY: 'body',
    FOOD: 'food'
}
```

```css
.space {
    background-color: white;
}

.body {
    background-color: black;
}

.food {
    background-color: red;
}
```

其次，我们要让块动起来，使蛇移动，还要记录块的位置信息，即为横向和纵向上的 unique 坐标。

最后，要用 JS 操作的介质，无非是承载着这些“块数据”的 DOM，块自身的颜色的变化，需要通过改变其对应的 DOM 元素的样式来实现。

这样我们其实对块实现已经有了基本的想法：

```typescript
interface Block {
    pos: Pos
    type: string
    node: HTMLElement
}
```

这里由于块坐标我们后面用的很多，所以就定义了一个 Pos 类型：

```typescript
interface Pos {
    x: number
    y: number
}
```

你会发现，在 TypeScript 的世界中，创建一个类型是多么地随心所欲和不费力气。

好了，我们已经有了构建世界的基本粒子了，可以开始创建 Floor 和 Snake 了（先不管 Food，还没到这一步）。创建完后，再让 Snake 能够“动起来”，并且通过键盘的“上”、“下”、“左”、“右”键可控制其方向，就算完成大半了。

创建 Floor 类：

```typescript
class Floor {
    private table: HTMLTableElement
    private parent: HTMLElement
    private row: number
    private col: number
    public blocks: Block[] // 提供给 Snake 使用的 block 集合
    
    constructor(options?) {
        options = options || {};
        this.table = document.createElement('table')
        this.parent = options.parent || document.body
        this.row = options.row || 20
        this.col = options.col || 20
        this.blocks = []
    }
    
    initialize() {
        let x: number
        let y: number
        
        for (y = 0; y < this.row; y++) {
            let tr = <HTMLTableRowElement>this.table.insertRow(-1)
            for (x = 0; x < this.col; x++) {
                let td = <HTMLTableCellElement>tr.insertCell(-1)
                td.className = FLOOR.SPACE
                this.blocks.push({
                    node: td,
                    type: FLOOR.SPACE,
                    pos: {x: x, y: y}
                })
            }
        }
        
        this.parent.appendChild(this.table)
    }
}
```

创建 Snake 类：

```typescript
class Snake {
    private initLength: number
    private bodies: Block[]
    private speed: number
    
    constructor(options?) {
        options = options || {}
        this.initLength = options.initLength || 3
        this.speed = options.speed || 300
        this.bodies = []
    }
    
    born() {
        for (let i = this.initLength - 1; i >= 0; i--) {
            this.bodies.push(floor.blocks[i]) // floor 是 Floor 的一个实例
        }
        
        this.bodies.forEach(body => {
            body.type = FLOOR.BODY
            body.node.className = body.type // 着色
        })
    }
}
```

好了，new 一个 Snake 试一下，是否有一只“三节蛇”已赫然印入眼帘。

```typescript
let snake = new Snake()
snake.born()
```

加上一个 move 方法让它动起来：

```typescript
class Snake {
    ...
    move() {
        let head: Block = this.bodies[0]
        let tail: Block = this.bodies[this.bodies.length - 1]
        let next: Block = this.sbling(head) // 获取 head 右侧的 block
        
        // body move
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i] = this.bodies[i - 1]
        }
        
        next.type = FLOOR.BODY
        this.bodies[0] = next
        
        // clear original tail
        tail.type = FLOOR.SPACE
        tail.node.className = tail.type
        
        // change color of blocks
        this.blocks.forEach(block => {
            block.node.className = block.type
        })
    }
    
    sbling(source: Block): Block {
        return this.blocks.filter((block) => {
            if (source.pos.x + 1 === block.pos.x
            && source.pos.y === block.pos.y) {
                return true
            }
        })[0]
    }
}
```

以上几句代简单码完成后，只要在 `born` 方法中加定计时任务，就可以使我们的小蛇向右跑起来了：

```typescript
born() {
    ...
    // keep moving
    setInterval(function() { this.move(); }.bind(this), this.speed)
}
```

接下来加上键盘控制事件之前，要先对 `sbling` 方法进行改造，因为移动过程中的下一个块 `next: Block`，要根据其移动方向来获得了。

```typescript
const enum Direction {
    left, up, right, down
}

class Snake {
    ...
    private direction: Direction
    private offsets: Array<number[]>
    
    constructor(options?) {
        ...
        this.direction = Direction.right
        this.offsets = [[-1, 0], [0, -1], [+1, 0], [0, +1]]
    }
    ...
    
    move() {
        let head: Block = this.bodies[0]
        let tail: Block = this.bodies[this.bodies.length - 1]
        let next: Block = this.sbling(head, this.direction)
        ...
    }
    
    sbling(source: Block, direction: Direction): Block {
        return this.blocks.filter((block) => {
            if (source.pos.x + this.offsets[direction][0] === block.pos.x
            && source.pos.y + this.offsets[direction][1] === block.pos.y) {
                return true
            }
        })[0]
    }
}
```

正式加上键盘事件，齐活了：

```typescript
born() {
    ...
    let keyHandler = (e: KeyboardEvent): void  => {
        const keyCode: number = e.keyCode || e.which || e.charCode
        
        switch (keyCode) {
            case KeyCode.left:
                if (this.direction !== Direction.right) {
                    this.direction = Direction.left
                }
                break
            case KeyCode.up:
                if (this.direction !== Direction.down) {
                    this.direction = Direction.up
                }
                break
            case KeyCode.right:
                if (this.direction !== Direction.left) {
                    this.direction = Direction.right
                }
                break
            case KeyCode.down:
                if (this.direction !== Direction.up) {
                    this.direction = Direction.down
                }
                break
        }
    }
    
    document.addEventListener('keydown', keyHandler, false)
}
```

这下你可以操纵这条三节蛇满地跑了，有点意思。缺点意思的是：一没食物二到处碰壁死不了。别急，首先解决食物是怎么生成的：

```typescript
class Floor() {
    ...
    genFood() {
        // 在地板内的随机位置
        let pos: Pos = {
            x: Math.floor(Math.random() * this.col),
            y: Math.floor(Math.random() * this.row)
        }
        
        // 根据位置获取食物 block
        let food = this.blocks.filter((block) => {
            if (block.pos.x === pos.x && block.pos.y === pos.y) {
                return true
            }
        })[0]
        
        food.type = FLOOR.FOOD
        food.node.className = food.type
    }
}
```

生成食物在蛇一出生就执行一次，随后，在蛇移动的过程中，每吃到一次食物，就重新再生成一次食物：

```typescript
class Snake {
    ...
    born() {
        ...
        
        // generate food
        floor.genFood()
        
        // keep moving
        setInterval(function() { this.move(); }.bind(this), this.speed)
    }
    
    move() {
        ...
        
        if (next.type === FLOOR.FOOD) {
            this.eat(next)
        }
        
        // body move
        for (let i = this.bodies.length - 1; i > 0; i--) {
            this.bodies[i] = this.bodies[i - 1]
        }
        
        ...
    }
    
    eat(block: Block) {
        this.bodies.push(block)
        floor.genFood()
    }
}
```

好，最后我们让这条长生不死的神蛇落入生死轮回的凡界。仔细思考下，它的死因有两种：一、碰壁（下一个块不存在）；二、吃到自己的身体（贪食而亡），那代码实现的方式就很简单咯：

```typescript
move() {
    let head: Block = this.bodies[0]
    let tail: Block = this.bodies[this.bodies.length - 1]
    let next: Block = this.sbling(head, this.direction)
      
    if (!next || next.type === FLOOR.BODY) {
        this.die()
        return
    }
      
    if (next.type === FLOOR.FOOD) {
        this.eat(next)
    }
    
    ...
}
```

至此，简单的贪食蛇小游戏就基本完成了。当然，后续还需要许多优化：比如生成的食物块刚好是蛇的身体怎么办？比如在蛇的一次 move 中频繁多次触发键盘事件，direction 到底取哪一次？在这里就不展开了，感兴趣的可直接看[项目源码](https://github.com/roshanca/snake-game)。

## 总结

最后提一下，为了使逻辑更加清晰以及日后方便扩展维护，我又抽离了一个 Model 类，专门用来做 Floor 和 Snake 的纽带，专门负责操作管理 block 集合。因为用 TypeScript 来定制实现模块实在是太方便了，提供了众多方法还有继承 (extends) 和实现 (implements) 等概念，感觉就像摆在你的面前一大堆各式各样的工具，都不知道该挑一把锤子或是一只镊子。

照这么说，用 TypeScript 写一些小规模的项目确实有一种打蚊子用大炮的赶脚，而且，有时候灵活度也会下降：比如贪食蛇中对 block 集合关系管理，由一个 block 去获取到它相邻位置的 block，在这一点上要是用上一点点 JavaScript 动态语言的黑魔法的话实现起来会简单的多：

```js
this.blocks[[x, y]] = {
    node: td,
    type: FLOOR.SPACE,
    pos: [x, y]
}
```

这样你会发现 `this.blocks` 可通过两个维度来获取到相应的 block：

```js
this.blocks[0]
this.blocks[this.blocks.length - 1]

this.blocks[[1, 2]]
this.blocks[this.blocks[1].pos]
```

也只有在动态的弱语言里能做到这一点。但简单方便之余带来的副作用是不太好理解，所以如果是一些团队协作的项目，我个人的建议是宁可放弃掉一些实现效率，为了今后的可维护性和扩展性，尽量写的清晰一些，不要爽了自己却坑了队友。TypeScript 在这一点上是符合我的理念的，此处如果真的使用了这项黑魔法它会报错：`An index expression argument must be of type 'string', 'number', 'symbol', or 'any'`，不会让你走捷径胡来了。

随着项目的复杂程度递增，其优势也愈发明显。单单是静态类型检测就可以将多少潜在问题扼杀在编译阶段了。

而回头看我们的互联网世界，恰巧碰上富应用的时代，而且随着这几年计算机硬件性能提升，加上 JavaScript 自身的不断优化，我相信我们的应用还会对交互的要求越来越高，对代码的复杂程度也会越来越高。应用自身的规模也越来越大，特别是一些跨平台的应用。这些都让 TypeScript 的优势愈加明显。
