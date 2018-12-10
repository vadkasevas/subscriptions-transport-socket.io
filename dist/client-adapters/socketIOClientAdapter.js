"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var clientAdapterInterface_1 = require("./clientAdapterInterface");
var SocketIOClientAdapter = (function () {
    function SocketIOClientAdapter(url, protocol, opts) {
        this.opts = __assign({ query: {
                protocol: protocol,
            }, transports: ['websocket'], forceNew: true }, opts);
        this.socket = io(url, this.opts);
    }
    Object.defineProperty(SocketIOClientAdapter.prototype, "readyState", {
        get: function () {
            switch (this.socket.io.readyState) {
                case 'opening':
                    return clientAdapterInterface_1.ReadyState.CONNECTING;
                case 'open':
                    return clientAdapterInterface_1.ReadyState.OPEN;
                case 'closing':
                    return clientAdapterInterface_1.ReadyState.CLOSING;
                default:
                    return clientAdapterInterface_1.ReadyState.CLOSED;
            }
        },
        enumerable: true,
        configurable: true
    });
    SocketIOClientAdapter.prototype.close = function () {
        this.socket.close();
    };
    SocketIOClientAdapter.prototype.send = function (serializedMessage) {
        this.socket.send(serializedMessage);
    };
    Object.defineProperty(SocketIOClientAdapter.prototype, "onopen", {
        set: function (onopen) {
            this.socket.on('connect', onopen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketIOClientAdapter.prototype, "onclose", {
        set: function (onclose) {
            this.socket.on('disconnect', onclose);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketIOClientAdapter.prototype, "onerror", {
        set: function (onerror) {
            this.socket.on('error', onerror);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SocketIOClientAdapter.prototype, "onmessage", {
        get: function () {
            return this._onmessage;
        },
        set: function (onmessage) {
            this.socket.removeListener('message');
            this._onmessage = onmessage;
            this.socket.on('message', this._onmessage);
        },
        enumerable: true,
        configurable: true
    });
    return SocketIOClientAdapter;
}());
exports.SocketIOClientAdapter = SocketIOClientAdapter;
//# sourceMappingURL=socketIOClientAdapter.js.map