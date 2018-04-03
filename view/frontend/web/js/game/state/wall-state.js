define(['ko', 'writableComputed'], function (ko, writableComputed) {
    'use strict';

    return ko.track({
        width: writableComputed(),
        height: writableComputed(),
        top: writableComputed(),
        left: writableComputed(),
        rows: 0,
        cols: 0,
        brickCount: 0
    });
});
