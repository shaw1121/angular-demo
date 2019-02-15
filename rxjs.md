
## RxJS

RxJS (Reactive Extensions for JavaScript)

RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单

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

### 命名约定

可观察对象的名字以“$”符号结尾，
如果希望用某个属性来存储来自可观察对象的最近一个值，它的命名惯例是与可观察对象同名，但不带“$”后缀。

Refer: 
https://angular.cn/guide/rx-library#the-rxjs-library
https://cn.rx.js.org/manual/index.html
