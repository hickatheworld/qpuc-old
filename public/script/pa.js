const gameData = JSON.parse(_game);

$('#game-switcher').addEventListener('click', () => {
	socket.emit(gameData.open ? 'closeGame' : 'openGame');
	gameData.open = !gameData.open;
	$('#game-switcher').innerText = gameData.open ? 'Fermer le jeu' : 'Ouvrir le jeu';
});

$('#send-question').addEventListener('click', () => {
	const statement = $('#question-statement-composer').value;
	const answer = $('#question-answer-composer').value;
	let collection = $('#question-collection-selector').value;
	if (collection === 'NO_COLLECTION')
		collection = null;
	socket.emit('addQuestion', { statement, answer, collection }, function (err, id) {
		if (err)
			throw err;
		const elm = document.createElement('div');
		elm.innerHTML = `<div class='question-delete-btn'>×</div>
						<div class='question-id'>${id}</div>
						<div class='question-texts'>
							<div class='question-statement'>${statement}</div>
							<div class='question-answer'>${answer}</div>
						</div>
		`
		elm.id = `q${id}`;
		elm.className = 'question';
		$('#questions-container').appendChild(elm);
		$(`.question#q${id} .question-delete-btn`).addEventListener('click', () => deleteQuestion(id));
		$('#question-statement-composer').value = '';
		$('#question-answer-composer').value = '';
	});
});


function deleteQuestion(id) {
	socket.emit('deleteQuestion', { id }, function (err) {
		if (err)
			throw err;
		$(`.question#q${id}`).remove();
	});
}
/**
 * @type {HTMLDivElement}
 */
$('.question-delete-btn').forEach(e => {
	const id = e.parentElement.id.substring(1);
	e.addEventListener('click', () => deleteQuestion(id));
});