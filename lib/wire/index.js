var _base = require('../_base'),
    wire = function (collector, value) {
        _base.call(this);
        this.setCollector(collector);
        this.value = value;
    };

console.log(typeof _base);
require('util').inherits(wire, _base);

wire.prototype.pushValue = function (value) {
    this.value = value;
    this.collector(value);
};

wire.prototype.getValue = function () {
    return this.value;
};


wire.prototype.setCollector = function (collector) {
    if (typeof collector !== 'function') {
        this.errorSet({
            msg: "provided collector is not a function"
        });
        return false;
    }
    this.collector = collector;
};

module.exports = wire;
