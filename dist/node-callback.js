"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var NodeCallbackProducer = /** @class */ (function () {
    function NodeCallbackProducer(nodeFunction) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.nodeFunction = nodeFunction;
        this.rest = rest;
    }
    NodeCallbackProducer.prototype.start = function (listener) {
        this.nodeFunction.apply(this, __spread(this.rest, [function (err, value) {
                if (err) {
                    listener.error(err);
                    listener.complete();
                    return;
                }
                listener.next(value);
                listener.complete();
            }]));
    };
    NodeCallbackProducer.prototype.stop = function () { };
    return NodeCallbackProducer;
}());
exports.NodeCallbackProducer = NodeCallbackProducer;
/**
 * Creates a stream from a Node-style callback. A Node-style callback
 * function takes any number of arguments and then lastly a callback of the
 * form (error: any, value: T) => void.
 */
function fromNodeCallback(nodeFunction) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return xstream_1.default.create(new (NodeCallbackProducer.bind.apply(NodeCallbackProducer, __spread([void 0, nodeFunction], rest)))());
}
exports.fromNodeCallback = fromNodeCallback;
