define(['gameComponent', 'ko', 'gameState'], function (GameComponent, ko, game) {
    'use strict';
    
    return GameComponent.extend({
        initialize: function () {
            this._super();
            this.initDimensions(game);
            ko.defineProperty(this, 'running', function () {
                return game.running;
            });
            this.setStartState();
        },
        setStartState: function () {
            game.width = 600;
            game.height = 500;
            game.running = false;
            game.status = 'pending';
            this._super();
        },
        run: function () {
            this._super();
            if (game.status !== 'started' && game.running) {
                game.running = false;
            }
            if (game.running) {
                window.requestAnimationFrame(this.run.bind(this));
            }
        },
        start: function () {
            if (game.status === 'win' || game.status === 'fail') {
                this.reset();
            } else {
                if (game.status === 'pending') {
                    game.status = 'started';
                }
                if (!game.running) {
                    game.running = true;
                    this.run();
                }
            }
        },
        stop: function () {
            game.running = false;
        }
    });
});
