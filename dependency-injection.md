
## 依赖注入

依赖注入（DI）是一种重要的应用设计模式。 Angular 有自己的 DI 框架，在设计应用时常会用到它，以提升它们的开发效率和模块化程度。

依赖，是当类需要执行其功能时，所需要的服务或对象。 DI 是一种编码模式，其中的类会从外部源中请求获取依赖，而不是自己创建它们。

有必要给所有的服务类添加 `@Injectable()` 装饰器，以便让 Angular 可以把它作为依赖注入到组件中。

###概念

* injector

 Angular creates an application-wide injector for you during the bootstrap process, and additional injectors as needed. **You don't have to create injectors**.

An injector creates dependencies, and maintains a container of dependency instances that it reuses if possible.(注入器创建依赖并维护一个可能被重用的依赖实例的容器)

* provider

A provider is an object that tells an injector how to obtain or create a dependency.

For any dependency that you need in your app, you must register a provider with the app's injector, so that the injector can use the provider to create new instances. For a service, the provider is typically the service class itself.

* providing services

You must register at least one provider of any service you are going to use. The provider can be part of the service's own metadata, making that service available everywhere, or you can register providers with specific modules or components. You register providers in the metadata of the service (in the `@Injectable()` decorator), or in the `@NgModule()` or `@Component()` metadata

对于要用到的任何服务，你必须至少注册一个提供商。服务可以在自己的元数据中把自己注册为提供商，这样可以让自己随处可用。或者，你也可以为特定的模块或组件注册提供商。要注册提供商，就要在服务的 @Injectable() 装饰器中提供它的元数据，或者在@NgModule() 或 @Component() 的元数据中。

```js
@Injectable({
  providedIn: 'root' // 指定把被装饰类的提供商放到 root 注入器中
})
```


> 依赖不一定是服务 —— 它还可能是函数或值。

### 在哪里配置提供商

* @Injectable 级进行配置

@Injectable() 装饰器会标出每个服务类。服务类的元数据选项 providedIn 会指定一个注入器(通常为 root) 来用被装饰的类作为该服务的提供商。 当可注入的类向 root 注入器提供了自己的服务时，任何导入了该类的地方都能使用这个服务。

下面的例子使用类上的 `@Injectable()` 装饰器为 HeroService 配置了提供商。
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() { }
}
```
这个配置项告诉 Angular，要由此应用的**根注入器**负责通过调用 HeroService 的构造函数来创建它的实例。 并让该实例在整个应用程序中可用。

下面的例子，配置了一个provider，它能用于包含 HeroModule 的所有注入器中
```ts
@Injectable({
  // we declare that this service should be created
  // by any injector that includes HeroModule.
  providedIn: HeroModule,
})
```
一般来说，这和在 NgModule 本身的装饰器上配置注入器没有多少不同，主要的区别是如果 NgModule 没有用到该服务，那么它是可以被摇树优化掉的。

* @NgModule 级注入器

一般来说，你不必在 providedIn 中指定 AppModule，因为应用中的 root 注入器就是 AppModule 注入器。 不过，如果你在 AppModule 的 @NgModule() 元数据中配置了全应用级的提供商，它就会覆盖通过 @Injectable() 配置的那一个。 你可以用这种方式来为那些供多个应用使用的服务指定非默认的提供商。

你还可以在非根 NgModule 元数据的 providedIn 选项中配置一个模块级的提供商，以便把该服务的范围限定到该模块一级。
```ts
providers: [
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]
```
* @component 级注入器

NgModule 中每个组件都有它自己的注入器。 通过使用 @Component 元数据在组件级配置某个提供商，你可以把这个提供商的范围限定到该组件及其子组件。

下面的例子是修改过的 HeroesComponent，它在 providers 数组中指定了 HeroService。HeroService 可以像该组件的实例以及任意子组件的实例提供英雄列表。
```ts
import { Component } from '@angular/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  providers: [ HeroService ],
  template: `
    <h2>Heroes</h2>
    <app-hero-list></app-hero-list>
  `
})
export class HeroesComponent { }
```

### DI提供商 (dependency provider)

类提供商的语法实际上是一种简写形式，它会扩展成一个由 Provider 接口定义的提供商配置对象。 下面的代码片段展示了 providers 中给出的类会如何扩展成完整的提供商配置对象。

```ts
providers: [Logger]
```
等价于：
```ts
[{ provide: Logger, useClass: Logger }]
```

* provide

The provide property holds the token that serves as the key for both locating a dependency value and configuring the injector.

* useClass

The second property is a provider definition object, which tells the injector how to create the dependency value. The provider-definition key can be useClass, as in the example. It can also be useExisting, useValue, or useFactory. Each of these keys provides a different type of dependency, 

###别名类提供商

用 useExisting 来为 OldLogger 指定别名
```js
[ NewLogger,
  // Alias OldLogger w/ reference to NewLogger
  { provide: OldLogger, useExisting: NewLogger}]
