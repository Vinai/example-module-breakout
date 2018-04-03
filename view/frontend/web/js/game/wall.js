define(
    ['gameComponent', 'ko', 'frameState', 'wallState', 'brickComponent', 'brickFactory', 'gameState'],
    function (GameComponent, ko, frame, wall, BrickComponent, createBrick, game) {
        'use strict';

        return GameComponent.extend({
            defaults: {
                border: 'none',
                backgroundColor: 'transparent'
            },
            initialize: function () {
                this._super();
                this.initDimensions(wall);
                wall.cols = 5;
                wall.rows = 4;
                wall.left = 0;
                wall.top = function () {
                    return frame.height * .1;
                };
                wall.height = function () {
                    return frame.height * .4;
                };
                wall.width = function () {
                    return frame.width;
                };
                this.setStartState();
            },
            setStartState: function () {
                this.destroyChildren();
                for (var row = 0; row < wall.rows; row++) {
                    for (var col = 0; col < wall.cols; col++) {
                        this.insertChild(new BrickComponent({brick: createBrick(row, col)}));
                    }
                }
                wall.brickCount = wall.rows * wall.cols;
            },
            run: function () {
                this._super();
                if (wall.brickCount === 0) {
                    game.status = 'win';
                }
            }
        });
    });
