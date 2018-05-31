import React, {Component} from 'react';
import {getMyPollsData} from '../utils/api';
import Item from './Item';

export default class MyPolls extends Component {
	constructor() {
		super();
		this.state = {polls: []};
	}
	getPolls = () => {
		console.log(JSON.parse(localStorage['authData']))
		getMyPollsData(JSON.parse(localStorage['authData']).user).then(polls => {
			//return vote data, then update state
			this.setState({polls});
		});
	}
	componentDidMount() {
		this.getPolls();
	}
	render() {
		//console.log(this.props.user);
		const {polls} = this.state;
		return(
		 <div>
		 		<h1 className='title'>Your Polls</h1>
				<p>These are polls you have created!</p>
			<div className='polls'>
				{polls.map((poll, index) => (<Item title={poll.poll.title} id={poll.id} url={poll._id} options={poll.poll.options} key={index}/>))}
			</div>
		</div>
		)
	}
}