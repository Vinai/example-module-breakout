define(['ko'], function (ko) {
    'use strict';

    return function writableObservable(initialValue) {
        
        const observable = ko.observable(initialValue);
        
        return ko.pureComputed({
            read: function () {
                const v = observable();
                return v instanceof Function ? v() : v;
            },
            write: function (newValue) {
                observable(newValue);
            }
        })
    }
});
