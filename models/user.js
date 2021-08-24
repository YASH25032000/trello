const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userschema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    todos: [
        {
            type: String
        }
    ]
});

userschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', userschema);