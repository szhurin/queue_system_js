var base = function (value) {
        this.value = value || 0;
    };

base.prototype.run = function (input) {
    return input || this.value ;
};

module.expotrs = base;
