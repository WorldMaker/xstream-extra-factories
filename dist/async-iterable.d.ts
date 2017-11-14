import xs, { Listener, Producer } from 'xstream';
export declare class AsyncIterableProducer<T> implements Producer<T> {
    private iterable;
    private cancel;
    constructor(iterable: AsyncIterableIterator<T>);
    start(listener: Listener<T>): Promise<void>;
    stop(): void;
}
export declare function fromAsyncIterable<T>(iterable: AsyncIterableIterator<T>): xs<T>;
