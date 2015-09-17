var expect = require('chai').expect,
    mempool,
    Base = require('../lib/_base.js'),
    base = new Base();



describe('Base testing', function () {

    it('should be an object', function () {
        expect(base).to.be.an('object');
    });

    describe('init tests', function () {

        it('simple init', function () {
            var state, errors;

            base.errorSet('test error');

            state = base.errorGetState();
            errors = base.errorGetAll();

            expect(state).to.be.equals(1);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(1);

            base.errorResetState();

            state = base.errorGetState();
            errors = base.errorGetAll();

            expect(state).to.be.equals(0);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(1);

            base.errorReset();

            state = base.errorGetState();
            errors = base.errorGetAll();

            expect(state).to.be.equals(0);
            expect(errors).to.be.an('array');
            expect(errors.length).to.be.equals(0);


        });


    });
})
