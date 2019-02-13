

## 基本用法和词汇

**可观察对象 observable**

**观察者  observer**

作为发布者，你创建一个 Observable 的实例，其中定义了一个**订阅者（subscriber）**函数。 当有消费者调用 `subscribe()` 方法时，这个函数就会执行。 订阅者函数用于定义“如何获取或生成那些要发布的值或消息”。

要执行所创建的**可观察对象**，并开始从中接收通知，你就要调用它的 subscribe() 方法，并传入一个**观察者（observer）**。 这是一个 JavaScript 对象，它定义了你收到的这些消息的处理器（handler）。 subscribe() 调用会返回一个 Subscription 对象，该对象具有一个 unsubscribe() 方法。 当调用该方法时，你就会停止接收通知。

把由可观察对象发布出来的数据统称为**流**。任何类型的值都可以表示为可观察对象，而这些值会被发布为一个流。

下面的例子会创建并订阅一个简单的可观察对象，它的观察者会把接收到的消息记录到控制台中
```js
// Create simple observable that emits three values
const myObservable = of(1, 2, 3); // of(...items) —— 返回一个 Observable 实例，它用同步的方式把参数中提供的这些值发送出来

// Create observer object
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// Execute with the observer object
myObservable.subscribe(myObserver);
// Logs:
// Observer got a next value: 1
// Observer got a next value: 2
// Observer got a next value: 3
// Observer got a complete notification
```


下例展示了如何使用可观察对象来对当前地理位置进行更新
```js
// Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const locations = new Observable((observer) => {
  // Get the next and error callbacks. These will be passed in when
  // the consumer subscribes.
  const {next, error} = observer;
  let watchId;

  // Simple geolocation API check provides values to publish
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(next, error);
  } else {
    error('Geolocation not available');
  }

  // When the consumer unsubscribes, clean up data ready for next subscription.
  return {
    unsubscribe() { 
        navigator.geolocation.clearWatch(watchId); 
    }
  };
});

// Call subscribe() to start listening for updates, subscribe()里的对象即是 observer, next处理器是必须的，而
// error 和 complete 处理器是可选的
const locationsSubscription = locations.subscribe({
  next(position) { 
    console.log('Current Position: ', position); 
  },
  
  error(msg) { 
    console.log('Error Getting Location: ', msg);
  }
});

// Stop listening for location after 10 seconds
setTimeout(() => { locationsSubscription.unsubscribe(); }, 10000);
```



## 多播

一般，可观察对象会为每一个观察者创建一次新的、独立的执行。 当观察者进行订阅时，该可观察对象会连上一个事件处理器，并且向那个观察者发送一些值。当第二个观察者订阅时，这个可观察对象就会连上一个新的事件处理器，并独立执行一次，把这些值发送给第二个可观察对象。

有时候，不应该对每一个订阅者都独立执行一次，你可能会希望每次订阅都得到同一批值 —— 即使是那些你已经发送过的。这在某些情况下有用，比如用来发送 document 上的点击事件的可观察对象。

**多播**用来让可观察对象在一次执行中同时广播给多个订阅者。借助支持多播的可观察对象，你不必注册多个监听器，而是复用第一个（next）监听器，并且把值发送给各个订阅者。

```js
function sequenceSubscriber(observer) {
  const seq = [1, 2, 3];
  let timeoutId;

  // Will run through an array of numbers, emitting one value
  // per second until it gets to the end of the array.
  function doSequence(arr, idx) {
    timeoutId = setTimeout(() => {
      observer.next(arr[idx]);
      if (idx === arr.length - 1) {
        observer.complete();
      } else {
        doSequence(arr, ++idx);
      }
    }, 1000);
  }

  doSequence(seq, 0);

  // Unsubscribe should clear the timeout to stop execution
  return {unsubscribe() {
    clearTimeout(timeoutId);
  }};
}

// Create a new Observable that will deliver the above sequence
const sequence = new Observable(sequenceSubscriber);

sequence.subscribe({
  next(num) { console.log(num); },
  complete() { console.log('Finished sequence'); }
});

// Logs:
// (at 1 second): 1
// (at 2 seconds): 2
// (at 3 seconds): 3
// (at 3 seconds): Finished sequence
```
注意，如果你订阅了两次，就会有两个独立的流，每个流都会每秒发出一个数字。代码如下：
```js
// Subscribe starts the clock, and will emit after 1 second
sequence.subscribe({
  next(num) { console.log('1st subscribe: ' + num); },
  complete() { console.log('1st sequence finished.'); }
});
 
// After 1/2 second, subscribe again.
setTimeout(() => {
  sequence.subscribe({
    next(num) { console.log('2nd subscribe: ' + num); },
    complete() { console.log('2nd sequence finished.'); }
  });
}, 500);
 
// Logs:
// (at 1 second): 1st subscribe: 1
// (at 1.5 seconds): 2nd subscribe: 1
// (at 2 seconds): 1st subscribe: 2
// (at 2.5 seconds): 2nd subscribe: 2
// (at 3 seconds): 1st subscribe: 3
// (at 3 seconds): 1st sequence finished
// (at 3.5 seconds): 2nd subscribe: 3
// (at 3.5 seconds): 2nd sequence finished
```

