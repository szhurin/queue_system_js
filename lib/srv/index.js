var defaultServeFunction = function(value){
    return value;
};

var service = function (serveFunction) {
    this.serve = serveFunction || defaultServeFunction;
};

service.prototype.exec = function (value) {
    return this.serve(value);
};

service.prototype.getExecFunction = function () {
    return this.exec.bind(this);
};

module.exports = service;
