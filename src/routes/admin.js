const { Router } = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = new Router();

router.get('/', function (req, res) {
	if (req.session.authentified)
		res.redirect('/admin/pa');
	else
		res.redirect('/admin/auth')
});

router.get('/auth', function (req, res) {
	if (req.session.authentified)
		res.redirect('/admin/pa');
	else
		res.render('auth', { pageTitle: 'Connexion' });
});

router.get('/pa', function (req, res) {
	if (!req.session.authentified)
		return res.redirect('/admin/auth');
	db.query('SELECT * FROM QUESTIONS', async function (err, questions) {
		if (err)
			return res.render('pa', { pageTitle: 'PA', game: JSON.stringify(res.app.game), error: true });
		db.query('SELECT * FROM COLLECTIONS', async function (err, collections) {
			if (err)
				return res.render('pa', { pageTitle: 'PA', game: JSON.stringify(res.app.game), error: true });
			res.render('pa', { pageTitle: 'PA', game: JSON.stringify(res.app.game), collections, questions, error: false });
		});
	});
});

router.get('/logout', function (req, res) {
	req.session.destroy(() => res.redirect('/admin/auth'));
});

router.post('/auth', function (req, res) {
	const { username, password } = req.body;
	db.query('SELECT * FROM ADMINS WHERE USERNAME = ?', [username], async function (err, values) {
		if (err)
			throw err;
		if (values.length === 0)
			return res.render('auth', { incorrect: true, username });
		const valid = await bcrypt.compare(password, values[0].password);
		if (!valid)
			return res.render('auth', { incorrect: true, username });
		req.session.authentified = true;
		req.session.user = username;
		res.redirect('/admin/pa');
	});
});


module.exports = router;