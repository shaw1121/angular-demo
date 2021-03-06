## 路由与导航

### 概览

浏览器具有熟悉的导航模式：

* 在地址栏输入 URL，浏览器就会导航到相应的页面。

* 在页面中点击链接，浏览器就会导航到一个新页面。

* 点击浏览器的前进和后退按钮，浏览器就会在你的浏览历史中向前或向后导航。

Angular 的 Router（即“路由器”）借鉴了这个模型。它把浏览器中的 URL 看做一个操作指南， 据此导航到一个由客户端生成的视图，并可以把参数传给支撑视图的相应组件，帮它决定具体该展现哪些内容。 你可以为页面中的链接绑定一个路由，这样，当用户点击链接时，就会导航到应用中相应的视图。 当用户点击按钮、从下拉框中选取，或响应来自任何地方的事件时，你也可以在代码控制下进行导航。 路由器还在浏览器的历史日志中记录下这些活动，这样浏览器的前进和后退按钮也能照常工作。

### 基础知识

大多数带路由的应用都要在index.html的 `<head>` 标签下先添加一个 `<base>` 元素，来告诉路由器该如何合成导航用的 URL。

如果 app 文件夹是该应用的根目录（就像范例应用中一样），那就把 href 的值设置为下面这样：
```html
<base href="/">
```

* 把路由集成到应用中

路由应用范例中默认不包含路由。 要想在使用 Angular CLI 创建项目时支持路由，请为项目或应用的每个 NgModule 设置 `--routing` 选项。 当你用 CLI 命令 `ng new` 创建新项目或用 `ng generate app` 命令创建新应用，请指定 `--routing` 选项。这会告诉 CLI 包含上 `@angular/router` 包，并创建一个名叫 `app-routing.module.ts` 的文件。 然后你就可以在添加到项目或应用中的任何 NgModule 中使用路由功能了。

比如，可以用下列命令生成带路由的 NgModule。
```js
ng generate module my-module --routing
```
这将创建一个名叫 `my-module-routing.module.ts` 的独立文件，来保存这个 NgModule 的路由信息。 该文件包含一个空的 `Routes` 对象，你可以使用一些指向各个组件和 NgModule 的路由来填充该对象。


### 导入模块的顺序很重要

导入模块的顺序很重要
看看该模块的 imports 数组。注意，`AppRoutingModule` 是最后一个。最重要的是，它**位于 HeroesModule 之后**。

```ts
imports: [
  BrowserModule,
  FormsModule,
  HeroesModule,
  AppRoutingModule
],
```
路由配置的顺序很重要。 路由器会接受第一个匹配上导航所要求的路径的那个路由。

当所有路由都在同一个 AppRoutingModule 时，你要把默认路由和通配符路由放在最后（这里是在 /heroes 路由后面）， 这样路由器才有机会匹配到 /heroes 路由，否则它就会先遇到并匹配上该通配符路由，并导航到“页面未找到”路由。

每个路由模块都会根据导入的顺序把自己的路由配置追加进去。 如果你先列出了 AppRoutingModule，那么通配符路由就会被注册在“英雄管理”路由之前。 通配符路由（它匹配任意URL）将会拦截住每一个到“英雄管理”路由的导航，因此事实上屏蔽了所有“英雄管理”路由。

### Matrix URL 矩阵 URL 标记法

```js
localhost:4200/heroes;id=15;foo=foo
```
id 的值像这样出现在 URL 中（;id=15;foo=foo），但不在 URL 的路径部分。 “Heroes”路由的路径部分并没有定义 :id。

可选的路由参数没有使用“？”和“&”符号分隔，因为它们将用在 URL 查询字符串中。 它们是用“;”分隔的。 这是矩阵 URL标记法。

### 重要的接口 

* `ActivatedRoute`

> Contains the information about a route associated with a component loaded in an outlet. An ActivatedRoute can also be used to traverse the router state tree.

https://angular.cn/api/router/ActivatedRoute#description

* `ActivatedRouteSnapshot`
> Contains the information about a route associated with a component loaded in an outlet at a particular moment in time. ActivatedRouteSnapshot can also be used to traverse the router state tree.

当前瞬间信息

https://angular.cn/api/router/ActivatedRouteSnapshot

### 通过 heroes 讲解特性区



### 通过 crisis-center 讲解 子路由


### [Resolve](https://angular.cn/guide/router#resolve-pre-fetching-component-data)

[从 usermanagement ui 看 resolve 的应用](./mdsp-settings-ui.md)




Refer:   
https://angular.cn/guide/router#routing--navigation
