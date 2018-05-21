import React, {Component} from 'react';
import {getPollsData} from '../utils/api';
import {Link} from 'react-router-dom';

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
				{polls.map((poll, index) => (<Item title={poll.poll.title} url={poll._id} options={poll.poll.options} key={index}/>))}
			</div>
			)
	}
}

class Item extends Component {
	render() {
		return(
			<Link to={{pathname:`/polls/${this.props.url}`, state:{id: this.props.url, options: this.props.options, title: this.props.title}}}>
				<div className='level'>
					<div className='level-item'>
						{this.props.title}
					</div>
				</div>
			</Link>
			)
	}
}