修改这个可观察对象以支持多播，代码如下：
```js
function multicastSequenceSubscriber() {
  const seq = [1, 2, 3];
  // Keep track of each observer (one for every active subscription)
  const observers = [];
  // Still a single timeoutId because there will only ever be one
  // set of values being generated, multicasted to each subscriber
  let timeoutId;

  // Return the subscriber function (runs when subscribe()
  // function is invoked)
  return (observer) => {
    observers.push(observer);
    // When this is the first subscription, start the sequence
    if (observers.length === 1) {
      timeoutId = doSequence({
        next(val) {
          // Iterate through observers and notify all subscriptions
          observers.forEach(obs => obs.next(val));
        },
        complete() {
          // Notify all complete callbacks
          observers.slice(0).forEach(obs => obs.complete());
        }
      }, seq, 0);
    }

    return {
      unsubscribe() {
        // Remove from the observers array so it's no longer notified
        observers.splice(observers.indexOf(observer), 1);
        // If there's no more listeners, do cleanup
        if (observers.length === 0) {
          clearTimeout(timeoutId);
        }
      }
    };
  };
}

// Run through an array of numbers, emitting one value
// per second until it gets to the end of the array.
function doSequence(observer, arr, idx) {
  return setTimeout(() => {
    observer.next(arr[idx]);
    if (idx === arr.length - 1) {
      observer.complete();
    } else {
      doSequence(observer, arr, ++idx);
    }
  }, 1000);
}

// Create a new Observable that will deliver the above sequence
const multicastSequence = new Observable(multicastSequenceSubscriber());

// Subscribe starts the clock, and begins to emit after 1 second
multicastSequence.subscribe({
  next(num) { console.log('1st subscribe: ' + num); },
  complete() { console.log('1st sequence finished.'); }
});

// After 1 1/2 seconds, subscribe again (should "miss" the first value).
setTimeout(() => {
  multicastSequence.subscribe({
    next(num) { console.log('2nd subscribe: ' + num); },
    complete() { console.log('2nd sequence finished.'); }
  });
}, 1500);

// Logs:
// (at 1 second): 1st subscribe: 1
// (at 2 seconds): 1st subscribe: 2
// (at 2 seconds): 2nd subscribe: 2
// (at 3 seconds): 1st subscribe: 3
// (at 3 seconds): 1st sequence finished
// (at 3 seconds): 2nd subscribe: 3
// (at 3 seconds): 2nd sequence finished
```
## angular中的可观察对象

* 事件发送器 EventEmitter

* HTTP

* Async 管道

* 路由器

* 响应式表单

## 可观察对象与其它技术的比较

1. 可观察对象 vs. 承诺

* 可观察对象是声明式的，在被订阅之前，它不会开始执行。承诺是在创建时就立即执行的。这让可观察对象可用于定义那些应该按需执行的菜谱。

* 可观察对象能提供多个值。承诺只提供一个。这让可观察对象可用于随着时间的推移获取多个值。

* 可观察对象会区分串联处理和订阅语句。承诺只有 .then() 语句。这让可观察对象可用于创建供系统的其它部分使用而不希望立即执行的复杂菜谱。

* 可观察对象的 subscribe() 会负责处理错误。承诺会把错误推送给它的子承诺。这让可观察对象可用于进行集中式、可预测的错误处理。

2. 可观察对象 vs. 事件 API
Observables compared to events API

3. 可观察对象 vs. 数组


refer: 
https://angular.cn/guide/observables-in-angular 