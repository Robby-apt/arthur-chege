// setup
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const artwork = require('./media');
const port = process.env.port || 3000;

// app dependamcies
const appUsage = [
	bodyParser.urlencoded({ extended: true }),
	express.static(`public`),
];

app.use(appUsage);

app.set('view engine', 'ejs');

// home routes
app.get('/', (req, res) => {
	res.render('index');
});

// portfolio routes
app.get('/portfolio', (req, res) => {
	res.render('portfolio');
});

// contact routes
app.get('/contact', (req, res) => {
	res.render('contact');
});

//
app.listen(port, () => {
	console.log(`Hello from port ${port}`);
});
