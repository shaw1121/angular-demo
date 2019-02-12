
1. angular 组件如何显示的 , ts & html 关系

2. angular 管道的原理

3.
每个组件都必须声明在（且只能声明在）一个 NgModule 中。

4. ts 语法

5. 为什么此处必须加修饰符？？
```ts
constructor(private el: ElementRef) { // 为什么此处必须加修饰符？？
    // el = el;
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
```

# Note：
## MVVM
从使用模型-视图-控制器 (MVC) 或模型-视图-视图模型 (MVVM) 的经验中，很多开发人员都熟悉了组件和模板这两个概念。 在 Angular 中，**组件**扮演着**控制器或视图模型**的角色，**模板**则扮演**视图**的角色。
eg:
```ts
<h3>
  {{title}}
  <img src="{{heroImageUrl}}" style="height:30px">
</h3>
```
上例中，Angular 计算 title 和 heroImageUrl 属性的值，并把它们填在空白处

##
## 插值表达式
Angular 对所有双花括号中的表达式求值，把求值的结果转换成字符串，并把它们跟相邻的字符串字面量连接起来。最后，把这个组合出来的插值结果赋给元素或指令的属性。

> 插值表达式是一个特殊的语法，Angular 把它转换成了属性绑定

## 模板表达式

模板表达式产生一个值。 Angular 执行这个表达式，并把它赋值给绑定目标的属性，这个绑定目标可能是 HTML 元素、组件或指令

JavaScript 中那些具有或可能引发副作用的表达式是被禁止的，包括：

* 赋值 (=, +=, -=, ...)

* new 运算符

* 使用 ; 或 , 的链式表达式

* 自增和自减运算符：++ 和 --

和 JavaScript 语 法的其它显著不同包括：

* 不支持位运算 | 和 &

* 具有新的模板表达式运算符，比如 |、?. 和 !。

**表达式上下文**

表达式中的上下文变量是由**模板变量**、**指令的上下文变量（如果有）**和组件的**成员**叠加而成的。 如果你要引用的变量名存在于一个以上的命名空间中，那么，模板变量是最优先的，其次是指令的上下文变量，最后是组件的成员。

下面的例子就体现了这种命名冲突。组件具有一个名叫 hero 的属性，而 *ngFor 声明了一个也叫 hero 的模板变量。 在 {{hero.name}} 表达式中的 hero 实际引用的是模板变量，而不是组件的属性。

模板表达式不能引用全局命名空间中的任何东西，比如 window 或 document。它们也不能调用 console.log 或 Math.max。 它们只能引用表达式上下文中的成员。
eg
```ts
<div *ngFor="let hero of heroes">{{hero.name}}</div>
<app-hero-detail *ngFor="let hero of heroes" [hero]="hero"></app-hero-detail>
```
hero 前的 let 关键字创建了一个名叫 hero 的模板(输入)变量。 ngFor 指令在由父组件的 heroes 属性返回的 heroes 数组上迭代，每次迭代都从数组中把当前元素赋值给 hero 变量。

