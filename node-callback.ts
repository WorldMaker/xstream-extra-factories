import xs, { Listener, Producer, Stream } from 'xstream'

export type NodeCallback<T> = (err: any, value: T) => void
export type NodeFunction<T> = (...rest: (any | NodeCallback<T>)[]) => void

export class NodeCallbackProducer<T> implements Producer<T> {
    rest: any[]

    constructor (private nodeFunction: NodeFunction<T>, ...rest: any[]) {
        this.rest = rest
    }

    start (listener: Listener<T>) {
        this.nodeFunction(...this.rest, (err: any, value: T) => {
            if (err) {
                listener.error(err)
                listener.complete()
                return
            }
            listener.next(value)
            listener.complete()
        })
    }

    stop () {}
}

/**
 * Creates a stream from a Node-style callback. A Node-style callback
 * function takes any number of arguments and then lastly a callback of the
 * form (error: any, value: T) => void.
 */
export function fromNodeCallback<T> (nodeFunction: NodeFunction<T>, ...rest: any[]) {
    return xs.create(new NodeCallbackProducer(nodeFunction, ...rest)) as Stream<T>
}
