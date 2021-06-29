const { Server } = require('socket.io');
const fs = require('fs');
module.exports = function (server, app) {
	const io = new Server(server);
	const events = new Map();
	const eventFiles = fs.readdirSync('./io-events').filter(f => f.endsWith('.js'));
	eventFiles.forEach(file => {
		const event = require(`./io-events/${file}`);
		events.set(event.name, event);
	});
	io.on('connection', socket => {
		console.log(`[Socket] new socket connected: ${socket.id}`);
		socket.on('disconnect', () => {
			console.log(`[Socket] ${socket.id} disconnected.`);
		});
		events.forEach(e => socket.on(e.name, (data, callback) => e.fn(data, callback, socket, app)));
	});
	return io;
}