* [模板表达式指南](https://angular.cn/guide/template-syntax)

模板表达式能成就或毁掉一个应用。请遵循下列**指南**：
* 没有可见的副作用

* 执行迅速

* 非常简单

* 幂等性

超出上面指南外的情况应该只出现在那些你确信自己已经彻底理解的特定场景中。


## 模板语句用来响应由绑定目标（如 HTML 元素、组件或指令）触发的事件

模板语句将在事件绑定中看到，它出现在 = 号右侧的引号中，就像这样：(event)="statement"。

```ts
<button (click)="deleteHero()">Delete hero</button>
```
和模板表达式一样，模板语句使用的语言也像 JavaScript。 模板语句解析器和模板表达式解析器有所不同，特别之处在于它支持基本赋值 (=) 和表达式链 (; 和 ,)。

## HTML attribute and DOM property
就算名字相同，HTML **attribute** 和 **DOM property** 也不是同一样东西

> 要想理解 Angular 绑定如何工作，重点是搞清 HTML attribute 和 DOM property 之间的区别。

**attribute** 是由 HTML 定义的。**property** 是由 DOM (Document Object Model) 定义的。

* 少量 HTML attribute 和 property 之间有着 1:1 的映射，如 id。

* 有些 HTML attribute 没有对应的 property，如 colspan。

* 有些 DOM property 没有对应的 attribute，如 textContent。

* 大量 HTML attribute 看起来映射到了 property…… 但却不像你想的那样！

最后一类尤其让人困惑…… 除非你能理解这个普遍原则：

**attribute** 初始化 **DOM property**，然后它们的任务就完成了。**property 的值可以改变；attribute 的值不能改变**。

例1. 
当浏览器渲染 `<input type="text" value="Bob">` 时，它将创建相应 DOM 节点， 它的 value 这个 **property** 被初始化为 “Bob”。

当用户在输入框中输入 “Sally” 时，DOM 元素的 value 这个 property 变成了 “Sally”。 但是该 HTML 的 value 这个 **attribute** 保持不变。如果你读取 input 元素的 attribute，就会发现确实没变： `input.getAttribute('value') // 返回 "Bob"`。

HTML 的 value 这个 attribute 指定了初始值；DOM 的 value 这个 property 是当前值。

例2. 
disabled 这个 attribute 是另一种特例。按钮的 disabled 这个 property 是 false，因为默认情况下按钮是可用的。 当你添加 disabled 这个 attribute 时，只要它出现了按钮的 disabled 这个 property 就初始化为 true，于是按钮就被禁用了。

添加或删除 disabled 这个 attribute 会禁用或启用这个按钮。但 attribute 的值无关紧要，这就是你为什么没法通过` <button disabled="false">`仍被禁用</button> 这种写法来启用按钮。

设置按钮的 disabled 这个 property（如，通过 Angular 绑定）可以禁用或启用这个按钮。 这就是 property 的价值。

**A world without attributes**
> 在 Angular 的世界中，`attribute` 唯一的作用是用来初始化元素和指令的状态。 当进行数据绑定时，只是在与元素和指令的 `property` 和事件打交道，而 `attribute` 就完全靠边站了。

## 模板表达式操作符
* 管道操作符(|)
管道是一个简单的函数，它接受一个输入值，并返回转换结果。 它们很容易用于模板表达式中，只要使用管道操作符 (|) 就行了。
```js
<div>Title through uppercase pipe: {{title | uppercase}}</div>
```
管道操作符会把它左侧的表达式结果传给它右侧的管道函数。

* 安全导航操作符( ?. ) 和 空属性路径
Angular 的安全导航操作符 (?.) 是一种流畅而便利的方式，用来保护出现在属性路径中 null 和 undefined 值。 下例中，当 currentHero 为空时，保护视图渲染器，让它免于失败。
```js
The current hero's name is {{currentHero?.name}}
```
Angular 安全导航操作符 (?.) 是在属性路径中保护空值的更加流畅、便利的方式。 表达式会在它遇到第一个空值的时候跳出。 显示是空的，但应用正常工作，而没有发生错误。

```js
<!-- No hero, no problem! -->
The null hero's name is {{nullHero?.name}}
```
在像 a?.b?.c?.d 这样的长属性路径中，它工作得很完美.

* 非空断言操作符
在 TypeScript 2.0 中，你可以使用 --strictNullChecks 标志强制开启严格空值检查。TypeScript 就会确保不存在意料之外的 null 或 undefined。

在用*ngIf来检查过 hero 是已定义的之后，就可以断言 hero 属性一定是已定义的。
```js
<!--No hero, no text -->
<div *ngIf="hero">
  The hero's name is {{hero!.name}}
</div>
```
在 Angular 编译器把你的模板转换成 TypeScript 代码时，这个操作符会防止 TypeScript 报告 "hero.name 可能为 null 或 undefined"的错误。
与安全导航操作符不同的是，非空断言操作符不会防止出现 null 或 undefined。 它只是告诉 TypeScript 的类型检查器对特定的属性表达式，不做 "严格空值检测"。

如果你打开了严格控制检测，那就要用到这个模板操作符，而其它情况下则是可选的。
