import xs, { Listener, Producer } from 'xstream';
export declare type NodeCallback<T> = (err: any, value: T) => void;
export declare type NodeFunction<T> = (...rest: (any | NodeCallback<T>)[]) => void;
export declare class NodeCallbackProducer<T> implements Producer<T> {
    private nodeFunction;
    rest: any[];
    constructor(nodeFunction: NodeFunction<T>, ...rest: any[]);
    start(listener: Listener<T>): void;
    stop(): void;
}
/**
 * Creates a stream from a Node-style callback. A Node-style callback
 * function takes any number of arguments and then lastly a callback of the
 * form (error: any, value: T) => void.
 */
export declare function fromNodeCallback<T>(nodeFunction: NodeFunction<T>, ...rest: any[]): xs<T>;
