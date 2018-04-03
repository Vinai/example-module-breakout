define(['ko'], function(ko) {
    'use strict';
    
    ko.bindingHandlers.bindDomNode = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            if (valueAccessor()) {
                bindingContext.$data.domNode = element;
            }
        }
    };
});
