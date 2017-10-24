"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var ForeverProducer = /** @class */ (function () {
    function ForeverProducer(item) {
        this.item = item;
    }
    ForeverProducer.prototype.start = function (listener) {
        listener.next(this.item);
    };
    ForeverProducer.prototype.stop = function () { };
    return ForeverProducer;
}());
exports.ForeverProducer = ForeverProducer;
/**
 * Creates a memory stream of a single item that never completes.
 * Like `xs.of(item)` but does not send a completion event and always
 * remembers.
 */
function forever(item) {
    return xstream_1.default.createWithMemory(new ForeverProducer(item));
}
exports.forever = forever;
