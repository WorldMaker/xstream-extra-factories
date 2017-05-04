import xs from 'xstream';
export class ForeverProducer {
    constructor(item) {
        this.item = item;
    }
    start(listener) {
        listener.next(this.item);
    }
    stop() { }
}
/**
 * Creates a memory stream of a single item that never completes.
 * Like `xs.of(item)` but does not send a completion event and always
 * remembers.
 */
export function forever(item) {
    return xs.createWithMemory(new ForeverProducer(item));
}
