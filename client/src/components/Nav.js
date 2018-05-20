import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
	render() {
		return(
			<div className='hero-head'>
				<nav className='navbar is-light'>
					<div className='navbar-brand'>
						<Link to='/' className='navbar-item'>Test</Link>
						<span className="navbar-burger burger" data-target="navMenu">
		          <span></span>
		          <span></span>
		          <span></span>
						</span>
					</div>
					<div id='navMenu' className='navbar-menu'>
						<div className='navbar-end'>
							<Link to='/' className={window.location.pathname === '/' ? 'navbar-item is-primary' : 'navbar-item'}>Home</Link>
						</div>
					</div>
				</nav>
				</div>
			)
	}
}