require.config({
    paths: {
        'mock': '../../../zuilibs/mockjs/mock',
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

    $.get('/data', function(data) {
        $('#table').datagrid('loadData', data);
    }, 'json')
});