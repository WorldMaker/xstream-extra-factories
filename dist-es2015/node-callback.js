import xs from 'xstream';
export class NodeCallbackProducer {
    constructor(nodeFunction, ...rest) {
        this.nodeFunction = nodeFunction;
        this.rest = rest;
    }
    start(listener) {
        this.nodeFunction(...this.rest, (err, value) => {
            if (err) {
                listener.error(err);
                listener.complete();
                return;
            }
            listener.next(value);
            listener.complete();
        });
    }
    stop() { }
}
/**
 * Creates a stream from a Node-style callback. A Node-style callback
 * function takes any number of arguments and then lastly a callback of the
 * form (error: any, value: T) => void.
 */
export function fromNodeCallback(nodeFunction, ...rest) {
    return xs.create(new NodeCallbackProducer(nodeFunction, ...rest));
}
