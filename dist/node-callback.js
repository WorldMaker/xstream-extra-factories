"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var NodeCallbackProducer = (function () {
    function NodeCallbackProducer(nodeFunction) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.nodeFunction = nodeFunction;
        this.rest = rest;
    }
    NodeCallbackProducer.prototype.start = function (listener) {
        this.nodeFunction.apply(this, this.rest.concat([function (err, value) {
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
    return xstream_1.default.create(new (NodeCallbackProducer.bind.apply(NodeCallbackProducer, [void 0, nodeFunction].concat(rest)))());
}
exports.fromNodeCallback = fromNodeCallback;
