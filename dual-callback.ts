import xs, { Listener, Producer } from 'xstream'

export type DualCallbackFunction<T, TReturn> = (success: (value: T) => void,
                                                error: (error: any) => void,
                                                ...rest: any[]) => TReturn

export class DualCallbackProducer<T> implements Producer<T> {
    rest: any[]

    constructor (private fun: DualCallbackFunction<T, void>, ...rest: any[]) {
        this.rest = rest
    }

    start (listener: Listener<T>) {
        this.fun(value => {
            listener.next(value)
            listener.complete()
        },
                 listener.error.bind(listener),
                 ...this.rest)
    }

    stop () {}
}

export class CancellableDualCallbackProducer<T> implements Producer<T> {
    rest: any[]
    cancelId: number

    constructor (private fun: DualCallbackFunction<T, number>,
                 private cancel: (cancelId: number) => void,
                 ...rest: any[]) {
        this.rest = rest
    }

    start (listener: Listener<T>) {
        this.cancelId = this.fun(listener.next.bind(listener),
                                 listener.error.bind(listener),
                                 ...this.rest)
    }

    stop () {
        this.cancel(this.cancelId)
    }
}

/**
 * Creates a stream from a function that expects a success callback, an error callback, then any
 * number of arguments following that. An example would be navigator.geolocation.getPosition().
 */
export function fromDualCallback<T> (fun: DualCallbackFunction<T, void>, ...rest: any[]) {
    return xs.create(new DualCallbackProducer(fun, ...rest))
}

/**
 * Creates a stream from a "watch" function that expects a success callback, an error callback,
 * any number of arguments following that, then returns an ID for cancellation. An example would
 * be navigator.geolocation.watchPosition().
 */
export function fromCancellableDualCallback<T> (fun: DualCallbackFunction<T, number>,
                                                cancel: (cancelId: number) => void,
                                                ...rest: any[]) {
    return xs.create(new CancellableDualCallbackProducer(fun, cancel, ...rest))
}
