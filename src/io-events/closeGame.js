module.exports = {
	name: 'closeGame',
	fn: function (data, callback, socket, app) {
		console.log('[Socket] Game closed');
		socket.broadcast.emit('closeGame');
		app.game.open = false;
	}
}