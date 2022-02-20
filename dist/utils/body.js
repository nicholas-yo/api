"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
function _asyncIterator(iterable) {
    var method;
    if (typeof Symbol === "function") {
        if (Symbol.asyncIterator) {
            method = iterable[Symbol.asyncIterator];
            if (method != null) return method.call(iterable);
        }
        if (Symbol.iterator) {
            method = iterable[Symbol.iterator];
            if (method != null) return method.call(iterable);
        }
    }
    throw new TypeError("Object is not async iterable");
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var _default = function() {
    function bodyParser(req) {
        return _bodyParser.apply(this, arguments);
    }
    function _bodyParser() {
        _bodyParser = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(req) {
            var buffers, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk;
            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        buffers = [];
                        _iteratorAbruptCompletion = false, _didIteratorError = false;
                        _ctx.prev = 2;
                        _iterator = _asyncIterator(req);
                    case 4:
                        _ctx.next = 6;
                        return _iterator.next();
                    case 6:
                        if (!(_iteratorAbruptCompletion = !(_step = _ctx.sent).done)) {
                            _ctx.next = 11;
                            break;
                        }
                        {
                            _value = _step.value;
                            chunk = _value;
                            buffers.push(chunk);
                        }
                    case 8:
                        _iteratorAbruptCompletion = false;
                        _ctx.next = 4;
                        break;
                    case 11:
                        _ctx.next = 17;
                        break;
                    case 13:
                        _ctx.prev = 13;
                        _ctx.t0 = _ctx["catch"](2);
                        _didIteratorError = true;
                        _iteratorError = _ctx.t0;
                    case 17:
                        _ctx.prev = 17;
                        _ctx.prev = 18;
                        if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                            _ctx.next = 22;
                            break;
                        }
                        _ctx.next = 22;
                        return _iteratorError.return();
                    case 22:
                        _ctx.prev = 22;
                        if (!_didIteratorError) {
                            _ctx.next = 25;
                            break;
                        }
                        throw _iteratorError;
                    case 25:
                        return _ctx.finish(22);
                    case 26:
                        return _ctx.finish(17);
                    case 27:
                        return _ctx.abrupt("return", JSON.parse(Buffer.concat(buffers).toString()));
                    case 28:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee, null, [
                [
                    2,
                    13,
                    17,
                    27
                ],
                [
                    18,
                    ,
                    22,
                    26
                ]
            ]);
        }));
        return _bodyParser.apply(this, arguments);
    }
    return {
        bodyParser: bodyParser
    };
}();
exports.default = _default;
