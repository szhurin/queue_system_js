/*
* service Class to consume items from que
*
*/

var defaultServeFunction = function(value){
    return value;
};

var service = function (serveFunction) {
    this.serve = serveFunction || defaultServeFunction;
};

service.prototype.exec = function (value) {
    return this.serve(value);
};
service.prototype.consume = service.prototype.exec;

service.prototype.getBindFunction = function(name){
    if(typeof this[name] === 'function'){
        return this[name].bind(this);
    }
    return false;
};

module.exports = service;
