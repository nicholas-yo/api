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
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
var _default = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee1() {
    var ref1, Prisma, prisma, Headers, verifyMethod, routes;
    return _regeneratorRuntime.default.wrap(function _callee$(_ctx1) {
        while(1)switch(_ctx1.prev = _ctx1.next){
            case 0:
                _ctx1.next = 2;
                return Promise.resolve().then(function() {
                    return _interopRequireWildcard(require('../database/prisma'));
                });
            case 2:
                ref1 = _ctx1.sent;
                Prisma = ref1.default;
                _ctx1.next = 6;
                return Prisma;
            case 6:
                prisma = _ctx1.sent.prisma;
                Headers = (function() {
                    var _ref = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(header) {
                        var defautHeader;
                        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    defautHeader = {
                                        'Content-Type': 'application/json'
                                    };
                                    if (!header) {
                                        _ctx.next = 3;
                                        break;
                                    }
                                    return _ctx.abrupt("return", _objectSpread({}, defautHeader, header));
                                case 3:
                                    return _ctx.abrupt("return", defautHeader);
                                case 4:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }));
                    return function Headers(header) {
                        return _ref.apply(this, arguments);
                    };
                })();
                verifyMethod = (function() {
                    var _ref = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(method, ctx, callback) {
                        var req, res;
                        return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                            while(1)switch(_ctx.prev = _ctx.next){
                                case 0:
                                    req = ctx.req, res = ctx.res;
                                    if (!(req.method === method)) {
                                        _ctx.next = 5;
                                        break;
                                    }
                                    {
                                        callback();
                                    }
                                    _ctx.next = 11;
                                    break;
                                case 5:
                                    _ctx.t0 = res;
                                    _ctx.next = 8;
                                    return Headers();
                                case 8:
                                    _ctx.t1 = _ctx.sent;
                                    _ctx.t0.writeHead.call(_ctx.t0, 405, _ctx.t1);
                                    res.json({
                                        error: 'Method Not Allowed'
                                    });
                                case 11:
                                case "end":
                                    return _ctx.stop();
                            }
                        }, _callee);
                    }));
                    return function verifyMethod(method, ctx, callback) {
                        return _ref.apply(this, arguments);
                    };
                })();
                routes = {
                    '/api/users': function(req, res) {
                        verifyMethod('GET', {
                            req: req,
                            res: res
                        }, _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
                            var ref, cookies, parseCookies;
                            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                                while(1)switch(_ctx.prev = _ctx.next){
                                    case 0:
                                        _ctx.next = 2;
                                        return Promise.resolve().then(function() {
                                            return _interopRequireWildcard(require('../utils/cookies'));
                                        });
                                    case 2:
                                        ref = _ctx.sent;
                                        cookies = ref.default;
                                        _ctx.next = 6;
                                        return cookies;
                                    case 6:
                                        parseCookies = _ctx.sent.parseCookies;
                                        console.log(parseCookies(req.headers.cookies));
                                        _ctx.t0 = res;
                                        _ctx.next = 11;
                                        return Headers();
                                    case 11:
                                        _ctx.t1 = _ctx.sent;
                                        _ctx.t0.writeHead.call(_ctx.t0, 200, _ctx.t1);
                                        _ctx.t2 = res;
                                        _ctx.next = 16;
                                        return prisma.user.findMany();
                                    case 16:
                                        _ctx.t3 = _ctx.sent;
                                        _ctx.t2.json.call(_ctx.t2, _ctx.t3);
                                    case 18:
                                    case "end":
                                        return _ctx.stop();
                                }
                            }, _callee);
                        })));
                    },
                    '/api/register/user': function(req, res) {
                        verifyMethod('POST', {
                            req: req,
                            res: res
                        }, _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
                            var ref, hash, genSalt, ref2, email, name, password, confirmPassword, user, salt, encryptedPassword, data, createdData;
                            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                                while(1)switch(_ctx.prev = _ctx.next){
                                    case 0:
                                        _ctx.next = 2;
                                        return Promise.resolve().then(function() {
                                            return _interopRequireWildcard(require('bcrypt'));
                                        });
                                    case 2:
                                        ref = _ctx.sent;
                                        hash = ref.hash;
                                        genSalt = ref.genSalt;
                                        _ctx.next = 7;
                                        return req.body;
                                    case 7:
                                        ref2 = _ctx.sent;
                                        email = ref2.email;
                                        name = ref2.name;
                                        password = ref2.password;
                                        confirmPassword = ref2.confirmPassword;
                                        _ctx.next = 14;
                                        return prisma.user.findUnique({
                                            where: {
                                                email: email
                                            }
                                        });
                                    case 14:
                                        user = _ctx.sent;
                                        if (email) {
                                            _ctx.next = 23;
                                            break;
                                        }
                                        _ctx.t0 = res;
                                        _ctx.next = 19;
                                        return Headers();
                                    case 19:
                                        _ctx.t1 = _ctx.sent;
                                        _ctx.t0.writeHead.call(_ctx.t0, 406, _ctx.t1);
                                        res.json({
                                            error: 'You must provide a email'
                                        });
                                        return _ctx.abrupt("return");
                                    case 23:
                                        if (!(user === null || user === void 0 ? void 0 : user.email)) {
                                            _ctx.next = 31;
                                            break;
                                        }
                                        _ctx.t2 = res;
                                        _ctx.next = 27;
                                        return Headers();
                                    case 27:
                                        _ctx.t3 = _ctx.sent;
                                        _ctx.t2.writeHead.call(_ctx.t2, 406, _ctx.t3);
                                        res.json({
                                            error: 'Email already exists, try other'
                                        });
                                        return _ctx.abrupt("return");
                                    case 31:
                                        if (name) {
                                            _ctx.next = 39;
                                            break;
                                        }
                                        _ctx.t4 = res;
                                        _ctx.next = 35;
                                        return Headers();
                                    case 35:
                                        _ctx.t5 = _ctx.sent;
                                        _ctx.t4.writeHead.call(_ctx.t4, 406, _ctx.t5);
                                        res.json({
                                            error: 'You must provide a name'
                                        });
                                        return _ctx.abrupt("return");
                                    case 39:
                                        if (!(password !== confirmPassword)) {
                                            _ctx.next = 47;
                                            break;
                                        }
                                        _ctx.t6 = res;
                                        _ctx.next = 43;
                                        return Headers();
                                    case 43:
                                        _ctx.t7 = _ctx.sent;
                                        _ctx.t6.writeHead.call(_ctx.t6, 406, _ctx.t7);
                                        res.json({
                                            error: 'Password is not equal'
                                        });
                                        return _ctx.abrupt("return");
                                    case 47:
                                        _ctx.next = 49;
                                        return genSalt(10);
                                    case 49:
                                        salt = _ctx.sent;
                                        _ctx.next = 52;
                                        return hash(password, salt);
                                    case 52:
                                        encryptedPassword = _ctx.sent;
                                        data = {
                                            email: email,
                                            name: name,
                                            password: encryptedPassword
                                        };
                                        _ctx.next = 56;
                                        return prisma.user.create({
                                            data: data
                                        });
                                    case 56:
                                        createdData = _ctx.sent;
                                        _ctx.t8 = res;
                                        _ctx.next = 60;
                                        return Headers();
                                    case 60:
                                        _ctx.t9 = _ctx.sent;
                                        _ctx.t8.writeHead.call(_ctx.t8, 200, _ctx.t9);
                                        res.json(createdData);
                                    case 63:
                                    case "end":
                                        return _ctx.stop();
                                }
                            }, _callee);
                        })));
                    },
                    '/api/auth/user': function(req, res) {
                        verifyMethod('GET', {
                            req: req,
                            res: res
                        }, _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
                            var randomBytes, sign, compare, ref, email, password, user, token, name, session;
                            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                                while(1)switch(_ctx.prev = _ctx.next){
                                    case 0:
                                        _ctx.next = 2;
                                        return Promise.resolve().then(function() {
                                            return _interopRequireWildcard(require('crypto'));
                                        });
                                    case 2:
                                        randomBytes = _ctx.sent.randomBytes;
                                        _ctx.next = 5;
                                        return Promise.resolve().then(function() {
                                            return _interopRequireWildcard(require('jsonwebtoken'));
                                        });
                                    case 5:
                                        sign = _ctx.sent.sign;
                                        _ctx.next = 8;
                                        return Promise.resolve().then(function() {
                                            return _interopRequireWildcard(require('bcrypt'));
                                        });
                                    case 8:
                                        compare = _ctx.sent.compare;
                                        _ctx.next = 11;
                                        return req.body;
                                    case 11:
                                        ref = _ctx.sent;
                                        email = ref.email;
                                        password = ref.password;
                                        _ctx.next = 16;
                                        return prisma.user.findUnique({
                                            where: {
                                                email: email
                                            }
                                        });
                                    case 16:
                                        user = _ctx.sent;
                                        if (user === null || user === void 0 ? void 0 : user.email) {
                                            _ctx.next = 25;
                                            break;
                                        }
                                        _ctx.t0 = res;
                                        _ctx.next = 21;
                                        return Headers();
                                    case 21:
                                        _ctx.t1 = _ctx.sent;
                                        _ctx.t0.writeHead.call(_ctx.t0, 404, _ctx.t1);
                                        res.json({
                                            msg: "User with email ".concat(email, " not found")
                                        });
                                        return _ctx.abrupt("return");
                                    case 25:
                                        _ctx.next = 27;
                                        return compare(password, user === null || user === void 0 ? void 0 : user.password);
                                    case 27:
                                        if (_ctx.sent) {
                                            _ctx.next = 35;
                                            break;
                                        }
                                        _ctx.t2 = res;
                                        _ctx.next = 31;
                                        return Headers();
                                    case 31:
                                        _ctx.t3 = _ctx.sent;
                                        _ctx.t2.writeHead.call(_ctx.t2, 406, _ctx.t3);
                                        res.json({
                                            msg: 'Invalid password'
                                        });
                                        return _ctx.abrupt("return");
                                    case 35:
                                        token = sign(user, randomBytes(26), {
                                            expiresIn: '1h'
                                        });
                                        name = user.name;
                                        session = {
                                            user: {
                                                name: name,
                                                email: email
                                            },
                                            token: token
                                        };
                                        _ctx.t4 = res;
                                        _ctx.next = 41;
                                        return Headers();
                                    case 41:
                                        _ctx.t5 = _ctx.sent;
                                        _ctx.t4.writeHead.call(_ctx.t4, 200, _ctx.t5);
                                        res.json(session);
                                    case 44:
                                    case "end":
                                        return _ctx.stop();
                                }
                            }, _callee);
                        })));
                    },
                    '/api/user': (function() {
                        var _ref = _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee(req, res) {
                            var id, name, updatedUserData, id1, deletedUser;
                            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                                while(1)switch(_ctx.prev = _ctx.next){
                                    case 0:
                                        if (!(req.method === 'PUT')) {
                                            _ctx.next = 16;
                                            break;
                                        }
                                        id = req.query.id;
                                        _ctx.next = 4;
                                        return req.body;
                                    case 4:
                                        name = _ctx.sent.name;
                                        _ctx.next = 7;
                                        return prisma.user.update({
                                            select: {
                                                name: true
                                            },
                                            data: {
                                                name: name
                                            },
                                            where: {
                                                id: id
                                            }
                                        });
                                    case 7:
                                        updatedUserData = _ctx.sent;
                                        _ctx.t0 = res;
                                        _ctx.next = 11;
                                        return Headers();
                                    case 11:
                                        _ctx.t1 = _ctx.sent;
                                        _ctx.t0.writeHead.call(_ctx.t0, 200, _ctx.t1);
                                        res.json(updatedUserData);
                                        _ctx.next = 30;
                                        break;
                                    case 16:
                                        if (!(req.method === 'DELETE')) {
                                            _ctx.next = 24;
                                            break;
                                        }
                                        id1 = req.query.id;
                                        _ctx.next = 20;
                                        return prisma.user.delete({
                                            where: {
                                                id: id1
                                            }
                                        });
                                    case 20:
                                        deletedUser = _ctx.sent;
                                        res.json(deletedUser);
                                        _ctx.next = 30;
                                        break;
                                    case 24:
                                        _ctx.t2 = res;
                                        _ctx.next = 27;
                                        return Headers();
                                    case 27:
                                        _ctx.t3 = _ctx.sent;
                                        _ctx.t2.writeHead.call(_ctx.t2, 405, _ctx.t3);
                                        res.json({
                                            error: 'Method Not Allowed'
                                        });
                                    case 30:
                                    case "end":
                                        return _ctx.stop();
                                }
                            }, _callee);
                        }));
                        return function(req, res) {
                            return _ref.apply(this, arguments);
                        };
                    })(),
                    notFound: function(req, res) {
                        verifyMethod('GET', {
                            req: req,
                            res: res
                        }, _asyncToGenerator(_regeneratorRuntime.default.mark(function _callee() {
                            return _regeneratorRuntime.default.wrap(function _callee$(_ctx) {
                                while(1)switch(_ctx.prev = _ctx.next){
                                    case 0:
                                        _ctx.t0 = res;
                                        _ctx.next = 3;
                                        return Headers();
                                    case 3:
                                        _ctx.t1 = _ctx.sent;
                                        _ctx.t0.writeHead.call(_ctx.t0, 404, _ctx.t1);
                                        res.json({
                                            error: 'Not Found'
                                        });
                                    case 6:
                                    case "end":
                                        return _ctx.stop();
                                }
                            }, _callee);
                        })));
                    }
                };
                return _ctx1.abrupt("return", routes);
            case 11:
            case "end":
                return _ctx1.stop();
        }
    }, _callee1);
}))();
exports.default = _default;
