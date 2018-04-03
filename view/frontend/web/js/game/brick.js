define(
    ['gameComponent', 'wallState', 'ballState', 'scoreBoardState'],
    function (GameComponent, wall, ball, scoreBoard) {
        'use strict';

        function transposeBallFromFrameToWallCoordinates(ballInFrameCoords, wall) {
            const ballInWallCoords = {};
            
            ['left', 'top'].forEach(function (p) {
                Object.defineProperty(ballInWallCoords, p, {
                    get: function () {
                        return ballInFrameCoords[p] - wall[p];
                    },
                    set: function (v) {
                        ballInFrameCoords[p] = v + wall[p];
                    }
                });
            });
            ['width', 'height'].forEach(function (p) {
                Object.defineProperty(ballInWallCoords, p, {
                    get: function () {
                        return ballInFrameCoords[p];
                    }
                });
            });
            ['xV', 'yV'].forEach(function (p) {
                Object.defineProperty(ballInWallCoords, p, {
                    get: function () {
                        return ballInFrameCoords[p];
                    },
                    set: function (v) {
                        ballInFrameCoords[p] = v;
                    }
                });
            });
            return ballInWallCoords;
        }

        function bottomSide(thing) {
            return thing.top + thing.height;
        }

        function rightSide(thing) {
            return thing.left + thing.width;
        }

        function horizontallyIntersects(ball, brick) {
            return rightSide(ball) > brick.left && ball.left < rightSide(brick);
        }

        function verticallyIntersects(ball, brick) {
            return bottomSide(ball) > brick.top && ball.top < bottomSide(brick);
        }

        function goingUp(ball) {
            return ball.yV < 0;
        }

        function goingDown(ball) {
            return ball.yV > 0;
        }

        function goingRight(ball) {
            return ball.xV > 0;
        }

        function goingLeft(ball) {
            return ball.xV < 0;
        }

        function ballBelow(ball, brick) {
            return ball.top > bottomSide(brick);
        }

        function ballAbove(ball, brick) {
            return bottomSide(ball) < brick.top;
        }

        function ballRightOf(ball, brick) {
            return ball.left > brick.left + brick.width;
        }

        function ballLeftOf(ball, brick) {
            return rightSide(ball) < brick.left;
        }

        function hitFromBelow(ball, brick) {
            const touch = ball.top < bottomSide(brick);
            return goingUp(ball) && horizontallyIntersects(ball, brick) && !ballAbove(ball, brick) && touch;
        }

        function hitFromAbove(ball, brick) {
            const touch = bottomSide(ball) > brick.top;
            return goingDown(ball) && horizontallyIntersects(ball, brick) && !ballBelow(ball, brick) && touch;
        }

        function hitFromLeft(ball, brick) {
            const touch = rightSide(ball) > brick.left;
            return goingRight(ball) && verticallyIntersects(ball, brick) && touch && !ballRightOf(ball, brick);
        }

        function hitFromRight(ball, brick) {
            const touch = ball.left < rightSide(brick);
            return goingLeft(ball) && verticallyIntersects(ball, brick) && touch && !ballLeftOf(ball, brick);
        }
        
        function speedUp(ball) {
            ball.yV += goingDown(ball) ? 0.3 : -0.3;
            ball.xV += goingRight(ball) ? 0.3 : -0.3;
        }


        ball = transposeBallFromFrameToWallCoordinates(ball, wall);

        return GameComponent.extend({
            initialize: function (options) {
                const brick = options.brick;
                this.index = 'brick-' + brick.row + '-' + brick.col;
                this.initDimensions(brick);
                brick.width = function () {
                    return wall.width / wall.cols;
                };
                brick.height = function () {
                    return wall.height / wall.rows;
                };
                brick.left = function () {
                    return brick.col * brick.width;
                };
                brick.top = function () {
                    return brick.row * brick.height;
                };
                this._super();
            },
            run: function () {
                const brick = this.brick;

                if (hitFromBelow(ball, brick) || hitFromAbove(ball, brick)) {
                    this.verticalHit(brick);
                }
                else if (hitFromLeft(ball, brick) || hitFromRight(ball, brick)) {
                    this.horizontalHit(brick);
                }
                this._super();
            },
            verticalHit: function (brick) {
                ball.top = goingDown(ball) ? brick.top - ball.height - 1 : bottomSide(brick) + 1;
                ball.yV *= -1;
                this.hit();
            },
            horizontalHit: function (brick) {
                ball.left = goingRight(ball) ? brick.left - ball.width - 1 : rightSide(brick) + 1;
                ball.xV *= -1;
                this.hit();
            },
            hit: function () {
                scoreBoard.score++;
                wall.brickCount--;
                speedUp(ball);
                this.destroy();
            }
        });
    });
