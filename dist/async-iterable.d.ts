import xs, { Listener, Producer } from 'xstream';
export declare class AsyncIterableProducer<T> implements Producer<T> {
    private iterable;
    private cancel;
    constructor(iterable: AsyncIterable<T>);
    start(listener: Listener<T>): Promise<void>;
    stop(): void;
}
export declare function fromAsyncIterable<T>(iterable: AsyncIterable<T>): xs<T>;
