var expect = require('chai').expect,
    mempool,
    Que = require('../../lib/que/simple');


describe('que testing', function () {

    it('should be an object', function () {
        que = new Que();

        expect(Que.prototype.OVERFLOW).to.be.equals(1);
        expect(Que.prototype.LEAK).to.be.equals(2);
        expect(Que.prototype.BLOCK).to.be.equals(3);
        expect(que.OVERFLOW).to.be.equals(1);
        expect(que.LEAK).to.be.equals(2);
        expect(que.BLOCK).to.be.equals(3);
        expect(que).to.be.an('object');

    });

    describe('init tests', function () {

        it('que no init args', function () {
            var state, errors, result = 0,
                que = new Que();

            expect(que.getParam('type')).to.be.equals(que.OVERFLOW);
            expect(que.getParam('limit')).to.be.equals(0);
            expect(que.getParam('isLimited')).to.be.equals(false);
        });
        it('que with init args', function () {
            var que = new Que();

            que = new Que(10);
            expect(que.getParam('type')).to.be.equals(que.OVERFLOW);
            expect(que.getParam('limit')).to.be.equals(10);
            expect(que.getParam('isLimited')).to.be.equals(true);

            que = new Que(100, Que.prototype.LEAK);
            expect(que.getParam('type')).to.be.equals(que.LEAK);
            expect(que.getParam('limit')).to.be.equals(100);
            expect(que.getParam('isLimited')).to.be.equals(true);
        });

    });
    describe('limit tests', function () {

        it('overflow test', function () {

            var que = new Que(5);                /*OVERFLOW*/

            expect(que.isEmpty()).to.be.equals(true);
            expect(que.isFull()).to.be.equals(false);

            que.pushValue(1)
                .pushValue(2);

            expect(que.isEmpty()).to.be.equals(false);
            expect(que.isFull()).to.be.equals(false);


            que.pushValue(3)
                .pushValue(4)
                .pushValue(5);

            expect(que.isEmpty()).to.be.equals(false);
            expect(que.isFull()).to.be.equals(true);

            que.pushValue(6);

            expect(que.isFull()).to.be.equals(true);
            expect(que.getValue()).to.be.equals(1);
            expect(que.getValue()).to.be.equals(2);
            expect(que.getValue()).to.be.equals(3);
            expect(que.getValue()).to.be.equals(4);
            expect(que.getValue()).to.be.equals(5);
        });

        it('leak test', function () {

            var que = new Que(5, Que.prototype.LEAK);

            que.pushValue(1)
                .pushValue(2)
                .pushValue(3)
                .pushValue(4)
                .pushValue(5)
                .pushValue(6);

            expect(que.getValue()).to.be.equals(2);
            expect(que.getValue()).to.be.equals(3);
        });

    });

    describe('get Bind function test', function () {

        it('overflow test', function () {

            var que = new Que(5);                /*OVERFLOW*/


            var pushFunctions = que.getBindFunction('pushValue');
            var isEmptyFunctions = que.getBindFunction('isEmpty');
            var isFullFunctions = que.getBindFunction('isFull');
            var getValueFunctions = que.getBindFunction('getValue');


            expect(isEmptyFunctions()).to.be.equals(true);
            expect(isFullFunctions()).to.be.equals(false);


            pushFunctions(1);
            pushFunctions(2);

            expect(isEmptyFunctions()).to.be.equals(false);
            expect(isFullFunctions()).to.be.equals(false);


            pushFunctions(3);
            pushFunctions(4);
            pushFunctions(5);

            expect(isEmptyFunctions()).to.be.equals(false);
            expect(isFullFunctions()).to.be.equals(true);

            pushFunctions(6); // will not be pushed - is overflowed

            expect(isFullFunctions()).to.be.equals(true);
            expect(getValueFunctions()).to.be.equals(1);
            expect(getValueFunctions()).to.be.equals(2);
            expect(getValueFunctions()).to.be.equals(3);
            expect(getValueFunctions()).to.be.equals(4);
            expect(getValueFunctions()).to.be.equals(5);
        });

        it('leak test', function () {

            var que = new Que(5, Que.prototype.LEAK);

            var pushFunctions = que.getBindFunction('pushValue');
            var getValueFunctions = que.getBindFunction('getValue');


            pushFunctions(1);
            pushFunctions(2);
            pushFunctions(3);
            pushFunctions(4);
            pushFunctions(5);
            pushFunctions(6); // the 1 will be LEAKed
            pushFunctions(7); // the 2 will be LEAKed

            expect(getValueFunctions()).to.be.equals(3);
            expect(getValueFunctions()).to.be.equals(4);
        });

    });

});
