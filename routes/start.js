const express =require('express');
const router = express.Router();
const todo =require('../models/todo');
const user =require('../models/user');
const { isLoggedIn } = require('../middleware');


router.post('/:id', isLoggedIn,  async(req,res) =>{
    const {id} = req.params;
    const u1 = await todo.findById(id);
    console.log(u1);
    const filter= {_id : id};
    const b = !u1.start;
    const update = {start: b};
    console.log(filter);
    console.log(update);
    const u2 = await todo.findOneAndUpdate(filter, update);
    console.log(u2);
    const todos=await todo.find({"author" : req.user._id});
    res.render('todos/index', {todos})
})

module.exports = router;