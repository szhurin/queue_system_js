/**
* source is initiated with generator Function - it will produce items
*                           & context (ctx) - is an object to run generator on (this in generator)
*/
var src = function (genFunc, ctx) {
    if(typeof genFunc === 'function'){
        this.gen = genFunc;
    }else{
        this.gen = function(){return 0;};
    }
    if(typeof ctx === 'object'){
       this.obj = ctx;
    }else{
        this.obj = {};
    }
};

src.prototype.run = function () {
    return this.gen.apply(this.obj, Array.prototype.slice(arguments));
};

src.prototype.produce = src.prototype.run;

module.expotrs = src;
