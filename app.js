//Aqui se manejan las rutas, estas rutas redireccionan a archivos .js, los cuales contienen
//los queries y la conexion con la base de datos
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//En estas variables se guardan los js que renderizan ventanas o realizan consultas a la base de datos
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/Login');
var reg = require('./routes/Registro');
var comp = require('./routes/Comprar');
var det = require('./routes/DetOrden');

var app = express();

// Aqui se maneja al driver que controla al tipo de view que se utiliza, en este caso es jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//funciones varias propias de express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//A cada variable que anteriormente se guardaron, se le designa una ruta especifica para ser llamada
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/reg', reg);
app.use('/comp', comp);
app.use('/det', det);

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

module.exports = app;