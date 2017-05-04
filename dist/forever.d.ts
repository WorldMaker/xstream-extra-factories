import { Listener, Producer, MemoryStream } from 'xstream';
export declare class ForeverProducer<T> implements Producer<T> {
    private item;
    constructor(item: T);
    start(listener: Listener<T>): void;
    stop(): void;
}
/**
 * Creates a memory stream of a single item that never completes.
 * Like `xs.of(item)` but does not send a completion event and always
 * remembers.
 */
export declare function forever<T>(item: T): MemoryStream<T>;
