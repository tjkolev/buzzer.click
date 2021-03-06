/* eslint-disable no-unused-vars */
var should = require('should');
/* eslint-enable no-unused-vars */

var Settings = require('../../../lib/Settings');
var constants = require('../../../lib/Constants');

describe('Settings', function() {
    describe('#hasTeams', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.hasTeams = true;
                s._hasTeams.should.be.true();
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._hasTeams = true;
                s.hasTeams.should.be.true();
            });
    });
    describe('#teamSize', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.teamSize = 1;
                s._teamSize.should.be.equal(1);
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._teamSize = 1;
                s.teamSize.should.be.equal(1);
            });
    });
    describe('#maxTeams', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.maxTeams = 1;
                s._maxTeams.should.be.equal(1);
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._maxTeams = 1;
                s.maxTeams.should.be.equal(1);
            });
    });
    describe('#teamLeaderSelectionMethod', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;
                s._teamLeaderSelectionMethod.should.be.equal(constants.teamLeaderSelectionMethod
                    .PLAYER_CHOICE);
            });
        it('should throw on set when constant value is invalid',
            function() {
                var s = new Settings();
                (function() {
                    var high = constants.teamLeaderSelectionMethod.all.slice().sort(
                        function(a, b) {
                            return a - b;
                        }).pop();
                    s.teamLeaderSelectionMethod = ++high;
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._teamLeaderSelectionMethod = constants.teamLeaderSelectionMethod.PLAYER_CHOICE;
                s.teamLeaderSelectionMethod.should.be.equal(constants.teamLeaderSelectionMethod
                    .PLAYER_CHOICE);
            });
    });
    describe('#teamNameEdit', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.teamNameEdit = constants.teamNameEdit.ALLOW;
                s._teamNameEdit.should.be.equal(constants.teamNameEdit.ALLOW);
            });
        it('should throw on set when constant value is invalid',
            function() {
                var s = new Settings();
                (function() {
                    var high = constants.teamNameEdit.all.slice().sort(function(a,
                        b) {
                        return a - b;
                    }).pop();
                    s.teamNameEdit = ++high;
                }).should.throw();
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._teamNameEdit = constants.teamNameEdit.ALLOW;
                s.teamNameEdit.should.be.equal(constants.teamNameEdit.ALLOW);
            });
    });
    describe('#maxContestants', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.maxContestants = 1;
                s._maxContestants.should.be.equal(1);
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._maxContestants = 1;
                s.maxContestants.should.be.equal(1);
            });
    });
    describe('#sessionName', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.sessionName = 'sessionName';
                s._sessionName.should.be.equal('sessionName');
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._sessionName = 'sessionName';
                s.sessionName.should.be.equal('sessionName');
            });
    });
    describe('#teamNames', function() {
        it('should set value',
            function() {
                var s = new Settings();
                s.teamNames = ['n1', 'n2'];
                s._teamNames.should.be.Array();
                s._teamNames.length.should.equal(2);
                s._teamNames[0].should.equal('n1');
            });
        it('should get value',
            function() {
                var s = new Settings();
                s._teamNames = ['n1', 'n2'];
                s.teamNames.should.be.Array();
                s.teamNames.length.should.equal(2);
                s.teamNames[0].should.equal('n1');
            });
    });
});
