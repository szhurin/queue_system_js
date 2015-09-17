var base = require('./index.js'),
    hub = function (collectors, value) {
        this.setCollectors(collectors);

        base.call(this);

        this.value = value;
    };

require('util').inherits(hub, _base);

wire.prototype.setCollector = function (collector) {
    if (typeof collector !== 'function') {
        this.errorSet({
            msg: "provided collector is not a function"
        });
        return false;
    }
    this.collector = collector;
};


hub.prototype.collectorsCaller(collectors) {

    return function (value) {

    }
}

wire.prototype.setCollectors = function (collectors) {
    if (!Array.isArray(collectors)) {
        if (typeof collector !== 'function') {
            this.errorSet({
                msg: "provided collector is not a function"
            });
            return false;
        }
    }
    this.collectors = collectors;
};


module.exports = hub;
