var src = function (gen, ctx) {
    if(typeof gen === 'function'){
        this.gen = gen;
    }else{
        this.gen = function(){return 0;}
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

module.expotrs = src;
