const express=require('express');
const app=express();

const bodypraser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');

const empRoutes=require('./api/routes/employee');
const requestRoutes=require('./api/routes/requests');
const requestHandleRoutes=require('./api/routes/requestHandle');
const statusRoutes=require('./api/routes/status');
const autoRequestRoutes=require('./api/routes/autorequest');
const productRoutes=require('./api/routes/products');
const loginRoutes=require('./api/routes/login')

mongoose.connect('mongodb://localhost/shop', {useNewUrlParser: true,  useUnifiedTopology: true });
var db=mongoose.connection;

db.on('error',console.error.bind(console,'MongoDB connection error:'));

console.log('databases created');

app.use(bodypraser.urlencoded({extended:false}));
app.use(bodypraser.json()); 
app.use(session({
    secret:'secret-key',
    resave: true,
    saveUninitialized: true,
      
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})


app.use('/employee',empRoutes);
app.use ('/requests',requestRoutes);
app.use('/requestHandle',requestHandleRoutes);
app.use('/status',statusRoutes);
app.use('/product',productRoutes);
app.use('/autorequest',autoRequestRoutes);
app.use('/login',loginRoutes);

app.use((req, res, next) => {
    console.log(next)
    const error = new Error("requesting API not found");
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message
            }
        })
});


module.exports=app;