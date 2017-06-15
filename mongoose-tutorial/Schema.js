var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongooseTutorial');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('连接成功');
});

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{
        body: String,
        data: Date
    }],
    date: {
        type: Date, default: Date.now()
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

// define a schema
var animalSchema = new Schema({ name: String, type: String });

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

var Animal = mongoose.model('Animal', animalSchema);

var dog = new Animal({ type: 'dog', name: 'fido' });

dog.save((err, dog) => {
    Animal.findByName('fido', function(err, animals) {
        console.log(animals);
    });

    dog.findSimilarTypes(function(err, dogs) {
        console.log(dogs); // woof
    });
});

Animal.create({ name: 'xiaoyong', type: 'man' }, (err, xiao) => {
    console.log('create xiaoyong');
});


