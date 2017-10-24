import xs, { Listener, Producer, MemoryStream } from 'xstream'

export class ForeverProducer<T> implements Producer<T> {
    constructor (private item: T) {
    }

    start (listener: Listener<T>) {
        listener.next(this.item)
    }

    stop () {}
}

/**
 * Creates a memory stream of a single item that never completes.
 * Like `xs.of(item)` but does not send a completion event and always
 * remembers.
 */
export function forever<T> (item: T): MemoryStream<T> {
    return xs.createWithMemory(new ForeverProducer(item))
}
