const Todo = require("../models/TodoModel");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const MESSAGE_TODO_NOT_FOUND = "No such todo found";

const createTodo = async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById( id );
        if (existingUser) {
            const todo = new Todo({ title, body, user: existingUser });
            await todo.save();
            existingUser.list.push(todo);
            existingUser.save();
            res.status(200).json({todo});
        }
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getTodos = async (req, res) => {
    const todos = await Todo.find({user: req.params.id}).sort({ createdAt: -1 });
    if(todos.length !==0){
        res.status(200).json(todos);
    }else{
        res.status(200).json({ message: "No Todos"});
    }   
};



const deleteTodo = async (req, res) => {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } });
    if (existingUser) {
        try {
            const todo = await Todo.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "Task Updated" }));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const updateTodo = async (req, res) => {
    const { title, body, id } = req.body;
    const existingUser = await User.find({ id });
    if (existingUser) {
        try {
            const todo = await Todo.findByIdAndUpdate(req.params.id, { title, body });
            todo.save().then(() => res.status(200).json({ message: "Task Updated" }));
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        await user.save().then(() => {
            res.status(200).json({ message : "Signup successful" })
        });
    } catch (error) {
        res.status(400).json({ message: "User Already Exsists" });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "Please Sign Up First" });
        }
        
        const isPasswordCorrect =bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password Is Not Correct" });
        }
        
        const { password, ...others } = user._doc;
        res.status(200).json({ others });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = {
    createTodo, getTodos, updateTodo, deleteTodo, register, login
};
