var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/images'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/client', function(req, res){
  res.sendFile(__dirname + '/client.html');
});

io.on('connection', function(socket){
  console.log('new connection');
  socket.on('disconnect', function(){
    console.log('disconnection');
  });
  socket.on('now_playing', function(msg){
    console.log('now_playing: ' + msg);
  });
  socket.on('now_playing', function(msg){
    io.emit('now_playing', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});