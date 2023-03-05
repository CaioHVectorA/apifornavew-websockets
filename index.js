const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./Routes')
const app = express()
const port = 4000||process.env.port

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(routes)

// iRt9PsVNkKe3DOpk
mongoose.set('strictQuery',false)

mongoose.connect('mongodb+srv://APIforNAVE:iRt9PsVNkKe3DOpk@dados.dbbl6x2.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    app.listen(port, () => console.log('servidor Rodando!'))
})
.catch(err => console.log(err))

module.exports = app