import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
	handleClick = () => {
		document.getElementById('burger').classList.toggle('is-active');
		document.getElementById('navMenu').classList.toggle('is-active');
		//toggle hamburger menu
	}
	render() {
		return(
			<div className='hero-head'>
				<nav className='navbar is-light'>
					<div className='navbar-brand'>
						<Link to='/' className='navbar-item'>fcc-voting</Link>
						<span id='burger' className="navbar-burger burger" onClick={this.handleClick}>
		          <span></span>
		          <span></span>
		          <span></span>
						</span>
					</div>
					<div id='navMenu' className='navbar-menu'>
						<div className='navbar-end'>
							<Link to='/' className='navbar-item'>Home</Link>
							<Link to='/newpoll' className='navbar-item'>New Poll</Link>
						</div>
					</div>
				</nav>
				</div>
			)
	}
}