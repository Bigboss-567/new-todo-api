require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
    {id: 1, task: "Finish week four project", completed: false},
    {id: 2, task: "Deploy API project", completed: false},
];

// GET ALL
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// GET ONE

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({message: "Todo not found"});
    }               
    });

//CREATE
app.post('/todos', (req, res) => {
    const {task} = req.body;
    if (!task) {
        return res.status(400).json({error: "Task is required"});
    }
    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//PATCH OR UPDATE
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({error: "Todo not found"});
    Object.assign(todo, req.body);
    res.status(200).json(todo);    
    }
});

//DELETE
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const lengthBefore = todos.length;
    todos = todos.filter(t => t.id !== id);
    if (todos.length === lengthBefore) {
        return res.status(404).json({error: "Todo not found"});
    }
    res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



























