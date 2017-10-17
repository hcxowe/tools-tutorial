define(['require'], function(require) {
    var a = require('a');

    return {
        show: function() {
            console.log('moduleE ' + a.color + " " + a.size);
        }
    };
});