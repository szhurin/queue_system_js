var que = function (limit, type) {
    this._limit = (!!limit && limit > 0) ? limit : 0;
    this._isLimited = !!limit;
    this._type = type || this.OVERFLOW;

    this._storage = [];
};

require('util').inherits(que, require('events').EventEmitter);

que.prototype.OVERFLOW = 1;
que.prototype.LEAK = 2;
que.prototype.BLOCK = 3;

que.prototype.pushValue = function (value) {
    if (this._isLimited && this._storage.length === this._limit) {
        return this.overflow(value);
    }
    this._storage.push(value);
    this.checkFill();
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

que.prototype.checkEmpty = function () {
    if (!this._storage.length) {
        this.emit('empty', this._storage.shift());
    }
};
que.prototype.checkFill = function () {
    if (this._storage.length === 1) {
        this.emit('not_empty');
    } else if (this._storage.length === this._limit) {
        this.emit('full');
    } else if (this._storage.length >= this._limit - 1) {
        this.emit('almost_full');
    }
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
