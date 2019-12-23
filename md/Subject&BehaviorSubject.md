# BehaviorSubject VS. Subject

## BehaviorSubject

Subject的一个变体是 BehaviorSubject，它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”。

> BehaviorSubjects 适合用来表示“随时间推移的值”。举例来说，生日的流是一个 Subject，但年龄的流应该是一个 BehaviorSubject 。

> BehaviourSubject will return the initial value or the current value on Subscription

在下面的示例中，BehaviorSubject 使用值0进行初始化，当第一个观察者订阅时会得到0。第二个观察者订阅时会得到值2，尽管它是在值2发送之后订阅的。

```js
var subject = new Rx.BehaviorSubject(0); // 0是初始值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
```

输出：

```js
observerA: 0
observerA: 1
observerA: 2

observerB: 2  // 保存的当前值

observerA: 3
observerB: 3
```

## Subject

Subject doesnot return the current value on Subscription. It triggers only on `.next(value)` call and return/output the value

```js
var subject = new Rx.Subject();

subject.next(1); // Subjects will not output this value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(2);
subject.next(3);
```

With the following output on the console:

```js
observerA: 2
observerB: 2
observerA: 3
observerB: 3
```

Refer:   
https://cn.rx.js.org/manual/overview.html#h26
