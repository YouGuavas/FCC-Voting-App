import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthed: false,
			user: null,
			token: ''
		}
	}
	handleClick = () => {
		document.getElementById('burger').classList.toggle('is-active');
		document.getElementById('navMenu').classList.toggle('is-active');
		//toggle hamburger menu
	}
	handleClickItem = () => {
		console.log(document.getElementById('burger').classList);
		document.getElementById('burger').classList.contains('is-active') ? (console.log('hi'), document.getElementById('burger').classList.toggle('is-active')) : null;
		document.getElementById('navMenu').classList.contains('is-active') ? document.getElementById('navMenu').classList.toggle('is-active') : null;
	}
	handleFail = (err) => {
		this.props.handleFail(err);
	}
	handleSuccess = (res) => {
		this.props.handleSuccess(res);
	}
	logout = () => {
		this.props.logout();
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
							<Link to='/' onClick={this.handleClickItem} className='navbar-item'>Home</Link>
							{this.props.isAuthed === true ? <Link to='/newpoll' className='navbar-item'>New Poll</Link> : null}
							{this.props.isAuthed === true ?  <Link to='/mypolls' className='navbar-item'>My Polls</Link> : null}
							{this.props.isAuthed === true ? <Link to='/' className='navbar-item'>Logout</Link> : <TwitterLogin loginUrl='http://localhost:3333/api/auth/twitter' onFailure={this.handleFail} onSuccess={this.handleSuccess} requestTokenUrl='http://localhost:3333/api/auth/twitter/reverse' /> }
						</div>
					</div>
				</nav>
				</div>
			)
	}
}