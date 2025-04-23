var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);
var os = require('os');

var games = {
    "000001":{
        players: [
            {
                name:"name",
                score:0
            }
        ],
        isRunning: false
    }
};
app.get('/', (req, res) => {
    res.sendFile(__dirname+"/main.html");
});
io.on('connection', (socket) => {
    socket.on('reqCodeVer', (code) => {
        console.log(Object.keys(games).indexOf(code) != -1);
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});
