
## RxJS

RxJS (Reactive Extensions for JavaScript)

RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单

### 基本概念
* [Observable](./Observable.md) (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。
* Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
* Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
* Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
* Subject (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
* Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。


**把由可观察对象发布出来的数据统称为流。任何类型的值都可以表示为可观察对象，而这些值会被发布为一个流。**

> 订阅 Observable 类似于调用函数, 并提供接收数据的回调函数

> Observables 传递值可以是同步的，也可以是异步的。

> Subscription 基本上只有一个 unsubscribe() 函数，这个函数用来释放资源或去取消 Observable 执行。

RxJS 提供了一些用来创建可观察对象的函数。这些函数可以简化根据某些东西创建可观察对象的过程，比如事件、定时器、承诺等等
```js
// Create an Observable out of a promise
const data = fromPromise(fetch('/api/endpoint'));

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(1000);

// Create an Observable that will publish mouse movements
const mouseMoves = fromEvent(el, 'mousemove');

// Create an Observable that will create an AJAX request
const apiData = ajax('/api/data');
```

### 操作符

返回 **可观察对象**

操作符是基于可观察对象构建的一些对集合进行复杂操作的函数。RxJS 定义了一些操作符，比如 `map()`、`filter()`、`concat()` 和 `flatMap()`。

操作符接受一些配置项，然后返回一个以来源可观察对象为参数的函数。当执行这个返回的函数时，这个操作符会观察来源可观察对象中发出的值，转换它们，并**返回由转换后的值组成的新的可观察对象**。

下面`map` operator的例子：
```js
import { map } from 'rxjs/operators';

const nums = of(1, 2, 3);

const squareValues = map((val: number) => val * val);
const squaredNums = squareValues(nums);

squaredNums.subscribe(x => console.log(x));

// Logs
// 1
// 4
// 9
```

### [pipe](https://angular.cn/guide/rx-library)

利用管道可以把这些操作符连接起来，让我们可以把多个由操作符返回的函数组合成一个。`pipe()` 函数以你要组合的这些函数作为参数，并且返回一个新的函数，当执行这个新函数时，就会顺序执行那些被组合进去的函数。

应用于某个可观察对象上的一组操作符就像一个菜谱 —— 也就是说，对你感兴趣的这些值进行处理的一组操作步骤。这个菜谱本身不会做任何事。你需要调用 `subscribe()` 来通过这个菜谱生成一个结果。

```js
import { filter, map } from 'rxjs/operators';

const nums = of(1, 2, 3, 4, 5);

// Create a function that accepts an Observable.
const squareOddVals = pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);

// Create an Observable that will run the filter and map functions
const squareOdd = squareOddVals(nums);

// Suscribe to run the combined functions
squareOdd.subscribe(x => console.log(x));
```
`pipe()` 函数也同时是 RxJS 的 Observable 上的一个方法，所以你可以用下列简写形式来达到同样的效果：

```js
import { filter, map } from 'rxjs/operators';

const squareOdd = of(1, 2, 3, 4, 5)
  .pipe(
    filter(n => n % 2 !== 0),
    map(n => n * n)
  );

// Subscribe to get values
squareOdd.subscribe(x => console.log(x));
```
> 对于 Angular 应用来说，提倡使用管道来组合操作符，而不是使用链式写法

`catchError()` 提供了一种简单的方式进行恢复

`retry()` 操作符让你可以重新尝试已经失败的请求。(https://angular.cn/guide/rx-library#retry-failed-observable)

可以在 `catchError` 之前使用 `retry` 操作符。它会订阅到原始的来源可观察对象，它可以重新运行导致结果出错的动作序列。如果其中包含 HTTP 请求，它就会重新发起那个 HTTP 请求。


## map, mergeMap(flatMap), switchMap, concactMap

**map mergeMap switchMap concactMap** [参考例子](https://medium.com/@luukgruijs/understanding-rxjs-map-mergemap-switchmap-and-concatmap-833fc1fb09ff)

### mergeMap
`mergeMap` 相当于 `map + mergeAll`

### switchMap
switchMap is a combination of switchAll and map, 它只发送最近的一个值。

SwitchAll cancels the previous subscription and subscribes to the new one

It would for example come in handy if you compose a list of filters into a data stream and perform an API call when a filter is changed. If the previous filter changes are still being processed while a new change is already made, it will cancel the previous subscription and start a new subscription on the latest change

如果以前的搜索结果仍然是在途状态（这会出现在慢速网络中），它会取消那个请求，并发起一次新的搜索。

它会按照原始的请求顺序返回这些服务的响应，而不用关心服务器实际上是以乱序返回的它们。

### concactMap
But unlike switchMap, that unsubscribes from the current Observable if a new Observable comes in, concatMap will not subscribe to the next Observable until the current one completes. The benefit of this is that the order in which the Observables are emitting is maintained.

the concatMap logs the values in the same value as they were started.

### 总结：
**map** is for mapping ‘normal’ values to whatever format you need it to be. The return value will be wrapped in an Observable again, so you can keep using it in your data stream. 

When you have to deal with an ‘inner’ Observable it’s easier to use mergeMap, switchMap or concatMap. 
Use **mergeMap** if you simply want to flatten the data into one Observable, 
use **switchMap** if you need to flatten the data into one Observable but only need the latest value
use **concatMap** if you need to flatten the data into one Observable and the order is important to you.

**flatMap**, FlatMap is an alias of mergeMap and behaves in the same way

eg: 
```ts
import { of, from } from 'rxjs'; 
import { map, delay } from 'rxjs/operators';

const getData = (param) => {
  return of(`retrieved new data with param ${param}`).pipe(
    delay(1000)
  )
}

from([1,2,3,4]).pipe(
  map(param => getData(param))
).subscribe(val => console.log(val);
```
we have from([1,2,3,4]) as our ‘outer’ Observable, and the result of the getData() as our ‘inner’ Observable.
In theory we have to subscribe to both our outer and inner Observable to get the data out.

As you can might imagine this is far from ideal as we have to call Subscribe two times. This is where mergeMap comes to the rescue. MergeMap essentially is a combination of mergeAll and map. MergeAll takes care of subscribing to the ‘inner’ Observable so that we no longer have to Subscribe two times as mergeAll merges the value of the ‘inner’ Observable into the ‘outer’ Observable.


This already is much better, but as you might already guessed mergeMap would be the best solution for this
```ts
import { of, from } from 'rxjs'; 
import { map, mergeMap, delay, mergeAll } from 'rxjs/operators';

const getData = (param) => {
  return of(`retrieved new data with param ${param}`).pipe(
    delay(1000)
  )
}

// using a regular map
from([1,2,3,4]).pipe(
  map(param => getData(param))
).subscribe(val => val.subscribe(data => console.log(data)));

// using map and mergeAll
from([1,2,3,4]).pipe(
  map(param => getData(param)),
  mergeAll()
).subscribe(val => console.log(val));

// using mergeMap
from([1,2,3,4]).pipe(
  mergeMap(param => getData(param))
```

You might also have heard about flatMap. FlatMap is an alias of mergeMap and behaves in the same way. Don’t get confused there!


### 命名约定

可观察对象的名字以`$`符号结尾，
如果希望用某个属性来存储来自可观察对象的最近一个值，它的命名惯例是与可观察对象同名，但不带“$”后缀。



Refer:   
https://angular.cn/guide/rx-library#the-rxjs-library
https://cn.rx.js.org/manual/index.html   
https://medium.com/@luukgruijs/understanding-rxjs-map-mergemap-switchmap-and-concatmap-833fc1fb09ff
