require('dotenv').config({ path: '../.env' });
const http = require('http');
const session = require('express-session');
const express = require('express');
const socket = require('./socket');
const { execSync } = require('child_process');

console.log('== Compiling sass files before launching server ==')
execSync('npx node-sass ./sass -o ../public/stylesheets --output-style compressed', { stdio: 'inherit' });
console.log('== Compilation complete ==')

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.set('trust proxy', 1);
app.use(express.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('../public/'))

app.use('/', require('./routes/index.js'));
app.use('/admin', require('./routes/admin.js'));

const server = http.createServer(app);
app.io = socket(server, app);
app.game = {
	open: false
};

const port = parseInt(process.env.PORT) || 3000;
server.listen(process.env.PORT, function () {
	console.log(`Server listening on :${port}`);
});