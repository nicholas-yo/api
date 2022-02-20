"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
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
var _default = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee1() {
    var json, _json;
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx1) {
        while(1)switch(_ctx1.prev = _ctx1.next){
            case 0:
                json = function _json1(res, chunk) {
                    return _json.apply(this, arguments);
                };
                _json = function __json() {
                    _json = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(res, chunk) {
                        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    return _ctx.abrupt("return", res.end(JSON.stringify(chunk)));
                                case 1:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }));
                    return _json.apply(this, arguments);
                };
                ;
                ;
                return _ctx1.abrupt("return", {
                    json: json
                });
            case 5:
            case "end":
                return _ctx1.stop();
        }
    }, _callee1);
}))();
exports.default = _default;
