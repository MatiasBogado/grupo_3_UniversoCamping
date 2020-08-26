// express
const express = require('express')
const app = express();

//ejs
app.set('view engine', 'ejs')
app.use(express.static(__dirname+ '/public'));

//rutas
const routeIndex = require('./routes/index')
const users = require('./routes/users')
const products = require('./routes/products')


//servidor
const PUERTO = 8080;
app.listen(PUERTO, () =>console.log("El servidor esta funcionando en el puerto " + PUERTO))

//URL
app.use('/',routeIndex)
app.use('/',products)
app.use('/',products)
app.use('/',products)
app.use('/',users)

