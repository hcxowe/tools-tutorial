var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongooseTutorial');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('连接成功');
});

var Schema = mongoose.Schema;

var ChildSchema1 = new Schema({name:String});
var ChildSchema2 = new Schema({name:String});
var ParentSchema = new Schema({
    children1:ChildSchema1,   //嵌套Document
    children2:[ChildSchema2]  //嵌套Documents
});

var ParentModel = db.model('Parent',ParentSchema);
// var parent = new ParentModel({
//     children1: {name : 'a1'},
//     children2:[{name:'c1'},{name:'c2'}]
// });

// parent.children2[0].name = 'd';
// parent.children2.push({name: 'hcxowe'});
// parent.save((err, parent) => {
//     console.log(parent);
// });

ParentModel.find({  })

