const net = require('net');
const fs = require('fs')
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

// if we get any data, write it to the output file

// How do we deal with multiple users here? We can't be
// writing it all to the same output. The output file
// must be unique to each user...
tSocket.on("data", function(buffer) {
  fs.writeFile("output.txt", buffer.toString("utf8"), (err) => {
    if (err) throw err
  })
  // return process.stdout.write(buffer.toString("utf8"));
});

// if the user types anything, send it to the socket
process.stdin.on("data", function(buffer) {
  return tSocket.write(buffer.toString("utf8"));
});

  