require.config({
    paths: {
        'mock': '../../uilibs/mockjs/mock',
    }
});

require(['js/a', 'js/api'], function(a) {
    $.ajax({
        url: '/about',
        type: 'get',
        dataType: 'json',
        success: function(ret) {
            $('body').append('<p>' + ret.x + ' + ' + ret.y + ' = ' + a.add(ret.x, ret.y) + '</p>');
        }
    });
});