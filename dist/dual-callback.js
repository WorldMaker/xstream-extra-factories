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
        this.fun.apply(this, __spread([function (value) {
                listener.next(value);
                listener.complete();
            },
            listener.error.bind(listener)], this.rest));
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
        this.cancelId = this.fun.apply(this, __spread([listener.next.bind(listener),
            listener.error.bind(listener)], this.rest));
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
    return xstream_1.default.create(new (DualCallbackProducer.bind.apply(DualCallbackProducer, __spread([void 0, fun], rest)))());
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
    return xstream_1.default.create(new (CancellableDualCallbackProducer.bind.apply(CancellableDualCallbackProducer, __spread([void 0, fun, cancel], rest)))());
}
exports.fromCancellableDualCallback = fromCancellableDualCallback;
