const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const engines = require('consolidate');

//Db connection

mongoose.connect('mongodb+srv://myshop:shopcart@cluster0.44ee1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

//Settings

app.set('port', process.env.PORT || 3200)
// app.set('views', path.join(__dirname + '/../', 'views'))
// app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/../public'));

//Middlewares

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

//Routes

app.use('/', require('./routes'))

//Static files

//Init server

app.listen(app.get('port'), () => {
    console.log(global._rootdir)
    console.log(`Server listen in port ${app.get('port')}`)
})