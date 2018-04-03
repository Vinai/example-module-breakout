define(['gameComponent', 'ballState', 'frameState'], function (GameComponent, ball, frame) {
    'use strict';

    return GameComponent.extend({
        defaults: {
            backgroundColor: 'red',
            initialVelocity: 5
        },
        initialize: function () {
            this._super();
            this.initDimensions(ball);
            this.setStartState();
        },
        setStartState: function () {
            ball.width = 20;
            ball.height = 20;
            ball.left = (frame.width / 2) - (ball.width / 2);
            ball.top = (frame.height * .60) - (ball.height / 2);
            ball.xV = ball.yV = this.initialVelocity;
        },
        run: function () {
            this._super();
            ball.left += ball.xV;
            ball.top += ball.yV;
        }
    });
});
