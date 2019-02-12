
在 Angular 中有三种类型的指令：

1. 组件 — 拥有模板的指令

2. 结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令

3. 属性型指令 — 改变元素、组件或其它指令的外观和行为的指令。

组件是这三种指令中最常用的。组件可以在原生 HTML 元素中管理一小片区域的 HTML。从技术角度说，它就是一个带模板的指令

结构型指令修改视图的结构。例如，NgFor 和 NgIf。 要了解更多，参见结构型指令 guide。

属性型指令改变一个元素的外观或行为。例如，内置的 NgStyle 指令可以同时修改元素的多个样式。

>可以在一个宿主元素上应用多个属性型指令，但只能应用一个结构型指令。

两者使用指令的区别？？ "yellow", "'orange'"
```html
<p appHighlight highlightColor="yellow">Highlighted in yellow</p>
<p appHighlight [highlightColor]="'orange'">Highlighted in orange</p>
```

## 模板HTML绑定到组件的属性 与 @Input()装饰属性
```ts
src/app/highlight.directive.ts (color)
content_copy
@Input('appHighlight') highlightColor: string;
```
`@Input` 装饰器告诉 Angular，该属性是公共的，并且能被父组件绑定。 如果没有 `@Input`，Angular 就会拒绝绑定到该属性。

但你以前也曾经把`模板 HTML 绑定到组件的属性`，而且从来没有用过 `@Input`。 差异何在？

差异在于**信任度不同**。 
Angular 把组件的模板看做从属于该组件的。 组件和它的模板默认会相互信任。 这也就是意味着，组件自己的模板可以绑定到组件的任意属性，无论是否使用了 @Input 装饰器。

但组件或指令不应该盲目的信任其它组件或指令。 因此组件或指令的属性默认是不能被绑定的。 从 Angular 绑定机制的角度来看，它们是私有的，而当添加了 @Input 时，Angular 绑定机制才会把它们当成公共的。 只有这样，它们才能被其它组件或属性绑定。

**可以根据属性名在绑定中出现的位置来判定是否要加 @Input**。

当它出现在等号右侧的模板表达式中时，它属于模板所在的组件，不需要 @Input 装饰器。

当它出现在等号左边的方括号（[ ]）中时，该属性属于其它组件或指令，它必须带有 @Input 装饰器。

用此原理分析下列范例：
```ts
src/app/app.component.html (color)
content_copy
<p [appHighlight]="color">Highlight me!</p>
```
* color 属性位于右侧的绑定表达式中，它属于模板所在的组件。 该模板和组件相互信任。因此 color 不需要 @Input 装饰器。

* appHighlight 属性位于左侧，它引用了 HighlightDirective 中一个带别名的属性，它不是模板所属组件的一部分，因此存在信任问题。 所以，该属性必须带 @Input 装饰器。

## 结构型指令

*ngIf 星号(*)简写方法,这个字符串是一个微语法，而非模板表达式，Angular会解开这个语法糖，变成一个`<ng-template>`标记,**包裹着宿主元素及其子元素**。
```js
<div *ngIf="hero" class="name">{{hero.name}}</div>
```
解开语法糖之后：
```JS
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
```

指令同时具有两种拼写形式大驼峰 UpperCamelCase 和小驼峰 lowerCamelCase，比如你已经看过的 NgIf 和 ngIf。 这里的原因在于，NgIf 引用的是指令的类名，而 ngIf 引用的是指令的属性名*。

指令的类名拼写成大驼峰形式（NgIf），而它的属性名则拼写成小驼峰形式（ngIf）。 本章会在谈论指令的属性和工作原理时引用指令的类名，在描述如何在 HTML 模板中把该指令应用到元素时，引用指令的属性名

* ngIf
ngIf 指令并不是使用 CSS 来隐藏元素的, 它会把这些元素从 DOM 中物理删除

* [模板输入变量](https://angular.cn/guide/structural-directives#template-input-variable)与[模板引用变量](https://angular.cn/guide/template-syntax#template-reference-variables--var-)

模板输入变量：
```JS
<div *ngFor="let hero of heroes" [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>
```
hero 前的 let 关键字创建了一个名叫 hero 的模板输入变量。 ngFor 指令在由父组件的 heroes 属性返回的 heroes 数组上迭代，每次迭代都从数组中把当前元素赋值给 hero 变量。

模板引用变量：
```js
<input #phone placeholder="phone number">

<!-- lots of other elements -->

<!-- phone refers to the input element; pass its `value` to an event handler -->
<button (click)="callPhone(phone.value)">Call</button>
```
使用井号 (#) 来声明引用变量。 #phone 的意思就是声明一个名叫 phone 的变量来引用 `<input>` 元素。你可以在模板中的任何地方引用模板引用变量。 比如声明在 `<input> `上的 phone 变量就是在模板另一侧的 `<button>` 上使用的。

>模板输入变量和模板引用变量是不同的，无论是在语义上还是语法上。

你使用 let 关键字（如 let hero）在模板中声明一个模板输入变量。 这个变量的范围被限制在所重复模板的单一实例上。 事实上，你可以在其它结构型指令中使用同样的变量名。

而声明模板引用变量使用的是给变量名加 # 前缀的方式（#var）。 一个引用变量引用的是它所附着到的元素、组件或指令。它可以在整个模板的任意位置访问。

模板输入变量和引用变量具有各自独立的命名空间。let hero 中的 hero 和 #hero 中的 hero 并不是同一个变量。

* NgSwitch
NgSwitch 本身不是结构型指令，而是一个属性型指令，它控制其它两个 switch 指令的行为。 这也就是为什么你要写成 [ngSwitch] 而不是 *ngSwitch 的原因。

NgSwitchCase 和 NgSwitchDefault 都是结构型指令