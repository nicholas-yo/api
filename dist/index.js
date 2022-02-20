"use strict";
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
var _process = _interopRequireDefault(require("process"));
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
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
_asyncToGenerator(_regeneratorRuntime.default.mark(function _callee1() {
    var ref, server, ref1, url, hostname, port, protocol;
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx1) {
        while(1)switch(_ctx1.prev = _ctx1.next){
            case 0:
                _ctx1.next = 2;
                return Promise.resolve().then(function() {
                    return _interopRequireWildcard(require('./server/index'));
                });
            case 2:
                ref = _ctx1.sent;
                server = ref.default;
                _ctx1.next = 6;
                return Promise.resolve().then(function() {
                    return _interopRequireWildcard(require('./config/url'));
                });
            case 6:
                ref1 = _ctx1.sent;
                url = ref1.default;
                hostname = url.hostname, port = url.port, protocol = url.protocol;
                _ctx1.next = 11;
                return server;
            case 11:
                _ctx1.sent.listen(port, function() {
                    console.log("Running at ".concat(protocol).concat(hostname, ":").concat(port));
                });
                _process.default.on('exit', _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
                    return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.next = 2;
                                return server;
                            case 2:
                                return _ctx.abrupt("return", _ctx.sent.close());
                            case 3:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee);
                })));
            case 13:
            case "end":
                return _ctx1.stop();
        }
    }, _callee1);
}))();
