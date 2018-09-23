const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs');
// Connect to the database
mongoose.connect('mongodb://test:test123@ds113003.mlab.com:13003/todolist')

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// save a json as a demo
// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved')
// });

var urlencodingParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {

app.get('/todo', (req, res) => {
  // get data from mongodb and pass it to view
  Todo.find({}, (err, data) => {
    res.render('todo', {todos: data});
  });
});

app.post('/todo', urlencodingParser, (req, res) => {

  // get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item', (req, res) => {
  // delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

};
