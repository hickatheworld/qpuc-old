const { Router } = require('express');

const router = new Router();

router.get('/', function (req, res) {
	console.log(res.app.game.open);
	res.render('index', { gameOpen: res.app.game.open, pageTitle: 'Accueil' });
});

module.exports = router;