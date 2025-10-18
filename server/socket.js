module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join-poll', (pollId) => {
      socket.join(pollId);
    });

    // Broadcast vote updates to room
    // (Emits are handled in routes/polls.js)
  });
};