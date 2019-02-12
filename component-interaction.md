## 组件通信

* 通过输入型绑定把数据从父组件传到子组件

@Input() 
子组件有输入型属性
参见 hero-child 组件 和 hero-parent 组件

* 通过 setter 截听输入属性值的变化

参见 name-child 和 name-parent 组件

* 通过ngOnChanges()来截听输入属性值的变化

参见 version-child 和 version-parent 组件

* 父组件监听子组件的事件

子组件暴露一个 `EventEmitter` 属性，当事件发生时，子组件利用该属性 emits(向上弹射)事件。父组件绑定到这个事件属性，并在事件发生时作出回应。

子组件的 `EventEmitter` 属性是一个输出属性，通常带有`@Output` 装饰器

* 父子组件通过本地变量互动

* 父组件调用 @ViewChild()

* 父子组件通过 服务 来通信