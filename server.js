var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);
var os = require('os');


var games = {
    "000001":{
        room: "000001",
        players: [
            {
                name:"name",
                score:0
            }
        ],
        isRunning: false,
        sockets:[]
    }
};
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/main.html");
});
io.on('connection', (socket) => {
    socket.on('reqCodeVer', (code) => {
        if (Object.keys(games).indexOf(code) != -1) {
            socket.emit('codeVer', games[code]);
            socket.join(games[code].room);

        }
    });
    socket.on('newPlayer', (name, code) => {
        games[code].players.push({
            name: name,
            score: 0
        });
        console.log("Player "+name+", joined lobby");
    });
    /*socket.on('log', (message) => {
        console.log(message);
    })*/
   socket.on('disconnect', () => {
    Object.keys(games).forEach(element => {
        socket.leave(element);
    });
   })
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});
