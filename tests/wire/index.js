var expect = require('chai').expect,
    Wire = require('../../lib/wire');

describe('Wire index testing', function () {

    it('should be an object', function () {
        expect(Wire).to.be.a('function');
    });

    describe('wire tests', function () {

        it('simple wire', function () {
            var state = {counter:0};
            var collector = function(value){ state.counter += value;};

            var wire = new Wire(collector, 0);

            expect(wire).to.be.an('object');

            expect(wire.getValue()).to.be.equals(0);
            expect(state.counter).to.be.equals(0);

            wire.pushValue(1);
            expect(wire.getValue()).to.be.equals(1);
            expect(state.counter).to.be.equals(1);

            wire.pushValue(1);
            expect(wire.getValue()).to.be.equals(1);
            expect(state.counter).to.be.equals(2);

            wire.pushValue(2);
            expect(wire.getValue()).to.be.equals(2);
            expect(state.counter).to.be.equals(4);

        });
    });
});
