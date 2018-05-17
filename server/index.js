const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 3333;
const environment = process.env.NODE_ENV || 'dev';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const authCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://youguavas.auth0.com/.well-known/jwks.json'
	}),
	audience: '',
	issuer: 'youguavas.auth0.com'
});
app.get('/api/polls', (req, res) => {
	let polls = [
		{
			title: 'Jefferson v Jackson',
			options: {
				Jefferson: 0,
				Jackson: 0
			},
			url: '1'
		},
		{
			title: 'Pizza v Tacos',
			options: {
				Pizza: 0,
				Tacos: 0
			},
			url: '2'
		}
	];
	res.json(polls);
});

app.listen(port, () => {
	console.log(`Your app is now running on port: ${port}`);
})