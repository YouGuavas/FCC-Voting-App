import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Item extends Component {
	handleClickItem = () => {
		document.getElementById('burger').classList.contains('is-active') ? (console.log('hi'), document.getElementById('burger').classList.toggle('is-active')) : null;
		document.getElementById('navMenu').classList.contains('is-active') ? document.getElementById('navMenu').classList.toggle('is-active') : null;
		//If the burger menu is active, turn it off on click of menu item
	}
	render() {
		return(
			<Link onClick={this.handleClickItem} to={{pathname:`/poll/${this.props.url}`, state:{id: this.props.url, options: this.props.options, title: this.props.title}}}>
				<div className='level'>
					<div className='level-item'>
						{this.props.title}
					</div>
				</div>
			</Link>
			)
	}
}