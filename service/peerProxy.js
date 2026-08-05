const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  // Map of userId to socket instance
  const connections = new Map()

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    // Forward messages to everyone except the sender
    socket.on('message', function message(rawData) {
      try {
        const data = JSON.parse(rawData)

        if (data.type === 'auth') {
            if (socket.userId && connections.get(socket.userId) === socket) {
                connections.delete(socket.userId); //get rid of previous authentication of same socket, if exists
            }

            socket.userId = data.userId
            connections.set(data.userId, socket)
        }

        if (data.type === 'user_notification') {
            const recipientClient = connections.get(data.recipientId)

            if (recipientClient && recipientClient.readyState === WebSocket.OPEN) {
                recipientClient.send(data.content)
            }
        }
      } catch (err) {
        console.error('Failed to parse or route message:', err);
      }
    });

    // Respond to pong messages by marking the connection alive
    socket.on('pong', () => {
      socket.isAlive = true;
    });

    socket.on('close', () => {
        if (socket.userId) {
            if (connections.get(socket.userId) === socket) {
                connections.delete(socket.userId);
            }
        }
    })
  });

    

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };
