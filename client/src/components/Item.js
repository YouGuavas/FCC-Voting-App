import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Item extends Component {
	render() {
		return(
			<Link to={{pathname:`/poll/${this.props.url}`, state:{id: this.props.url, options: this.props.options, title: this.props.title}}}>
				<div className='level'>
					<div className='level-item'>
						{this.props.title}
					</div>
				</div>
			</Link>
			)
	}
}