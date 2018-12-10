"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocket = require("ws");
var serverAdapterInterface_1 = require("./serverAdapterInterface");
var SocketAdapter = (function () {
    function SocketAdapter(socket) {
        this._socket = socket;
    }
    Object.defineProperty(SocketAdapter.prototype, "protocol", {
        get: function () {
            return this._socket.protocol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketAdapter.prototype, "state", {
        get: function () {
            switch (this._socket.readyState) {
                case WebSocket.OPEN:
                    return serverAdapterInterface_1.State.OPEN;
                case WebSocket.CONNECTING:
                    return serverAdapterInterface_1.State.CONNECTING;
                case WebSocket.CLOSING:
                    return serverAdapterInterface_1.State.CLOSING;
                default:
                    return serverAdapterInterface_1.State.CLOSED;
            }
        },
        enumerable: true,
        configurable: true
    });
    SocketAdapter.prototype.on = function (event, connectionHandler) {
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
        this._socket.close(code, data);
    };
    return SocketAdapter;
}());
var NativeServerAdapter = (function () {
    function NativeServerAdapter(options) {
        this.wsServer = new WebSocket.Server(options || {});
    }
    NativeServerAdapter.prototype.on = function (event, connectionHandler) {
        this.wsServer.on(event, function (socket, request) {
            var socketAdapter = new SocketAdapter(socket);
            connectionHandler(socketAdapter, request);
        });
    };
    NativeServerAdapter.prototype.removeListener = function (event, connectionHandler) {
        this.wsServer.removeListener(event, connectionHandler);
    };
    NativeServerAdapter.prototype.close = function () {
        this.wsServer.close();
    };
    return NativeServerAdapter;
}());
exports.NativeServerAdapter = NativeServerAdapter;
//# sourceMappingURL=nativeServerAdapter.js.map