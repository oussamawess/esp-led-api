const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let state = 1; // initial state

app.use(cors());

app.get('/api/state', (req, res) => {
  res.json({ id: 1, state });
});

app.post('/api/state', express.json(), (req, res) => {
  state = req.body.state;
  // Notify all connected clients about the state change
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ id: 1, state }));
    }
  });
  res.json({ id: 1, state });
});

wss.on('connection', (ws) => {
  // Send the current state to a newly connected client
  ws.send(JSON.stringify({ id: 1, state }));
});

const listener = server.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
