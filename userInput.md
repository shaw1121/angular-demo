
## 事件绑定

* 绑定到用户输入

要绑定 DOM 事件，只要把 DOM 事件的名字包裹在圆括号中，然后用放在引号中的模板语句对它赋值就可以了。

下例展示了一个事件绑定，它实现了一个点击事件处理器：

```js
<button (click)="onClickMe()">Click me!</button>
```
等号左边的 (click) 表示把按钮的点击事件作为绑定目标。 等号右边引号中的文本是模板语句，通过调用组件的 onClickMe 方法来响应这个点击事件。

写绑定时，需要知道模板语句的执行上下文。 出现在模板语句中的每个标识符都属于特定的上下文对象。 这个对象通常都是控制此模板的 Angular 组件。 上例中只显示了一行 HTML，那段 HTML 片段属于下面这个组件：
```js
@Component({
  selector: 'app-click-me',
  template: `
    <button (click)="onClickMe()">Click me!</button>
    {{clickMessage}}`
})
export class ClickMeComponent {
  clickMessage = '';

  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
```
当用户点击按钮时，Angular 调用 ClickMeComponent 的 onClickMe 方法。

* 通过 `$event` 对象取得用户输入

下面的代码监听 keyup 事件，并将整个事件载荷 ($event) 传递给组件的事件处理器。

```js
template: `
  <input (keyup)="onKey($event)">
  <p>{{values}}</p>
`
```
当用户按下并释放一个按键时，触发 keyup 事件，Angular 在 $event 变量提供一个相应的 DOM 事件对象，上面的代码将它作为参数传递给 onKey() 方法。
```js
export class KeyUpComponent_v1 {
  values = '';

  onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }
}
```
$event 对象的属性取决于 DOM 事件的类型。例如，鼠标事件与输入框编辑事件包含了不同的信息。

* 从一个模板变量中获得用户输入：模板引用变量

Angular 的模板引用变量提供了 从模块中直接访问元素的能力。 在标识符前加上井号 (#) 就能声明一个模板引用变量
```JS
@Component({
  selector: 'app-loop-back',
  template: `
    <input #box (keyup)="0">
    <p>{{box.value}}</p>
  `
})
export class LoopbackComponent { }
```
这个模板引用变量名叫 box，在 `<input>` 元素声明，它引用 `<input>` 元素本身。 代码使用 box 获得输入元素的 value 值，并通过插值表达式把它显示在 `<p>` 标签中。

推荐使用该种方式获得用户输入。

* 回车事件(keyup.enter)

绑定到 Angular 的 keyup.enter 模拟事件，只有当用户敲回车键时，Angular 才会调用事件处理器

* 失去焦点事件 (blur)

Refer:
https://angular.cn/guide/user-input#user-input