import io from 'socket.io-client';

(function () {
    const socket = io(':8000')
    socket.on('message', function(data) {
        console.log('message', data)
    }).on('authentication', function (data) {
        console.info(data)
    })


})()
