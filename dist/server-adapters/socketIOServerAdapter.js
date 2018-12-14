"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io");
var serverAdapterInterface_1 = require("./serverAdapterInterface");
var SocketAdapter = (function () {
    function SocketAdapter(socket) {
        this._socket = socket;
    }
    Object.defineProperty(SocketAdapter.prototype, "protocol", {
        get: function () {
            var protocol = this._socket.handshake.query.protocol;
            return protocol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketAdapter.prototype, "state", {
        get: function () {
            if (this._socket.connected) {
                return serverAdapterInterface_1.State.OPEN;
            }
            return serverAdapterInterface_1.State.CLOSED;
        },
        enumerable: true,
        configurable: true
    });
    SocketAdapter.prototype.removeListener = function (event, connectionHandler) {
        this._socket.removeListener(event, connectionHandler);
    };
    SocketAdapter.prototype.on = function (event, connectionHandler) {
        if (event === 'close') {
            event = 'disconnect';
        }
        this._socket.on(event, connectionHandler);
    };
    SocketAdapter.prototype.send = function (data, cb) {
        this._socket.send(data, cb);
    };
    SocketAdapter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        return (_a = this._socket).emit.apply(_a, [event].concat(args));
    };
    SocketAdapter.prototype.close = function (code, data) {
        this._socket.disconnect(true);
    };
    return SocketAdapter;
}());
var SocketIOServerAdapter = (function () {
    function SocketIOServerAdapter(options) {
        var ioInstance = options.ioInstance, server = options.server;
        this.io = ioInstance || io(server, { path: options.path });
    }
    SocketIOServerAdapter.prototype.on = function (event, connectionHandler) {
        var _this = this;
        this.io.on(event, function (socket) {
            var request = socket.client.request;
            _this.socket = new SocketAdapter(socket);
            connectionHandler(_this.socket, request);
        });
    };
    SocketIOServerAdapter.prototype.removeListener = function (event, connectionHandler) {
        this.socket.removeListener(event, connectionHandler);
    };
    SocketIOServerAdapter.prototype.close = function () {
        this.socket.close();
    };
    return SocketIOServerAdapter;
}());
exports.SocketIOServerAdapter = SocketIOServerAdapter;
//# sourceMappingURL=socketIOServerAdapter.js.map