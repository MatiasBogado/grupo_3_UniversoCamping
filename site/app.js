// express
const express = require('express')
const app = express();

//ejs
app.set('view engine', 'ejs')
app.use(express.static(__dirname+ '/public'));

//rutas
const routeIndex = require('./routes/Index')
const productDetail = require('./routes/productDetail')
const productCart = require('./routes/productCart')
const register = require('./routes/register')
const productAdd = require('./routes/productAdd')

//servidor
const PUERTO = 8080;
app.listen(PUERTO, () =>console.log("El servidor esta levantado en el puerto " + PUERTO))

//URL
app.use('/',routeIndex)
app.use('/productDetail',productDetail)
app.use('/productCart',productCart)
app.use('/register',register)
app.use('/productAdd',productAdd)
