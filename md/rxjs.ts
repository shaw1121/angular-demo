import { Observable } from "rxjs";

// Create an Observable that will start listening to geolocation updates
// when a consumer subscribes.
const locations = new Observable(observer => {
    // Get the next and error callbacks. These will be passed in when
    // the consumer subscribes.
    const { next, error } = observer;
    let watchId;

    // Simple geolocation API check provides values to publish
    if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(next, error);
    } else {
        error("Geolocation not available");
    }

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {
        unsubscribe() {
            navigator.geolocation.clearWatch(watchId);
        }
    };
});

// Call subscribe() to start listening for updates.
const locationsSubscription = locations.subscribe({
    next(position) {
        console.log("Current Position: ", position);
    },
    error(msg) {
        console.log("Error Getting Location: ", msg);
    }
});

// Stop listening for location after 10 seconds
setTimeout(() => {
    locationsSubscription.unsubscribe();
}, 10000);

// 多播
// 来看一个从 1 到 3 进行计数的例子，它每发出一个数字就会等待 1 秒。
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
    return {
        unsubscribe() {
            clearTimeout(timeoutId);
        }
    };
}

// Create a new Observable that will deliver the above sequence
const sequence = new Observable(sequenceSubscriber);

sequence.subscribe({
    next(num) {
        console.log(num);
    },
    complete() {
        console.log("Finished sequence");
    }
});

// Logs:
// (at 1 second): 1
// (at 2 seconds): 2
// (at 3 seconds): 3
// (at 3 seconds): Finished sequence

// 如果你订阅了两次，就会有两个独立的流，每个流都会每秒发出一个数字。代码如下：
// Subscribe starts the clock, and will emit after 1 second
sequence.subscribe({
    next(num) {
        console.log("1st subscribe: " + num);
    },
    complete() {
        console.log("1st sequence finished.");
    }
});

// After 1/2 second, subscribe again.
setTimeout(() => {
    sequence.subscribe({
        next(num) {
            console.log("2nd subscribe: " + num);
        },
        complete() {
            console.log("2nd sequence finished.");
        }
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

// 修改这个可观察对象以支持多播，
function multicastSequenceSubscriber() {
    const seq = [1, 2, 3];
    // Keep track of each observer (one for every active subscription)
    const observers = [];
    // Still a single timeoutId because there will only ever be one
    // set of values being generated, multicasted to each subscriber
    let timeoutId;

    // Return the subscriber function (runs when subscribe()
    // function is invoked)
    return observer => {
        observers.push(observer);
        // When this is the first subscription, start the sequence
        if (observers.length === 1) {
            timeoutId = doSequence(
                {
                    next(val) {
                        // Iterate through observers and notify all subscriptions
                        observers.forEach(obs => obs.next(val));
                    },
                    complete() {
                        // Notify all complete callbacks
                        observers.slice(0).forEach(obs => obs.complete());
                    }
                },
                seq,
                0
            );
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
    next(num) {
        console.log("1st subscribe: " + num);
    },
    complete() {
        console.log("1st sequence finished.");
    }
});

// After 1 1/2 seconds, subscribe again (should "miss" the first value).
setTimeout(() => {
    multicastSequence.subscribe({
        next(num) {
            console.log("2nd subscribe: " + num);
        },
        complete() {
            console.log("2nd sequence finished.");
        }
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
