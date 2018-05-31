const express = require('express');
const router = express.Router();
const mongoose = require('../mongoose');
mongoose();
const passport = require('passport');
const passportConfig = require('../passport');
passportConfig();
const User = require('mongoose').model('User');
const request = require('request');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


const mongod = require('mongodb');
const dotenv = require('dotenv').config();
const ObjectId = mongod.ObjectId;
const mongo = mongod.MongoClient;
const mongoURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

const createToken = (auth) => {
	return jwt.sign({
		id: auth.id
	}, 'my-secret', {
		expiresIn: 60 * 120
	});
};
const generateToken = (req, res, next ) => {
	req.token = createToken(req.auth);
	return next();
}
const sendToken = (req, res) => {
	res.setHeader('x-auth-token', req.token);
	return res.status(200).send(JSON.stringify(req.user));
}
router.post('/polls', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);
		let query = {};
		collection.find(query).toArray((err, data) => {
			//populate list of polls with all created polls, or with the desired poll
			if (err) throw err;
			client.close();
			res.json(data);
			res.end();
		});
	});
});
router.post('/mypolls', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);
		let query = {'id': 'none'};
		req.body.id ? query = {'id': req.body.id} : null;

		collection.find(query).toArray((err, data) => {
			//populate list of polls with all created polls, or with the desired poll
			if (err) throw err;
			client.close();
			res.json(data);
			res.end();
		});
	});
});
router.get('/delete/:POLL_ID', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);
		const query = {_id: ObjectId(req.params.POLL_ID)};
		collection.deleteOne(query, (err, data) => {
			if (err) throw err;
			client.close();
			res.json(data);
			res.end();
		})
	})
});

router.get('/poll/:POLL_ID', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);
		const query = {_id: ObjectId(req.params.POLL_ID)};
		collection.findOne(query, (err, data) => {
			if (err) console.log(err);
			client.close();
			res.json(data);
			res.end();//
		})
	})
});
router.get('/vote/:POLL_ID/:VOTE_FOR', (req, res) => {
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
router.post('/newpoll', (req, res) => {
	mongo.connect(mongoURI, (err, client) => {
		if (err) throw err;
		const db = client.db(process.env.DB_NAME);
		const collection = db.collection(process.env.COLLECTION);

		//console.log(req.body);
		collection.insert({'id': req.body.id, 'email': req.body.email, 'poll': {'title': req.body.title, 'options': req.body.options}})
		client.close();
	})
});

router.post('/auth/twitter/reverse', (req, res) => {
	request.post({
		url: 'https://api.twitter.com/oauth/request_token',
		oauth: {
			oauth_callback: 'http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback',
			consumer_key: process.env.TWITTER_KEY,
			consumer_secret: process.env.TWITTER_SECRET
		}
	}, (err, r, body) => {
		if (err) return res.send(500, {message: err.message});
		const jsonStr = `{"${body.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
		res.send(JSON.parse(jsonStr));
		
	});
});
router.post('/auth/twitter', (req, res, next) => {
	request.post({
		url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
		oauth: {
			consumer_key: process.env.TWITTER_KEY,
			consumer_secret: process.env.TWITTER_SECRET,
			token: req.query.oauth_token
		},
		form: {oauth_verifier: req.query.oauth_verifier}
	}, (err, r, body) => {
		if (err) return res.send(500, {message: err.message});
		
		//console.log(body);
		const bodyString = `{"${body.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
		const parsedBody = JSON.parse(bodyString);
		req.body['oauth_token'] = parsedBody.oauth_token;
		req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
		req.body['user_id'] = parsedBody.user_id;

		next();
	});
}, passport.authenticate('twitter-token', {session: false}), (req, res, next) => {
	if (!req.user) return res.send(401, 'User Not Authenticated');
	req.auth = {
		id: req.user.id
	};
	return next();
}, generateToken, sendToken);
module.exports = router;