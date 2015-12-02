var mixin = require('../tools/mixin');
var EventEmitter = require('events').EventEmitter;

var simple = require('./simple');

var que = function (limit, type) {
    simple.apply(this, Array.prototype.slice.call(arguments));

    this.__emitter = new EventEmitter();
};

require('util').inherits(que, simple);

que.prototype.on = function(){
    this.__emitter.on.apply(this.__emitter, Array.prototype.slice.call(arguments));
};

que.prototype.pushValue = function (value) {
    que.super_.prototype.pushValue.apply(this, [value]);
    this.checkFull();
    return this;
};

que.prototype.overflow = function (value) {
    if (this._type === this.OVERFLOW) {
        this.__emitter.emit('overflow', value);
    } else if (this._type === this.LEAK) {
        this.__emitter.emit('leak', this._storage.shift());
        this._storage.push(value);
    } else /* BLOCK */ {

    }

    return this;
};

que.prototype.checkEmpty = function () {
    if (!this._storage.length) {
        this.__emitter.emit('empty', this._storage.shift());
    }
};

que.prototype.checkFull = function () {
    if (this._storage.length === 1) {
        this.__emitter.emit('not_empty');
    } else if (this._storage.length === this._limit) {
        this.__emitter.emit('full');
    } else if (this._storage.length >= this._limit - 1) {
        this.__emitter.emit('almost_full');
    }
};

module.exports = que;
