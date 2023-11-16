import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';

// integrate nodejs express framework to manage cors
const app = express();

// create a http server instance
const server = createServer(app);

// enable CORS for all routes via express
app.use(cors());

// enable CORS for socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // allow requests from any url
    methods: ["GET", "POST"] // allow these methods only
  }
});

io.on("connection", (socket) => {
    socket.join("chatty-appy")
    console.log(`Socket ${socket.id} is connected.`);

    // error handling
    socket.on("error", (error) => {
        console.error('Socket error:', error);
    });

    // recieve messages from the client and store them
    socket.on("message", (message) => {
        console.log(`New message on the server: "${message}"`);
        socket.emit('message', message)
        // socket.to("chatt-appy").emit('message', message)
    }); 

    socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} is disconnected.`)
    });
});

// set specific port for server to listen to
server.listen(3003, () => {
    console.log("Chat server is running on port 3003.");
});