var events = require("events");
var que = function (limit, type) {
    events.EventEmitter.call(this);

    this._limit = (!!limit && limit > 0) ? limit : 0;
    this._isLimited = !!limit;
    this._type = type || this.OVERFLOW;

    this._storage = [];
};

require('util').inherits(que, events.EventEmitter);

que.prototype.OVERFLOW = 1;
que.prototype.LEAK = 2;
que.prototype.BLOCK = 3;

que.prototype.pushValue = function (value) {
    if (this._isLimited && this._storage.length === this._limit) {
        return this.overflow(value);
    }
    this._storage.push(value);
    return this;
};

que.prototype.overflow = function (value) {
    if (this._type === this.OVERFLOW) {
    } else if (this._type === this.LEAK) {
        this._storage.push(value);
        this._storage.shift();
    } else /* BLOCK */ {

    }
    return this;
};

que.prototype.getAmount = function () {
    return this._storage.length;
};

que.prototype.getValue = function () {
    var val = this._storage.shift();
    this.checkEmpty();
    return val;
};

que.prototype.getValues = function (n) {
    var data = this._storage.splice(0, n);
    this.checkEmpty();
    return data;
};

que.prototype.isEmpty = function () {
    return !this._storage.length;
};
que.prototype.checkEmpty = function () {
    return this.isEmpty();
};

que.prototype.isFull = function () {
    return this._isLimited && this._storage.length === this._limit;
};
que.prototype.checkFull = function () {
    return this.isFull();
};

que.prototype.getParam = function (name) {
    if (this['_' + name] !== undefined) {
        return this['_' + name];
    }
    return {
        isLimited: this._isLimited,
        limit: this._limit,
        type: this._type
    };
};


que.prototype.getBindFunction = function(name){
    if(typeof this[name] === 'function'){
        return this[name].bind(this);
    }
    return false;
};

module.exports = que;
