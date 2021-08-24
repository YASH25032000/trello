const express =require('express');
const router = express.Router();
const passport = require('passport');
const user =require('../models/user');
const catchAsync = require('../utils/catchAsync');



router.get('/register', (req,res) =>{
    res.render('users/register');
})

router.post('/register', catchAsync(async(req,res) =>{
    try{
        const {email, username, password} = req.body;
        const users = new user ({email,username});
        console.log(users);
        const registereduser =await user.register(users, password);
        res.render('users/login');
    }
    catch(e){
        console.log(e);
        res.redirect('register');
    }
}))

router.get('/login', (req,res) =>{
    res.render('users/login');
})


router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}) ,(req,res) =>{
    const {id} =req.user._id;
    res.redirect('todos');
})

router.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
})

module.exports =router;
