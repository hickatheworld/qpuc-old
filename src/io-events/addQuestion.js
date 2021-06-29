const db = require('../db');

module.exports = {
	name: 'addQuestion',
	fn: function (data, callback, socket, app) {
		console.log('[Socket] Question add');
		db.query('INSERT INTO QUESTIONS(STATEMENT,ANSWER,COLLECTION) VALUES(?,?,?)', [data.statement, data.answer, data.collection], (err, packet) => {
			if (err)
				return callback(err);
			callback(null, packet.insertId);
		});
	}
}