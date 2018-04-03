define(['gameComponent', 'ballState', 'frameState', 'gameState'], function (GameComponent, ball, frame, game) {
    'use strict';

    return GameComponent.extend({
        initialize: function () {
            this._super();
            this.initDimensions(frame);
            frame.width = function () {
                return game.width * .98;
            };
            frame.height = function () {
                return game.height * .80;
            };
            frame.left = function () {
                return game.width * .01;
            };
            frame.top = function () {
                return game.height * .19;
            };
        },
        run: function () {
            this._super();
            this.checkBallCollision();
        },
        checkBallCollision: function () {
            if (ball.left < 0) {
                ball.xV *= -1;
                ball.left = 0;
            } else if (ball.left + ball.width > frame.width) {
                ball.xV *= -1;
                ball.left = frame.width - ball.width;
            }
            if (ball.top < 0) {
                ball.yV *= -1;
                ball.top = 0;
            } else if (ball.top + ball.height > frame.height) {
                game.status = 'fail';
                ball.yV *= -1;
                ball.top = frame.height - ball.height;
            }
        }
    });
});
