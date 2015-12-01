var que = function (limit, type) {
    this._limit = (!!limit && limit > 0) ? limit : 0;
    this._isLimited = !!limit;

    this._storage = [];
};

require('util').inherits(que, require('events').EventEmitter);

que.prototype.pushValue = function (value) {
    if (this._isLimited && this._storage.length === this._limit) {
        return this.overflow(value);
    }
    this._storage.push(value);
    this.checkFull();
    return this;
};

que.prototype.getPushFunction = function () {
    return this.pushValue.bind(this);
};

que.prototype.getAmount = function () {
    return this._storage.length;
};

que.prototype.getAmountFunction = function () {
    return this.getAmount.bind(this);
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
    return !(this._isLimited && this._storage.length === this._limit);
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
    }
}

module.exports = que;
