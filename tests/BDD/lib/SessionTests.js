/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Session = require('../../../lib/Session');
var Settings = require('../../../lib/Settings');
var Host = require('../../../lib/Host');
var Contestant = require('../../../lib/Contestant');
var Observer = require('../../../lib/Observer');
var constants = require('../../../lib/Constants');
var idUtility = require('../../../lib/IdentifierUtility');

var id = 'id_test';
var settings = new Settings();
var host = new Host();

describe('Session', function() {
    afterEach(function() {
        settings = new Settings();
        host = new Host();
    });
    describe('#id', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.id = 'SomeId';
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s.id.should.equal('id_test');
            });
    });
    describe('#roundsPlayed', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.roundsPlayed = 'SomeId';
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s._roundsPlayed = 1;
                s.roundsPlayed.should.equal(1);
            });
    });
    describe('#isSessionCompleted', function() {
        var s = new Session(id, settings, host);
        s.isSessionCompleted.should.be.false();
        s.complete();
        s.isSessionCompleted.should.be.true();
    });
    describe('#observers', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.observers = [];
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                var observer = new Observer();
                observer.id = 'ob1';
                var contestant = new Contestant();
                contestant.id = 'con1';
                s._participants.add(observer);
                s._participants.add(contestant);
                s.observers.length.should.equal(1);
                s.observers[0].should.equal(observer);
            });
    });
    describe('#contestants', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.contestants = [];
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                var observer = new Observer();
                observer.id = 'ob1';
                var contestant = new Contestant();
                contestant.id = 'con1';
                s._participants.add(observer);
                s._participants.add(contestant);
                s.contestants.length.should.equal(1);
                s.contestants[0].should.equal(contestant);
            });
    });
    describe('#host', function() {
        it('should throw on set value',
            function() {
                var s = new Session(id, settings, host);
                (function() {
                    s.host = host;
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s.host.should.equal(host);
            });
    });
    describe('#currentState', function() {
        it('should get value',
            function() {
                var s = new Session(id, settings, host);
                s.currentState.should.equal('ready');
            });
    });
    describe('#incrementRoundsPlayed()', function() {
        it('should increment rounds played',
            function() {
                var s = new Session(id, settings, host);
                s._roundsPlayed = 1;
                s.incrementRoundsPlayed();
                s.roundsPlayed.should.equal(2);
            });
    });
    describe('#addContestant(contestant)', function() {
        describe('when in individual mode', function() {
            it('should add contestant when session is not full', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c2';
                var s = new Session(id, settings, host);
                var response = s.addContestant(c1);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
                response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.true();
            });
            it('should not add contestant when session is full', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c2';
                var c3 = new Contestant();
                c3.username = 'c3';
                var s = new Session(id, settings, host);
                s.addContestant(c1);
                s.addContestant(c2);
                var response = s.addContestant(c3);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
            });
            it('should not add contestant when username is already taken', function() {
                settings.maxContestants = 2;
                var c1 = new Contestant();
                c1.username = 'c1';
                var c2 = new Contestant();
                c2.username = 'c1';
                var s = new Session(id, settings, host);
                s.addContestant(c1);
                var response = s.addContestant(c2);
                response.should.not.be.null();
                response.wasSuccessful.should.be.false();
                response.errorMessage.should.be.equal(constants.messages.USERNAME_TAKEN);
            });
        });
        describe('when in team mode', function() {
            //TODO: add tests. Requires method to be completed.
        });
    });
    describe('#subscribeForStateChange(event, callback)', function() {
        it('should subscribe callback to the correct event', function(done) {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            var r = s.addContestant(c);
            r.wasSuccessful.should.be.true();

            s.subscribeForStateChange('onpending', function(session, event, from, to) {
                session.should.equal(s);
                event.should.equal('buzzerPressed');
                from.should.equal('ready');
                to.should.equal('pending');
                done();
            });

            s.tryBuzzerPressRegister(c.id).should.be.true();
        });
    });
    describe('tryBuzzerPressRegister(contestantId)', function() {
        it('should register when state is ready', function() {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            s.addContestant(c).wasSuccessful.should.be.true();
            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(c.id).should.be.true();
            s.currentState.should.equal('pending');

        });
        it('should not register when state is not ready', function() {
            var c1 = new Contestant();
            c1.username = 'testUser1';

            var c2 = new Contestant();
            c2.username = 'testUser2';

            settings.maxContestants = 2;
            var s = new Session(id, settings, host);

            s.addContestant(c1).wasSuccessful.should.be.true();
            s.addContestant(c2).wasSuccessful.should.be.true();

            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(c1.id).should.be.true();
            s.currentState.should.equal('pending');

            s.tryBuzzerPressRegister(c2.id).should.be.false();
        });
        it('should not register when contestant does not exists', function() {
            var c = new Contestant();
            c.username = 'testUser';

            settings.maxContestants = 1;
            var s = new Session(id, settings, host);

            s.addContestant(c).wasSuccessful.should.be.true();
            s.currentState.should.equal('ready');
            s.tryBuzzerPressRegister(idUtility.generateParticipantId()).should.be.false();
            s.currentState.should.equal('ready');
        });
    });
});
