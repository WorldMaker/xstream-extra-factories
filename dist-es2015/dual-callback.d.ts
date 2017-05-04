import xs, { Listener, Producer } from 'xstream';
export declare type DualCallbackFunction<T, TReturn> = (success: (value: T) => void, error: (error: any) => void, ...rest: any[]) => TReturn;
export declare class DualCallbackProducer<T> implements Producer<T> {
    private fun;
    rest: any[];
    constructor(fun: DualCallbackFunction<T, void>, ...rest: any[]);
    start(listener: Listener<T>): void;
    stop(): void;
}
export declare class CancellableDualCallbackProducer<T> implements Producer<T> {
    private fun;
    private cancel;
    rest: any[];
    cancelId: number;
    constructor(fun: DualCallbackFunction<T, number>, cancel: (cancelId: number) => void, ...rest: any[]);
    start(listener: Listener<T>): void;
    stop(): void;
}
/**
 * Creates a stream from a function that expects a success callback, an error callback, then any
 * number of arguments following that. An example would be navigator.geolocation.getPosition().
 */
export declare function fromDualCallback<T>(fun: DualCallbackFunction<T, void>, ...rest: any[]): xs<T>;
/**
 * Creates a stream from a "watch" function that expects a success callback, an error callback,
 * any number of arguments following that, then returns an ID for cancellation. An example would
 * be navigator.geolocation.watchPosition().
 */
export declare function fromCancellableDualCallback<T>(fun: DualCallbackFunction<T, number>, cancel: (cancelId: number) => void, ...rest: any[]): xs<T>;
