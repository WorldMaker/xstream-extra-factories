import xs, { Listener, Producer } from 'xstream'

export class AsyncIterableProducer<T> implements Producer<T> {
    private cancel = false

    constructor (private iterable: AsyncIterableIterator<T>) {}

    async start (listener: Listener<T>) {
        try {
            for await (let item of this.iterable) {
                listener.next(item)
                if (this.cancel) {
                    break
                }
            }
            listener.complete()
        } catch (err) {
            listener.error(err)
        }
    }

    stop () {
        this.cancel = true
    }
}

export function fromAsyncIterable<T> (iterable: AsyncIterableIterator<T>) {
    return xs.create(new AsyncIterableProducer(iterable))
}
