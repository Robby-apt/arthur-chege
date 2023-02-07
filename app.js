// setup
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const artwork = require('./media');
const port = process.env.port || 3000;

// app dependamcies
const appUsage = [
	bodyParser.urlencoded({ extended: true }),
	express.static(`public`),
];

app.use(appUsage);

app.set('view engine', 'ejs');

// nodemailer config
const transporter = nodemailer.createTransport({
	service: `hotmail`,
	auth: {
		user: process.env.SENDER,
		pass: process.env.PASSWORD,
	},
});

// home routes
app.get('/', (req, res) => {
	res.render('index');
});

// portfolio routes
app.get('/portfolio', (req, res) => {
	res.render('portfolio', { artwork: artwork });
});
// contact routes
app.get('/contact', (req, res) => {
	res.render('contact');
});

// // get contact form details
app.post('/contact', (req, res) => {
	const { name, email, subject, message } = req.body;

	const mailOptions = {
		from: process.env.SENDER,
		to: process.env.RECEIVER,
		subject: subject,
		text: `Hello, I am ${name}. My contact is ${email}. ${message}`,
	};

    transporter.sendMail(mailOptions,(err,info)=>{
        let output = err || info.response
        console.log(output);
    })
});

//
app.listen(port, () => {
	console.log(`Hello from port ${port}`);
});
