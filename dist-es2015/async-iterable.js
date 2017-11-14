var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
import xs from 'xstream';
export class AsyncIterableProducer {
    constructor(iterable) {
        this.iterable = iterable;
        this.cancel = false;
    }
    start(listener) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                try {
                    for (var _a = __asyncValues(this.iterable), _b; _b = yield _a.next(), !_b.done;) {
                        let item = yield _b.value;
                        listener.next(item);
                        if (this.cancel) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                listener.complete();
            }
            catch (err) {
                listener.error(err);
            }
            var e_1, _c;
        });
    }
    stop() {
        this.cancel = true;
    }
}
export function fromAsyncIterable(iterable) {
    return xs.create(new AsyncIterableProducer(iterable));
}
