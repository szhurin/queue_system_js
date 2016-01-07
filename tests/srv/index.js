var expect = require('chai').expect,
    Srv = require('../../lib/srv');

describe('Serve index testing', function () {

    it('should be a function', function () {
        expect(Srv).to.be.a('function');
    });

    describe('serve tests', function () {

        it('simple srv', function () {
            var state = { counter:0 };
            var serve = function(value){ state.counter += value; return value*2; };

            var srv = new Srv();

            expect(srv).to.be.an('object');

            expect(srv.exec(1)).to.be.equals(1);
            expect(srv.exec(2)).to.be.equals(2);
            expect(srv.exec(13)).to.be.equals(13);

            var srv2 = new Srv(serve);

            expect(srv2).to.be.an('object');

            expect(srv2.exec(1)).to.be.equals(2);
            expect(state.counter).to.be.equals(1);

            expect(srv2.exec(2)).to.be.equals(4);
            expect(state.counter).to.be.equals(3);

            expect(srv2.exec(13)).to.be.equals(26);
            expect(state.counter).to.be.equals(16);


        });
    });
});
