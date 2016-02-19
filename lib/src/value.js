var base = function (value) {
        this.setValue(value);
    };

base.prototype.run = function (input) {
    return input || this.value ;
};

src.prototype.produce = src.prototype.run;


base.prototype.setValue = function (value) {
    this.input = input || 0;
};

module.expotrs = base;
