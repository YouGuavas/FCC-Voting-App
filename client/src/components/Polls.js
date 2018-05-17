import React, {Component} from 'react';
import {getPollData} from '../utils/api';

export default class Polls extends Component {
	constructor() {
		super();
		this.state = {polls: []};
	}
	getPolls = () => {
		getPollData().then(polls => {
			this.setState({polls});
		})
	}
	componentDidMount() {
		this.getPolls();
	}
	render() {
		const {polls} = this.state;
		return(
			<div className='polls'>
				{polls.map((poll, index) => (<Poll title={poll.title} key={index}/>))}
			</div>
			)
	}
}

class Poll extends Component {
	render() {
		return(
			<div className='level'>
				<div className='level-item'>
					{this.props.title}
					</div>
			</div>
			)
	}
}