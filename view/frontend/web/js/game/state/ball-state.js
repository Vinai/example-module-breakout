define(['ko', 'writableComputed'], function (ko, writableComputed) {
    'use strict';

    return ko.track({
        width: writableComputed(),
        height: writableComputed(),
        left: writableComputed(),
        top: writableComputed(),
        xV: 0,
        yV: 0
    });
});
