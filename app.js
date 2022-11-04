const net = require('net');
const {TelnetSocket} = require("telnet-stream");
let socket, tSocket;


  const params = {
    host: 'moo.sindome.org',
    port: 5555,
  }

// create a Socket connection
socket = net.createConnection(params.port, params.host);

// decorate the Socket connection as a TelnetSocket
tSocket = new TelnetSocket(socket);

// if the socket closes, terminate the program
tSocket.on("close", function() {
  return process.exit();
});

// if we get any data, display it to stdout
tSocket.on("data", function(buffer) {
  return process.stdout.write(buffer.toString("utf8"));
});

// if the user types anything, send it to the socket
process.stdin.on("data", function(buffer) {
  return tSocket.write(buffer.toString("utf8"));
});

  