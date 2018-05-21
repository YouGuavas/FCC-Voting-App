import React, {Component} from 'react';
import {newPoll} from '../utils/api';

export default class NewPoll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			options: []
		}
	}
	handleChange = e => {
		e.target.id === 'title' ? this.setState({title: e.target.value}) : this.setState({options: e.target.value.split('\n')})
	}
	handleClick = () => {
		let obj = {};
		this.state.options.map(item => {obj[item] = 0});
		newPoll(this.state.title, obj);
	}
	render() {
		return(
			<div>
				<div className='field'>
					<label className='label'>Title</label>
					<div className='control'>
						<input onChange={this.handleChange} id='title' className='input' type='text'/>
					</div>
				</div>

				<div className='field'>
					<label className='label'>Options(separated by lines)</label>
					<div className='control'>
						<textarea onChange={this.handleChange} id='options' className='textarea' />
					</div>
				</div>
				<button className='button is-primary' onClick={this.handleClick}>Create!</button>
			</div>
			)
	}
}