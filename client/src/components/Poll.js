import React, {Component} from 'react';

export default class Poll extends Component {
	render() {
		const data = this.props.location.state;
		return(
			<div>
				<h2 className='title'>
					{data.title}
				</h2>
				<select>
					{Object.keys(data.options).map(key=><option>{key}</option>)}
				</select>
				<p>
					{Object.keys(data.options).map(key => (<div>{`${key}: ${data.key}`}</div>))}
				</p>
			</div>
			)
	}
}