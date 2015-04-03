var q = require('q');

var words = require('./words');

var MAX_FAIL = 7;

module.exports = function (start) {

    var word = start || words[Math.floor(Math.random() * words.length)],
        notfound = [],
        found = [];

    return {

        word: word,
        notfound: notfound,
        found: found,
        display: function () {

            return word.replace(new RegExp('[^' + found.join() + ']', 'g'), '_');

        },
        guess: function (letter) {

            var deferred = new q.defer();

            if (letter && letter.match(/^[a-z]{1}$/i)) {

                if (found.indexOf(letter) === -1 && notfound.indexOf(letter) === -1) {

                    if (word.indexOf(letter) !== -1) {

                        found.push(letter);

                        if (!word.match(new RegExp('[^' + found.join() + ']', 'g'))) {

                            deferred.reject('You win!');

                        } else {

                            deferred.resolve('Found ' + letter + '!');

                        }

                    } else {

                        notfound.push(letter);

                        if (notfound.length === MAX_FAIL) {

                            deferred.reject('Game over. The word was ' + game.word + '.');

                        } else {

                            deferred.resolve('Didn\'t find ' + letter + '.');

                        }

                    }

                } else {

                    deferred.resolve('Already guessed ' + letter + '.');

                }

            } else {

                deferred.resolve('Please guess only one letter.');

            }

            return deferred.promise;

        }

    }

};
