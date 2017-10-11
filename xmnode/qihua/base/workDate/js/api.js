define(['mock'], function(Mock) {
    Mock.mock('/about', 'get', {
        'x|0-100': 1,
        'y|0-100': 1,
    });
});

// https://github.com/nuysoft/Mock/wiki