var _this = {
    toPrototype: function(obj, mixin, exept) {
        exept = exept || [];
        for(var x in mixin){
            if(exept.indexOf(x) === -1){
                obj.prototype[x] = mixin[x];
            }
        }
    },
    toPrototypeProxyMixin: function(obj, mixin, exept) {
        exept = exept || [];
        for(var x in mixin){
            if(exept.indexOf(x) === -1){
                if(typeof mixin[x] === 'function'){
                    obj.prototype[x] = mixin[x].bind(mixin);
                }else{
                    obj.prototype[x] = mixin[x];
                }
            }
        }
    },
    toObject: function(obj, mixin, exept) {
        exept = exept || [];
        for(var x in mixin){
            if(exept.indexOf(x) === -1){
                obj[x] = mixin[x];
            }
        }
    },
    toObjectProxyMixin: function(obj, mixin, exept) {
        exept = exept || [];
        for(var x in mixin){
            if(exept.indexOf(x) === -1){
                if(typeof mixin[x] === 'function'){
                    obj[x] = mixin[x].bind(mixin);
                }else{
                    obj[x] = mixin[x];
                }
            }
        }
    }
};

module.exports = _this;