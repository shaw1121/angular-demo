
在 Angular 中有三种类型的指令：

1. 组件 — 拥有模板的指令

2. 结构型指令 — 通过添加和移除 DOM 元素改变 DOM 布局的指令

3. 属性型指令 — 改变元素、组件或其它指令的外观和行为的指令。

组件是这三种指令中最常用的。 你在快速上手例子中第一次见到组件。

结构型指令修改视图的结构。例如，NgFor 和 NgIf。 要了解更多，参见结构型指令 guide。

属性型指令改变一个元素的外观或行为。例如，内置的 NgStyle 指令可以同时修改元素的多个样式。

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
