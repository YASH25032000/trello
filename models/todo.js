const mongoose= require('mongoose');
const schema= mongoose.Schema;

const todoschema= new schema({
    task: String,
    priority: Number,
    start: Boolean,
    done: Boolean,
    author: {
        type: schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports =mongoose.model('todo', todoschema);