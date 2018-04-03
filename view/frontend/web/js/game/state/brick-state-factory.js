define(['ko', 'writableComputed'], function (ko, writableComputed) {
    'use strict';

    return function (row, col) {
        return ko.track({
            width: writableComputed(),
            height: writableComputed(),
            top: writableComputed(),
            left: writableComputed(),
            row: row,
            col: col
        });
    }
});
