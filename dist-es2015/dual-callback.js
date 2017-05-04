import xs from 'xstream';
export class DualCallbackProducer {
    constructor(fun, ...rest) {
        this.fun = fun;
        this.rest = rest;
    }
    start(listener) {
        this.fun(value => {
            listener.next(value);
            listener.complete();
        }, listener.error.bind(listener), ...this.rest);
    }
    stop() { }
}
export class CancellableDualCallbackProducer {
    constructor(fun, cancel, ...rest) {
        this.fun = fun;
        this.cancel = cancel;
        this.rest = rest;
    }
    start(listener) {
        this.cancelId = this.fun(listener.next.bind(listener), listener.error.bind(listener), ...this.rest);
    }
    stop() {
        this.cancel(this.cancelId);
    }
}
/**
 * Creates a stream from a function that expects a success callback, an error callback, then any
 * number of arguments following that. An example would be navigator.geolocation.getPosition().
 */
export function fromDualCallback(fun, ...rest) {
    return xs.create(new DualCallbackProducer(fun, ...rest));
}
/**
 * Creates a stream from a "watch" function that expects a success callback, an error callback,
 * any number of arguments following that, then returns an ID for cancellation. An example would
 * be navigator.geolocation.watchPosition().
 */
export function fromCancellableDualCallback(fun, cancel, ...rest) {
    return xs.create(new CancellableDualCallbackProducer(fun, cancel, ...rest));
}
