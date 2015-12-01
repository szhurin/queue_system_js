var base = function () {

    };

require('util').inherits(base, require('../_base'));

base.prototype.run = function (input) {
    return input || 0;
};

module.expotrs = base;
