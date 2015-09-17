var expect = require('chai').expect,
    mempool,
    Que = require('../../lib/que');


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

            var que = new Que(5),
                /*OVERFLOW*/
                testObj = {
                    empty: 0
                };

            que.on('overflow', function (value) {
                testObj.overflow = value
            });
            que.on('leak', function (value) {
                testObj.leak = value
            });
            que.on('empty', function () {
                testObj.empty += 1
            });


            que.pushValue(1)
                .pushValue(2)
                .pushValue(3)
                .pushValue(4)
                .pushValue(5)
                .pushValue(6);

            expect(testObj.overflow).to.be.equals(6);

            que.getValues(6);

            expect(testObj.empty).to.be.equals(1);
        });

        it('leak test', function () {

            var que = new Que(5, Que.prototype.LEAK),
                testObj = {
                    empty: 0
                };

            que.on('overflow', function (value) {
                testObj.overflow = value
            });
            que.on('leak', function (value) {
                testObj.leak = value
            });
            que.on('empty', function () {
                testObj.empty += 1
            });


            que.pushValue(1)
                .pushValue(2)
                .pushValue(3)
                .pushValue(4)
                .pushValue(5)
                .pushValue(6);

            expect(testObj.leak).to.be.equals(1);

            que.getValues(6);

            expect(testObj.empty).to.be.equals(1);
        });

    });

})
