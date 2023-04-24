const websocket = require('./websocket')
const mongoose = require('mongoose')
const socket = require('socket.io')
const Main = require('./http')
const port = 4000||process.env.port
const {io, http} = Main

// iRt9PsVNkKe3DOpk
mongoose.set('strictQuery',false)

mongoose.connect('mongodb+srv://APIforNAVE:iRt9PsVNkKe3DOpk@dados.dbbl6x2.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    http.listen(port, () => console.log('servidor Rodando!'))
})
.catch(err => console.log(err))
