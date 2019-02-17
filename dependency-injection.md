
## 依赖注入

依赖注入（DI）是一种重要的应用设计模式。 Angular 有自己的 DI 框架，在设计应用时常会用到它，以提升它们的开发效率和模块化程度。

依赖，是当类需要执行其功能时，所需要的服务或对象。 DI 是一种编码模式，其中的类会从外部源中请求获取依赖，而不是自己创建它们。

有必要给所有的服务类添加 @Injectable() 装饰器

### DI提供商 (dependency provider)


用 useExisting 来为 OldLogger 指定别名

## [使用参数装饰器来限定依赖查找方式](https://angular.cn/guide/dependency-injection-in-action#make-a-dependency-optional-and-limit-search-with-host)

* @Optional 属性装饰器告诉 Angular 当找不到依赖时就返回 null
* @Host 属性装饰器会禁止在宿主组件以上的搜索。宿主组件通常就是请求该依赖的那个组件。 不过，当该组件投影进某个父组件时，那个父组件就会变成宿主
* 使用 @Inject 可以指定自定义提供商
* 使用 @Self 和 @SkipSelf 来修改提供商的搜索方式

@Self 装饰器时，注入器只在该组件的注入器中查找提供商
@SkipSelf 装饰器可以让你跳过局部注入器，并在注入器树中向上查找，以发现哪个提供商满足该依赖

## 定义提供商

* 值提供商 useValue

useValue 键让你可以为 DI 令牌关联一个固定的值。 使用该技巧来进行运行期常量设置，比如网站的基础地址和功能标志等。
{ provide: TITLE,         useValue:   'Hero of the Month' }
provide: 令牌
useValue： 值

* 类提供商 classValue

{ provide: HeroService,   useClass:    HeroService },
{ provide: LoggerService, useClass:    DateLoggerService },
第一个提供商是展开了语法糖的，是一个典型情况的展开。一般来说，被新建的类(HeroService)同时也是该提供商的注入令牌。 通常都选用缩写形式，完整形式可以让细节更明确。

第二个提供商使用 DateLoggerService 来满足 LoggerService。该 LoggerService 在 AppComponent 级别已经被注册。当这个组件要求 LoggerService 的时候，它得到的却是 DateLoggerService 服务的实例。

> 这个组件及其子组件会得到 DateLoggerService 实例。这个组件树之外的组件得到的仍是 LoggerService 实例。

* 别名提供商 `useExisting` 

`useExisting` 提供了一个键，让你可以把一个令牌映射成另一个令牌。实际上，第一个令牌就是第二个令牌所关联的服务的别名，这样就创建了访问同一个服务对象的两种途径。
```js
{ provide: MinimalLogger, useExisting: LoggerService },
```
可以使用别名接口来窄化 API：给 provide 定义的令牌所能提供的API 是 useExisting 所能提供的API的一部分

* 工厂提供商：`useFactory`

useFactory 提供了一个键，让你可以通过调用一个工厂函数来创建依赖实例，如下面的例子所示。
```js
{ provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }
```
注入器通过调用你用 useFactory 键指定的工厂函数来提供该依赖的值。 注意，提供商的这种形态还有第三个键 deps，它指定了供 useFactory 函数使用的那些依赖。

使用这项技术，可以用包含了一些依赖服务和本地状态输入的工厂函数来建立一个依赖对象。

这个依赖对象（由工厂函数返回的）通常是一个类实例，不过也可以是任何其它东西。 在这个例子中，依赖对象是一个表示 "月度英雄" 参赛者名称的字符串。

在这个例子中，局部状态是数字 2，也就是组件应该显示的参赛者数量。 该状态的值传给了 runnersUpFactory() 作为参数。 runnersUpFactory() 返回了提供商的工厂函数，它可以使用传入的状态值和注入的服务 Hero 和 HeroService。
```js
export function runnersUpFactory(take: number) {
  return (winner: Hero, heroService: HeroService): string => {
    /* ... */
  };
};
```
由 runnersUpFactory() 返回的提供商的工厂函数返回了实际的依赖对象，也就是表示名字的字符串。

这个返回的函数需要一个 Hero 和一个 HeroService 参数。

Angular 根据 deps 数组中指定的两个令牌来提供这些注入参数。

该函数返回名字的字符串，Angular 可以把它们注入到 HeroOfTheMonthComponent 的 runnersUp 参数中。

## 类接口 与 injectionToken

'InjectionToken' 对象
依赖对象可以是一个简单的值，比如日期，数字和字符串，或者一个无形的对象，比如数组和函数。

这样的对象没有应用程序接口，所以不能用一个类来表示。更适合表示它们的是：唯一的和符号性的令牌，一个 JavaScript 对象，拥有一个友好的名字，但不会与其它的同名令牌发生冲突。

InjectionToken 具有这些特征。在Hero of the Month例子中遇见它们两次，一个是 title 的值，一个是 runnersUp 工厂提供商。

```js
{ provide: TITLE,         useValue:   'Hero of the Month' },
{ provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }
```
这样创建 TITLE 令牌：

```js
import { InjectionToken } from '@angular/core';

export const TITLE = new InjectionToken<string>('title');
```

类型参数，虽然是可选的，但可以向开发者和开发工具传达类型信息。 而且这个令牌的描述信息也可以为开发者提供帮助。

## 注入到派生类

当编写一个继承自另一个组件的组件时，要格外小心。如果基础组件有依赖注入，必须要在派生类中重新提供和重新注入它们，并将它们通过构造函数传给基类。
https://angular.cn/guide/dependency-injection-in-action#inject-into-a-derived-class

## forwardRef

Allows to refer to references which are not yet defined.

For instance, forwardRef is used when the token which we need to refer to for the purposes of DI is declared, but not yet defined. It is also used when the token which we use when creating a query is not yet defined