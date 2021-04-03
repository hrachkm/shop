const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

//Db connection

mongoose.connect('mongodb://localhost/shop', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

//Settings

app.set('port', process.env.PORT || 3200)
app.set('views', path.join(__dirname+'/../', 'views'))
app.set('view engine', 'ejs')

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
    console.log(`Server listen in port ${app.get('port')}`)
})