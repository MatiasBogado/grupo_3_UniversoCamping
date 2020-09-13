const express = require('express')
const app = express();

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const methodOverride = require('method-override');

const session = require('express-session');

app.use(session({secret:'mercado liebre for ever'}));

// view engine setup
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'Universo camping rules'}));

app.use(methodOverride('_method'));

//rutas
const index = require('./routes/index')
const users = require('./routes/users')
const products = require('./routes/products')


//servidor
const PUERTO = 8080;
app.listen(PUERTO, () =>console.log("El servidor esta funcionando en el puerto " + PUERTO))

//URL
app.use('/',index)
app.use('/products',products)
app.use('/users',users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
