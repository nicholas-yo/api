"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
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
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
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
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var _default = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee1() {
    var createServer, server;
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx1) {
        while(1)switch(_ctx1.prev = _ctx1.next){
            case 0:
                _ctx1.next = 2;
                return Promise.resolve().then(function() {
                    return _interopRequireWildcard(require('http'));
                });
            case 2:
                createServer = _ctx1.sent.createServer;
                server = createServer(function() {
                    var _ref = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee2(req, res) {
                        var parse, ref3, bodyParser, ref1, jsonParser, ref2, routes1, json, query, extractPath, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, route;
                        return _regeneratorRuntime.default.wrap(function _callee$(_ctx2) {
                            while(1)switch(_ctx2.prev = _ctx2.next){
                                case 0:
                                    _ctx2.next = 2;
                                    return Promise.resolve().then(function() {
                                        return _interopRequireWildcard(require('url'));
                                    });
                                case 2:
                                    parse = _ctx2.sent.parse;
                                    _ctx2.next = 5;
                                    return Promise.resolve().then(function() {
                                        return _interopRequireWildcard(require('../utils/body'));
                                    });
                                case 5:
                                    ref3 = _ctx2.sent;
                                    bodyParser = ref3.default.bodyParser;
                                    _ctx2.next = 9;
                                    return Promise.resolve().then(function() {
                                        return _interopRequireWildcard(require('../utils/json'));
                                    });
                                case 9:
                                    ref1 = _ctx2.sent;
                                    jsonParser = ref1.default;
                                    _ctx2.next = 13;
                                    return Promise.resolve().then(function() {
                                        return _interopRequireWildcard(require('../routes/index'));
                                    });
                                case 13:
                                    ref2 = _ctx2.sent;
                                    routes1 = ref2.default;
                                    _ctx2.next = 17;
                                    return jsonParser;
                                case 17:
                                    json = _ctx2.sent.json;
                                    query = parse(req.url, true).query;
                                    Object.defineProperty(req, 'body', {
                                        enumerable: true,
                                        configurable: false,
                                        get: _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
                                            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                                                while(1)switch(_ctx.prev = _ctx.next){
                                                    case 0:
                                                        _ctx.next = 2;
                                                        return bodyParser(req);
                                                    case 2:
                                                        return _ctx.abrupt("return", _ctx.sent);
                                                    case 3:
                                                    case "end":
                                                        return _ctx.stop();
                                                }
                                            }, _callee);
                                        }))
                                    });
                                    Object.defineProperty(res, 'json', {
                                        enumerable: true,
                                        configurable: false,
                                        get: function() {
                                            return json.bind(null, res);
                                        }
                                    });
                                    Object.defineProperty(req, 'query', {
                                        configurable: false,
                                        enumerable: true,
                                        get: function() {
                                            return query;
                                        },
                                        set: function(value) {
                                            return value;
                                        }
                                    });
                                    extractPath = function() {
                                        var ref;
                                        var arrayPath = (ref = req.url) === null || ref === void 0 ? void 0 : ref.split('/');
                                        arrayPath.splice(0, 1);
                                        var _arrayPath = _toArray(arrayPath), root = _arrayPath[0], routes = _arrayPath.slice(1);
                                        var path = "/".concat(root, "/").concat(routes.join('/'));
                                        var pattern = /[?][a-z]*=[A-Z0-9._%+-]*/i;
                                        if (path.search(pattern)) {
                                            var searchQuery = path.match(pattern);
                                            var breakApart = searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.join('').split('=');
                                            var propertyKey = breakApart === null || breakApart === void 0 ? void 0 : breakApart[0].split('?').join('');
                                            var propertyValue = breakApart === null || breakApart === void 0 ? void 0 : breakApart.splice(1, 2).join('');
                                            var newPath = path.replace("".concat(searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.join('')), '');
                                            req.query = _defineProperty({}, propertyKey, propertyValue);
                                            return newPath;
                                        }
                                        return path;
                                    };
                                    _iteratorAbruptCompletion = false, _didIteratorError = false;
                                    _ctx2.prev = 24;
                                    _ctx2.t0 = _asyncIterator;
                                    _ctx2.next = 28;
                                    return routes1;
                                case 28:
                                    _ctx2.t1 = _ctx2.sent;
                                    _ctx2.t2 = [
                                        _ctx2.t1
                                    ];
                                    _iterator = (0, _ctx2.t0)(_ctx2.t2);
                                case 31:
                                    _ctx2.next = 33;
                                    return _iterator.next();
                                case 33:
                                    if (!(_iteratorAbruptCompletion = !(_step = _ctx2.sent).done)) {
                                        _ctx2.next = 38;
                                        break;
                                    }
                                    {
                                        _value = _step.value;
                                        route = _value;
                                        (route[extractPath()] || route.notFound)(req, res);
                                    }
                                case 35:
                                    _iteratorAbruptCompletion = false;
                                    _ctx2.next = 31;
                                    break;
                                case 38:
                                    _ctx2.next = 44;
                                    break;
                                case 40:
                                    _ctx2.prev = 40;
                                    _ctx2.t3 = _ctx2["catch"](24);
                                    _didIteratorError = true;
                                    _iteratorError = _ctx2.t3;
                                case 44:
                                    _ctx2.prev = 44;
                                    _ctx2.prev = 45;
                                    if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                                        _ctx2.next = 49;
                                        break;
                                    }
                                    _ctx2.next = 49;
                                    return _iteratorError.return();
                                case 49:
                                    _ctx2.prev = 49;
                                    if (!_didIteratorError) {
                                        _ctx2.next = 52;
                                        break;
                                    }
                                    throw _iteratorError;
                                case 52:
                                    return _ctx2.finish(49);
                                case 53:
                                    return _ctx2.finish(44);
                                case 54:
                                case "end":
                                    return _ctx2.stop();
                            }
                        }, _callee2, null, [
                            [
                                24,
                                40,
                                44,
                                54
                            ],
                            [
                                45,
                                ,
                                49,
                                53
                            ]
                        ]);
                    }));
                    return function(req, res) {
                        return _ref.apply(this, arguments);
                    };
                }());
                return _ctx1.abrupt("return", server);
            case 5:
            case "end":
                return _ctx1.stop();
        }
    }, _callee1);
}))();
exports.default = _default;
