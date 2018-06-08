var express = require('express');

var app = express();


var server = require('http').createServer(app);

var io = require('socket.io').listen(server);


app.use('/', express.static(__dirname + '/static'));




server.listen(80);


io.on('connection', function (socket) {

    // socket.on('sendData', function (data) 
//{
    //     console.log(data);
    //     socket.broadcast.emit('getData', data);
    // })
    
// socket.on('sendData', function (data) {
    //     console.log(data);
    //     socket.emit('getMyData', data);
    // })
    socket.on('sendName', function (data) {
        io.sockets.emit('getName', data);
        var number = Math.floor(Math.random()*10+1);

        var arr = []
        arr.push(number);
        arr.push(data);
        socket.on('sendData', function (data) {
            console.log(data);
            arr.push(data);
            socket.emit('getMyData', arr);
        })
        socket.on('sendData', function (data) {
            console.log(data);
            arr.push(data);
            socket.broadcast.emit('getData', arr);
        })
    })

})