const http = require('http')
const Server = require('socket.io').Server
const express = require('express')
const socket = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./Routes')
const app = express()
const morgan = require('morgan')
const serverHttp = http.createServer(app)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(routes)
const io = new Server(serverHttp, {
  cors: {
    origin: ['http://localhost:3000', 'https://apifor-nave-withwebsockets.onrender.com'],
    credentials: true
  }
});
const Main = {
    io: io,
    http: serverHttp
}
module.exports = Main