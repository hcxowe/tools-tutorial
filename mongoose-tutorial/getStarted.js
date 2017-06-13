var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongooseTutorial');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('连接成功');
});

var kittySchema = mongoose.Schema({ name: String });
kittySchema.methods.speack = function() {
    var greeting = this.name ? 'Meow name is ' + this.name : 'I don’t have a name';

    console.log(greeting);
};

var kitten = mongoose.model('kitten', kittySchema);

var  slience = new kitten({ name: 'slience' });

slience.save((err, slience) => {
    console.log(slience);
    slience.speack();
});

kitten.find((err, kittens) => {
    console.log('kittens: %j', kittens);
});

kitten.find({ name: /^slience/}, (err, kittens) => {
    console.log('slience: %j', kittens);
});






