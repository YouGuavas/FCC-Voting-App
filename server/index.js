const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongod = require('mongodb');
const ObjectId = mongod.ObjectId;
const mongo = mongod.MongoClient;
const dotenv = require('dotenv').config();
const port = process.env.port || 3333;
const environment = process.env.NODE_ENV || 'dev';
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
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
	audience: 'https://youguavas.auth0.com/api/v2/',
	issuer: 'youguavas.auth0.com'
});
app.get('/api/polls', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);
		collection.find({}).toArray((err, data) => {
			//populate list of polls with all created polls
			if (err) throw err;
			client.close();
			res.json(data);
			res.end();
		});
	});
});
app.get('/api/vote/:POLL_ID/:VOTE_FOR', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if(err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);
		const update = `poll.options.${req.params.VOTE_FOR}`;
		collection.update({_id: ObjectId(req.params.POLL_ID)}, {$inc: {[update]: 1}}, (err, data) => {
			//increment appropriate value in matching poll
			if (err) throw err;
			client.close();
		})
	})
});
app.post('/api/newpoll', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);

		console.log(req.body);
		collection.insert({'poll': {'title': req.body.title, 'options': req.body.options}})
		client.close();
	})
})
app.listen(port, () => {
	console.log(`Your app is now running on port: ${port}`);
})