define(['gameComponent', 'ko', 'scoreBoardState', 'gameState'], function (GameComponent, ko, scoreBoard, game) {
    'use strict';
    
    const statusLabels = {
        pending: 'Click to start Game',
        started: 'Running',
        paused: 'Paused',
        win: 'Congrats, you win! Click to reset.',
        fail: 'Game Over! Click to reset.'
    };

    return GameComponent.extend({
        defaults: {
            template: "VinaiKopp_Breakout/score-board"
        },
        initialize: function () {
            this._super();
            this.initDimensions(scoreBoard);
            scoreBoard.width = function () {
                return game.width * .97;
            };
            scoreBoard.height = function () {
                return game.height * .15;
            };
            scoreBoard.left = function () {
                return game.width * .01;
            };
            scoreBoard.top = function () {
                return game.height * .01;
            };
            ko.defineProperty(this, 'score', function () {
                return scoreBoard.score;
            });
            this.setStartState();
        },
        statusLabel: ko.pureComputed(function () {
            if (game.status === 'started') {
                return game.running ? statusLabels['started'] : statusLabels['paused'];
            }
            return statusLabels[game.status] || 'Error: Unknown Status "' + game.status + '"';
        }),
        setStartState: function () {
            scoreBoard.score = 0;
            this._super();
        }
    });
});
