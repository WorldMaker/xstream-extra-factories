"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = require("xstream");
var DualCallbackProducer = /** @class */ (function () {
    function DualCallbackProducer(fun) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.fun = fun;
        this.rest = rest;
    }
    DualCallbackProducer.prototype.start = function (listener) {
        this.fun.apply(this, [function (value) {
                listener.next(value);
                listener.complete();
            },
            listener.error.bind(listener)].concat(this.rest));
    };
    DualCallbackProducer.prototype.stop = function () { };
    return DualCallbackProducer;
}());
exports.DualCallbackProducer = DualCallbackProducer;
var CancellableDualCallbackProducer = /** @class */ (function () {
    function CancellableDualCallbackProducer(fun, cancel) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        this.fun = fun;
        this.cancel = cancel;
        this.rest = rest;
    }
    CancellableDualCallbackProducer.prototype.start = function (listener) {
        this.cancelId = this.fun.apply(this, [listener.next.bind(listener),
            listener.error.bind(listener)].concat(this.rest));
    };
    CancellableDualCallbackProducer.prototype.stop = function () {
        this.cancel(this.cancelId);
    };
    return CancellableDualCallbackProducer;
}());
exports.CancellableDualCallbackProducer = CancellableDualCallbackProducer;
/**
 * Creates a stream from a function that expects a success callback, an error callback, then any
 * number of arguments following that. An example would be navigator.geolocation.getPosition().
 */
function fromDualCallback(fun) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return xstream_1.default.create(new (DualCallbackProducer.bind.apply(DualCallbackProducer, [void 0, fun].concat(rest)))());
}
exports.fromDualCallback = fromDualCallback;
/**
 * Creates a stream from a "watch" function that expects a success callback, an error callback,
 * any number of arguments following that, then returns an ID for cancellation. An example would
 * be navigator.geolocation.watchPosition().
 */
function fromCancellableDualCallback(fun, cancel) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return xstream_1.default.create(new (CancellableDualCallbackProducer.bind.apply(CancellableDualCallbackProducer, [void 0, fun, cancel].concat(rest)))());
}
exports.fromCancellableDualCallback = fromCancellableDualCallback;
