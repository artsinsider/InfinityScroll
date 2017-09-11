var io = require('socket.io')(8000);

io.on('connection', function(socket){
    // console.log('socket', socket.id)
    //
    // socket.join('vip', function (error) {
    //     console.log('socket.rooms', socket.rooms)
    // })
    //
    // socket.broadcast.send({id: socket.id, str: 'str'});
    // socket.emit('authentication', { token: 'wadawdlkjiohawd'});
    
    
    socket.on('message', function (data) {
        socket.broadcast.send(data)
    })
    
})

