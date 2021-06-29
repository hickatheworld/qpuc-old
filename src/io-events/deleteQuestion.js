const db = require('../db');

module.exports = {
	name: 'deleteQuestion',
	fn: function (data, callback, socket, app) {
		console.log('[Socket] Question delete');
		db.query('DELETE FROM QUESTIONS WHERE ID = ?', [data.id], (err, packet) => {
			if (err)
				return callback(err);
			callback();
		});
	}
}