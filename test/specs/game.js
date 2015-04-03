var assert = require('assert');

var hangman = require('../../src/hangman');
var words = require('../../src/words');

describe('hangman', function () {

    describe('setup', function () {

        it('chooses a word', function () {

            var game = hangman();

            assert.notEqual(typeof game.word, undefined);

        });

    });

    describe('game', function () {

        var game;

        beforeEach(function () {

            game = hangman('test');

        });

        it('makes a correct guess', function () {

            game.guess('t');

            assert.equal(game.found.length, 1);
            assert.equal(game.notfound.length, 0);
            assert.equal(game.display(), 't__t');

        });

        it('makes an incorrect guess', function () {

            game.guess('c');

            assert.equal(game.found.length, 0);
            assert.equal(game.notfound.length, 1);
            assert.equal(game.display(), '____');

        });

        it('win game', function (done) {

            game.guess('t');
            game.guess('e');
            game.guess('s').fail(function (message) {

                assert.notEqual(message.match(/^You win/), false);

                done();

            });

        });

        it('fail game', function (done) {

            game.guess('a');
            game.guess('b');
            game.guess('c');
            game.guess('d');
            game.guess('f');
            game.guess('g');
            game.guess('h').fail(function (message) {

                assert.notEqual(message.match(/^Game over/), false);

                done();

            });

        });

    });

});
