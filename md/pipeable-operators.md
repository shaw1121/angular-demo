
# pipeable-operators

`pipe` 操作符由之前的 `let` 演化而来。

`Observable.prototype.pipe` 可以用来组合多个操作符，类似于dot-chaining。

在 `rxjs/util/pipe` 中还有一个工具函数 `pipe` 可以用于从其他操作符构建可重用的新的操作符。

## 用法：

```js
import { range } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

const source$ = range(0, 10);

source$.pipe(
  filter(x => x % 2 === 0),
  map(x => x + x),
  scan((acc, x) => acc + x, 0)
)
.subscribe(x => console.log(x))

// output
0
4
12
24
40
```

## 轻松构建自定义操作符
You can compose your custom operator in with other rxjs operators seamlessly.

```js
import { interval } from 'rxjs';
import { filter, map, take, toArray } from 'rxjs/operators';

/**
 * an operator that takes every Nth value
 */
const takeEveryNth = (n: number) => <T>(source: Observable<T>) =>
  new Observable<T>(observer => {
    let count = 0;
    return source.subscribe({
      next(x) {
        if (count++ % n === 0) observer.next(x);
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    })
  });

/**
 * You can also use an existing operator like so
 */
const takeEveryNthSimple = (n: number) => <T>(source: Observable<T>) =>
  source.pipe(filter((value, index) => index % n === 0 ))

/**
 * And since pipeable operators return functions, you can further simplify like so
 */
const takeEveryNthSimplest = (n: number) => filter((value, index) => index % n === 0);

interval(1000).pipe(
  takeEveryNth(2),
  map(x => x + x),
  takeEveryNthSimple(3),
  map(x => x * x),
  takeEveryNthSimplest(4),
  take(3),
  toArray()
)
.subscribe(x => console.log(x));
// [0, 2304, 9216]
```

Refer:   
https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md