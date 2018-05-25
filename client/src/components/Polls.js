import React, {Component} from 'react';
import {getPollsData} from '../utils/api';
import Item from './Item';

export default class Polls extends Component {
	constructor() {
		super();
		this.state = {polls: []};
	}
	getPolls = () => {
		getPollsData().then(polls => {
			//return vote data, then update state
			this.setState({polls});
		});
	}
	componentDidMount() {
		this.getPolls();
	}
	render() {
		const {polls} = this.state;
		return(
			<div className='polls'>
				{polls.map((poll, index) => (<Item title={poll.poll.title} id={poll.id} url={poll._id} options={poll.poll.options} key={index}/>))}
			</div>
			)
	}
}