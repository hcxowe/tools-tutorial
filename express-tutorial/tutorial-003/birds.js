var express = require('express');
var router = express.Router();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
router.use(function(req, res, next) {
    console.log('time:' + Date.now());

    next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
// router.use('/user/:id', function (req, res, next) {
//   console.log('Request Type:', req.method);
//   next();
// });

router.get('/', function(req, res) {
    res.send('birds get something');
});

router.get('/birds', function(req, res) {
    res.send('birds get birds something');
});

module.exports = router;
