var expect = require('chai').expect,
    mempool,
    Wire = require('../../lib/wire'),
    wire = new Wire();

describe('wire testing', function () {

    it('should be an object', function () {
        expect(wire).to.be.an('object');
    });

    describe('init tests', function () {

        it('wire push values', function () {
            var state, errors, result = 0,
                wire = new Wire(function (value) {
                    result = value
                });

            state = wire.errorGetState();
            errors = wire.errorGetAll();

            expect(state).to.be.equals(0);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(0);

            wire.pushValue(1);

            expect(result).to.be.equals(1);
            expect(wire.getValue()).to.be.equals(1);


            wire.pushValue(3);

            expect(result).to.be.equals(3);
            expect(wire.getValue()).to.be.equals(3);

            wire.pushValue(function () {
                return 234;
            });

            expect(result).to.be.a('function');
            expect(result()).to.be.equals(234);
            expect(wire.getValue()).to.be.a('function');





        });

    });
    describe('init tests', function () {

        it('simple init', function () {
            var state, errors, wire = new Wire();

            state = wire.errorGetState();
            errors = wire.errorGetAll();

            expect(state).to.be.equals(1);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(1);

            wire.errorResetState();

            state = wire.errorGetState();
            errors = wire.errorGetAll();

            expect(state).to.be.equals(0);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(1);

            wire.errorReset();

            state = wire.errorGetState();
            errors = wire.errorGetAll();

            expect(state).to.be.equals(0);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(0);


        });


    });
})
