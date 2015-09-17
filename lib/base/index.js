var base = function () {
    this.init();
};

base.prototype.init = function () {
    this.state = 0;
    this.error = '';
    this.errors = [];
};

base.prototype.errorSet = function (error) {
    this.state++;
    this.error = error;
    this.errors.push(error);
};

base.prototype.errorGetLast = function () {
    return this.error;
};

base.prototype.errorGetAll = function () {
    return this.errors;
};
base.prototype.errorGetState = function () {
    return this.state;
};
base.prototype.errorReset = function () {
    this.init();
};
base.prototype.errorResetState = function () {
    this.state = 0;
};

module.exports = base;
