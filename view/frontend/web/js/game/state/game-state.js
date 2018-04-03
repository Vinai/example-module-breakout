define(['ko', 'writableComputed'], function (ko, writableComputed) {
    'use strict';
    
    return ko.track({
        width: writableComputed(),
        height: writableComputed(),
        left: writableComputed(),
        top: writableComputed(),
        running: false,
        status: null
    });
});
