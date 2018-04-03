define(['uiComponent', 'ko', 'VinaiKopp_Breakout/js/dom-node-binding', 'es6-collections'], function (Component, ko) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'VinaiKopp_Breakout/game-component',
            border: '1px solid black',
            backgroundColor: 'white',
            bindDomNode: false
        },
        initDimensions: function (state) {
            ['width', 'height', 'top', 'left'].forEach(function (property) {
                ko.defineProperty(this, property, function () {
                    return state[property] && state[property] + 'px';
                });
            }.bind(this));
        },
        run: function () {
            this.elems.each(function (elem) {
                elem.run();
            });
        },
        setStartState: function () {
            
        },
        reset: function () {
            this.setStartState();
            this.elems.each(function (elem) {
                elem.reset();
            });
        }
    });
});
