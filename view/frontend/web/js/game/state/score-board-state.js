define(['ko', 'writableComputed'], function (ko, writableComputed) {
    'use strict';
    
    return ko.track({
        width: writableComputed(),
        height: writableComputed(),
        top: writableComputed(),
        left: writableComputed(),
        score: 0
    });
});
