var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serving files from public folder
app.use(express.static(__dirname + '/public'));

var todoList = [];

//function to search for the index of the object with the specific id key instead of doing this by index of the array as the :id value
function search(idKey, array){
    for (var i=0; i < array.length; i++) {
        if (array[i].id === idKey) {
            return i;
        }
    }
}

// GET /api/todos
app.get('/api/todos', function(req, res, next) {
    res.send(todoList);      
});

// POST add todo
app.post('/api/todos/', function(req, res) {
    todoList.push(req.body)
    res.send(todoList);
 });

// PUT edit todo
app.put('/api/todos/:id', function(req, res, next) {
    let id = Number(req.params.id);
    let index = search(id, todoList);
    todoList[index] = req.body;
    res.send(todoList);
});

// DELETE delete todo
app.delete('/api/todos/:id', function(req, res, next) {
    let id = Number(req.params.id);
    let index = search(id, todoList);
    todoList.splice(index, 1);
    res.send(todoList);
});

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
});