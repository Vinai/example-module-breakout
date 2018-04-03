define(
    ['gameComponent', 'ko', 'ballState', 'frameState', 'paddleState'],
    function (GameComponent, ko, ball, frame, paddle) {
        'use strict';

        var targetPageX = ko.observable();

        var inFrameXPos;
        
        const trackMouse = function (e) {
            targetPageX(e.pageX);
        };
        
        function calculatePaddlePosition (paddleDomNode) {
            const elementPageX = paddleDomNode ? paddleDomNode.getBoundingClientRect().left : 0;
            const delta = targetPageX() - elementPageX;
            const targetFrameX = inFrameXPos + delta - Math.floor(paddle.width / 2);
            return inFrameXPos = Math.min(Math.max(0, targetFrameX), frame.width - paddle.width);
        }

        return GameComponent.extend({
            defaults: {
                bindDomNode: true,
                pauseWithGame: true
            },
            initialize: function () {
                this._super();
                this.initDimensions(paddle);
                paddle.width = function () {
                    return frame.width * .21;
                };
                paddle.height = function () {
                    return frame.height * .05;
                };
                inFrameXPos = (frame.width / 2) - (paddle.width / 2);
                this.setStartState();
                if (! this.pauseWithGame) {
                    paddle.left = function () {
                        return calculatePaddlePosition(this.domNode);
                    }.bind(this);
                }
                document.addEventListener('mousemove', trackMouse);
            },
            destroy: function () {
                document.removeEventListener('mousemove', trackMouse);
                this._super();
            },
            setStartState: function () {
                paddle.top = frame.height - paddle.height - 2;
                const middlePosition = (frame.width / 2) - (paddle.width / 2);
                targetPageX(middlePosition);
                if (this.pauseWithGame) {
                    paddle.left = middlePosition;
                }
            },
            run: function () {
                if (this.pauseWithGame) {
                    paddle.left = calculatePaddlePosition(this.domNode);
                }
                this.checkBallCollision();
                this._super();
            },
            checkBallCollision: function () {
                const ballRight = ball.left + ball.width;
                const ballBottom = ball.top + ball.height;
                const paddleRight = paddle.left + paddle.width;

                if (ball.left < paddleRight &&
                    ballRight > paddle.left &&
                    ballBottom > paddle.top &&
                    ball.top < paddle.top
                ) {
                    ball.yV *= -1;
                }
            }
        });
    });
