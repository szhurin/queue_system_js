var value = function (input) {
    this.input = input || 0;
};

require('util').inherits(value, require('./base'));


value.prototype.run = function () {
    return this.input ;
};

module.expotrs = value;
