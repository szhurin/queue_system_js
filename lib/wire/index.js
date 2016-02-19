/**
*  wire object - is common interface berween supplier (producer, src) & collector (consumer, srv)
*
*/


var defaultCollector = function(){};
var base = require('../base');

var wire = function (collector, value) {
        base.call(this);
        this.setCollector(collector || defaultCollector);
        this.setValue(value);
    };

require('util').inherits(wire, base);

wire.prototype.setValue = function (value) {
    if(typeof value === 'function'){
        this.value = value;
    }else{
        this.value = function(){return value;};
    }
};

wire.prototype.pushValue = function (value) {
    if(value !== undefined){
        this.setValue(value);
    }
    this.collector(value);
};

wire.prototype.getValue = function () {
    return this.value();
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

wire.prototype.getBindFunction = function(name){
    if(typeof this[name] === 'function'){
        return this[name].bind(this);
    }
    return false;
};

module.exports = wire;
