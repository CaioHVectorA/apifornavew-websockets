const Main = require('./http')
const {http, io} = Main
const websocket = null
io.on("connection", socket => {
    socket.on('aprovou',() => {
        io.emit('adm_aprovou')
    })
    socket.on('mandou', (value) => {
        io.emit('adm_recebeu',value)
    })
})