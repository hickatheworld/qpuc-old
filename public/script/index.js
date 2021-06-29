console.log('up');

socket.on('openGame', () => {
	console.log('open');
	$('#qpuc-no-game').setAttribute('hidden', '');
	$('#qpuc-join').removeAttribute('hidden');
});

socket.on('closeGame', () => {
	console.log('close');
	$('#qpuc-join').setAttribute('hidden', '');
	$('#qpuc-no-game').removeAttribute('hidden');
});