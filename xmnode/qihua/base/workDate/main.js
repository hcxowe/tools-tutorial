require(['js/a'], function(a) {
    $.get('/about', function(ret) {
        $('body').append('<p>' + ret.x + ' + ' + ret.y + ' = ' + a.add(ret.x, ret.y) + '</p>');
    })
});