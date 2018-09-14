// We first need to load our mongoose data model
const Todos = require('../models/todoModel');

// Include body parser
const bodyParser = require('body-parser'); // In node_modules

module.exports = function (app) {

    app.use(bodyParser.json()); // Use body parser middleware
    app.use(bodyParser.urlencoded({extended: true})); // Parse out any JSON from body and handle URL encoded data

    //  Add a method to get all todos for a particular User (uname)
    app.get('/api/todos/:uname', function (req, res) {

        // ROUTE: GET a user's list of todos
        Todos.find({username: req.params.uname}, function (err, todos) { //Use the find method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todos);
        });

    });


    // ROUTE: GET a specific ToDo list item by it's record ID
    app.get('/api/todo/:id', function (req, res) {

        Todos.findById({_id: req.params.id}, function (err, todo) { //Use the findID method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todo);
        });

    });

    // ROUTE: POST (create) a new Todo item to my list
    app.post('/api/todo', function (req, res) {

        const newTodo = Todos({
            username: req.body.username,
            todo: req.body.todo,
            isDone: req.body.isDone,
            // hasAttachment: req.body.hasAttachment
        });
        newTodo.save(function (err) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        });

    });

    // ROUTE: UPDATE and existing item
    app.put('/api/todo', function (req, res) {

        Todos.findOneAndUpdate(req.body.id, {
            todo: req.body.todo,
            isDone: req.body.isDone,
          //  hasAttachment: req.body.hasAttachment
        }, function (err, todo) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        });
    });

    // ROUTE: DELETE an existing todo item by its ID
    app.delete('/api/todo', function (req, res) {

        Todos.findOneAndDelete(req.body.id, function (err) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        })

    });

};