const express = require("express")
const dotenv = require("dotenv")
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json()); // to accept JSON data
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', require('./routes/usersRoute'));
app.use('/items', require('./routes/itemsRoute'));
app.use('/items', require('./routes/bidsRoute'));
app.use('/notifications', require('./routes/notificationsRoute'));

const  PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server started on ${PORT}`))

const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.event === 'new_bid') {
      const bidData = parsedMessage.data;

      // Broadcast the new bid to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            event: 'update',
            data: bidData
          }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


