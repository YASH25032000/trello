const express =require('express');
const router = express.Router();
const todo =require('../models/todo');
const user =require('../models/user');
const { isLoggedIn } = require('../middleware');

router.get('/', isLoggedIn, async(req,res) =>{
    isLoggedIn;
    console.log('err');
    const todos=await todo.find({"author" : req.user._id});
    res.render('todos/index', {todos})
})

router.get('/new', isLoggedIn, (req,res) =>{
    res.render('todos/new');
})

router.get('/sorted', isLoggedIn, async(req,res) =>{
    const todos=await todo.find({"author" : req.user._id});
    res.render('todos/sorted', {todos})
})

router.get('/:id', async(req,res) =>{
    const u1 = await user.findById(req.params.id);
    console.log(u1);
    res.render('todos/show', {todos})
})

router.post('/',  async(req,res) =>{
    const todos= new todo(req.body.todo);
    console.log(todos);
    todos.author = req.user._id;
    const {id} = req.user._id;;
    todos.start = false;
    todos.done = false;
    await todos.save();
    res.redirect('/todos');
})

router.post('/:id', async(req,res) =>{
    const u1 = await user.findById(req.params.id);
    console.log(u1);
    res.render('todos/show', {todos})
})

router.delete('/:id', async(req,res) =>{
    const {id} =req.params;
    await todo.findByIdAndDelete(id);
    res.redirect('/todos');
})

module.exports = router;