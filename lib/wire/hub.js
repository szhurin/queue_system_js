var base = require('../base'),
    hub = function (collectors, value) {
        this.setCollectors(collectors || []);

        base.call(this);

        this.value = value;
    };

require('util').inherits(hub, base);

hub.prototype.pushValue = function (value) {
  var index = 0, count = _this.collectors.length;
  this.value = value;
  while(index < count){
    _this.collectors[index](value);
    ++index;
  }
};

hub.prototype.getPushFunction = function () {
    return this.pushValue.bind(this);
};

hub.prototype.getValue = function () {
    return this.value;
};

hub.prototype.addCollector = function (collector) {
  if (typeof collector !== 'function') {
      this.errorSet({
          msg: "provided collector is not a function"
      });
      return false;
  }
  this.collectors.push(collector);
  return true;

};
hub.prototype.setCollectors = function (collectors) {
    if (!Array.isArray(collectors)) {
      this.errorSet({
          msg: "provided collection is not array"
      });
      return false;
    }
    this.collectors = collectors;
};

module.exports = hub;
