//var mixin = require('../tools/mixin');

var simple = require('./simple');

var que = function (limit, type) {
    simple.apply(this, Array.prototype.slice.call(arguments));


};

require('util').inherits(que, simple);

que.prototype.pushValue = function (value) {
    que.super_.prototype.pushValue.apply(this, [value]);
    this.checkFull();
    return this;
};

que.prototype.overflow = function (value) {
    if (this._type === this.OVERFLOW) {
        this.emit('overflow', value);
    } else if (this._type === this.LEAK) {
        this.emit('leak', this._storage.shift());
        this._storage.push(value);
    } else /* BLOCK */ {

    }

    return this;
};

que.prototype.checkEmpty = function () {
    if (!this._storage.length) {
        this.emit('empty', this._storage.shift());
    }
};

que.prototype.checkFull = function () {
    if (this._storage.length === 1) {
        this.emit('not_empty');
    } else if (this._storage.length === this._limit) {
        this.emit('full');
    } else if (this._storage.length >= this._limit - 1) {
        this.emit('almost_full');
    }
};

module.exports = que;
