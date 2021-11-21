"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _global = typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
        ? window
        : {};
var NativeWebSocket = _global.WebSocket || _global.MozWebSocket;
var clientAdapterInterface_1 = require("./clientAdapterInterface");
var NativeClientAdapter = (function () {
    function NativeClientAdapter(url, protocol) {
        this.client = new NativeWebSocket(url, protocol);
    }
    Object.defineProperty(NativeClientAdapter.prototype, "readyState", {
        get: function () {
            switch (this.client.readyState) {
                case 0:
                    return clientAdapterInterface_1.ReadyState.CONNECTING;
                case 1:
                    return clientAdapterInterface_1.ReadyState.OPEN;
                case 2:
                    return clientAdapterInterface_1.ReadyState.CLOSING;
                default:
                    return clientAdapterInterface_1.ReadyState.CLOSED;
            }
        },
        enumerable: true,
        configurable: true
    });
    NativeClientAdapter.prototype.close = function () {
        this.client.close();
    };
    NativeClientAdapter.prototype.send = function (serializedMessage) {
        this.client.send(serializedMessage);
    };
    Object.defineProperty(NativeClientAdapter.prototype, "onopen", {
        get: function () {
            return this.client.onpen;
        },
        set: function (onopen) {
            this.client.onopen = onopen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeClientAdapter.prototype, "onclose", {
        get: function () {
            return this.client.onclose;
        },
        set: function (onclose) {
            this.client.onclose = onclose;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeClientAdapter.prototype, "onerror", {
        get: function () {
            return this.client.onerror;
        },
        set: function (onerror) {
            this.client.onerror = onerror;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeClientAdapter.prototype, "onmessage", {
        get: function () {
            return this.client.onmessage;
        },
        set: function (onmessage) {
            this.client.onmessage = onmessage;
        },
        enumerable: true,
        configurable: true
    });
    return NativeClientAdapter;
}());
exports.NativeClientAdapter = NativeClientAdapter;
//# sourceMappingURL=nativeClientAdapter.js.map