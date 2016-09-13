/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */
var ContestantBuzzerPress = require('../../../../lib/message/ContestantBuzzerPress');

describe('ContestantBuzzerPress', function() {
    describe('#sessionId', function() {
        it('should set value',
            function() {
                var m = new ContestantBuzzerPress();
                m.sessionId = 'xyz123';
                m.data._sessionId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new ContestantBuzzerPress();
                m.data._sessionId = 'xyz123';
                m.sessionId.should.equal('xyz123');
            });
    });
    describe('#contestantId', function() {
        it('should set value',
            function() {
                var m = new ContestantBuzzerPress();
                m.contestantId = 'xyz123';
                m.data._contestantId.should.equal('xyz123');
            });
        it('should get value',
            function() {
                var m = new ContestantBuzzerPress();
                m.data._contestantId = 'xyz123';
                m.contestantId.should.equal('xyz123');
            });
    });
    describe('#isValid()', function() {
        it('should return true when valid', function() {
            var m = new ContestantBuzzerPress();
            m.sessionId = 'xyz123';
            m.contestantId = 'xyz123';
            m.isValid().should.be.true();
        });
        it('should return false when invalid', function() {
            var m = new ContestantBuzzerPress();
            m.sessionId = 'xyz123';
            m.isValid().should.be.false();
        });
    });
});