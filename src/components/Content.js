import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';

export default class Content extends Component {
	render() { 
		return(
			<Jumbotron>
				<h1>FCC Voting</h1>
				<p>Here are a few polls you may choose to vote on.</p>
				<p>You may also sign in to create a poll of your own!</p>
			</Jumbotron>
			)
	}
}