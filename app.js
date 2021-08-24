if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path= require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const localstrategy = require('passport-local');
const todo = require('./models/todo');
const user =require('./models/user');
const ExpressError = require('./utils/ExpressError');
const MongoDBStore = require('connect-mongodb-session')(session);

//mongodb+srv://ourfirstuser:<password>@cluster0.uyszu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority



const userroutes =require('./routes/users');
const todosroutes = require('./routes/todos');
const startroutes = require('./routes/start');
const doneroutes = require('./routes/done');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/todo' ;



mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify :false
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("database connected");
});



const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


const secret= process.env.SECRET || 'thisissecret!';

const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'sessions',
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})


app.use(session({
    name: 'sessions',
    secret,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    },
    store: store,
    resave: false,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use('/', userroutes);
app.use('/todos', todosroutes);
app.use('/todos/start', startroutes);
app.use('/todos/done', doneroutes);


app.get('/', (req,res)=>{
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Serving on port ${port}`)
})