const socket = io();

socket.on('connect', () => {
	console.log('[Socket] Socket.io connection established');
});

socket.on('bro', () => alert('yo'));