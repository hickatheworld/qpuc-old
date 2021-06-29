module.exports = {
	name: 'openGame',
	fn: function (data, callback, socket, app) {
		console.log('[Socket] Game opened');
		socket.broadcast.emit('openGame');
		app.game.open = true;
	}
}