import React, {Component} from 'react';
import Polls from './Polls';

export default class Content extends Component {
	render() { 
		return(
			<div className='container jumbotron'>
				<div className='columns'>
					<div className='column is-12 has-text-centered'>
						<h1>FCC Voting</h1>
						<p>Here are a few polls you may choose to vote on.</p>
						<p>You may also sign in to create a poll of your own!</p>
						<Polls/>
					</div>
				</div>
			</div>
			)
	}
}