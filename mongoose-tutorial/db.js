var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongooseTutorial');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('连接成功');
});

module.exports = db;