```


### [使用参数装饰器来限定依赖查找方式](https://angular.cn/guide/dependency-injection-in-action#make-a-dependency-optional-and-limit-search-with-host)

* `@Optional` 属性装饰器告诉 Angular 当找不到依赖时就返回 null
* `@Host` 属性装饰器会禁止在宿主组件以上的搜索。宿主组件通常就是请求该依赖的那个组件。 不过，当该组件投影进某个父组件时，那个父组件就会变成宿主
* 使用 `@Inject` 可以指定自定义提供商
* 使用 `@Self` 和 `@SkipSelf` 来修改提供商的搜索方式

`@Self` 装饰器：注入器只在该组件的注入器中查找提供商；   
`@SkipSelf` 装饰器：可以让你跳过局部注入器，并在注入器树中向上查找，以发现哪个提供商满足该依赖。

### 定义提供商

* 值提供商 `useValue`

`useValue` 键让你可以为 DI 令牌关联一个固定的值。 使用该技巧来进行运行期常量设置，比如网站的基础地址和功能标志等。
```js
{ provide: TITLE,         useValue:   'Hero of the Month' }

provide: 令牌
useValue： 值
```
* 类提供商 `useClass`
```js
{ provide: HeroService,   useClass:    HeroService },
{ provide: LoggerService, useClass:    DateLoggerService },
```
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
由 `runnersUpFactory()` 返回的提供商的工厂函数返回了实际的依赖对象，也就是表示名字的字符串。

这个返回的函数需要一个 `Hero` 和一个 `HeroService` 参数。

Angular 根据 deps 数组中指定的两个令牌来提供这些注入参数。

该函数返回名字的字符串，Angular 可以把它们注入到 HeroOfTheMonthComponent 的 runnersUp 参数中。

源码
```ts
export interface FactoryProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    useFactory: Function;
    /**
     * A list of `token`s which need to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     */
    deps?: any[];
    /**
     * If true, then injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     *
     * ### Example
     *
     * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
     */
    multi?: boolean;
}
```

### 类接口 与 injectionToken

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

### 注入到派生类

当编写一个继承自另一个组件的组件时，要格外小心。如果基础组件有依赖注入，必须要在派生类中重新提供和重新注入它们，并将它们通过构造函数传给基类。
https://angular.cn/guide/dependency-injection-in-action#inject-into-a-derived-class

### forwardRef

Allows to refer to references which are not yet defined.

For instance, forwardRef is used when the token which we need to refer to for the purposes of DI is declared, but not yet defined. It is also used when the token which we use when creating a query is not yet defined



### 配置提供商

1. 在 `@Injectable` 级进行配置

* providedIn: 'root'

`@Injectable()` 装饰器会标出每个服务类。服务类的元数据选项 providedIn 会指定一个注入器（通常为 root 来用被装饰的类作为该服务的提供商。 当可注入的类向 root 注入器提供了自己的服务时，任何导入了该类的地方都能使用这个服务。

下面的例子使用类上的 `@Injectable()` 装饰器为 `HeroService` 配置了提供商。
```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() { }
}
```

* providedIn 设置为某个特定的 NgModule

比如，在下面的代码片段中，`@Injectable()` 装饰器配置了一个提供商，它能用于**包含 HeroModule 的所有注入器**中。

```js
import { Injectable } from '@angular/core';
import { HeroModule } from './hero.module';
import { HEROES } from './mock-heroes';

@Injectable({
  // we declare that this service should be created
  // by any injector that includes HeroModule.
  providedIn: HeroModule,
})
export class HeroService {
  getHeroes() { return HEROES; }
}
```
一般来说，这和在 `NgModule` 本身的装饰器上配置注入器没有多少不同，主要的区别是如果 `NgModule` 没有用到该服务，那么它就是**可以被摇树优化掉**的。 对于某个提供特定服务的库而言，有些组件可能会希望注入器是可选的，等使用该库的应用程序来决定是否要提供该服务。