const mongoose = require('mongoose');
const todo = require('../models/todo');

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("database connected");
});


const seedDB=async() =>{
    for(let i=0;i<50;i++){
        const todos= new todo({task: 'abc', priority: 3})
        todos.author = 123;
        await todos.save();
    }
}

seedDB().then(() =>{
    mongoose.connection.close();
});