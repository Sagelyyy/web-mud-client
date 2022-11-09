const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Tail = require('tail').Tail;
const tail = new Tail("output.txt");

server.listen(8080)

app.set('view engine', 'ejs')
app.use(express.static('public'))

let tailData = []

tail.on("line", function (data) {
    tailData.push(data)
});

tail.on("error", function (error) {
    console.log('ERROR: ', error);
});



app.get('/', (req, res) => {
    res.render('index', { output: tailData })
})

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});