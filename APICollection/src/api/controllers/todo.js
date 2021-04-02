const db = require("../database/index");
const Todo = db.todo;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "title required!"
        });
        return;
    }

    const todo = {
        title: req.body.title,
        description: req.body.description
    };

    Todo.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the todo."
            });
        });
};

exports.findAll = (req, res) => {
    Todo.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving todo."
            });
        });
};