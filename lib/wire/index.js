var defaultCollector = function(){};
var base = require('../base');

var wire = function (collector, value) {
        base.call(this);
        this.setCollector(collector || defaultCollector);
        this.value = value;
    };

require('util').inherits(wire, base);

wire.prototype.pushValue = function (value) {
    this.value = value;
    this.collector(value);
};

wire.prototype.getPushFunction = function () {
    return this.pushValue.bind(this);
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
