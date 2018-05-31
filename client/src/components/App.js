import React, {Component} from 'react';
import Content from './Content';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './Nav';
import Poll from './Poll';
import NewPoll from './NewPoll'; 
import MyPolls from './MyPolls';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthed: false,
			user: null,
			token: ''
		}
	}
	handleFail = (err) => {
		alert(err);
	}
	handleSuccess = (res) => {
		const token = res.headers.get('x-auth-token');
		res.json().then(user => {
			if(token) {
				localStorage.setItem('authData', JSON.stringify({isAuthed: true, user: user, token: token}));
				this.setState({
					isAuthed: true,
					user: user,
					token: token
				})
			}
		})
	}
	logout = () => {
			localStorage.setItem('authData', JSON.stringify({isAuthed: false, user: {id: null}, token: ''}))
			//console.log(JSON.parse(localStorage['authData']));
			this.setState({
				isAuthed: false,
				user: null,
				token: ''
			})
	}
	componentDidMount() {
		typeof localStorage['authData'] !== 'undefined' ? this.setState(JSON.parse(localStorage['authData'])) : null;
	}

	render() {
		const isAuthed = this.state.isAuthed;
		const user = this.state.user;
		//console.log(this.state.user);
		return(
				<Router>
					<div className='container'>
						<Nav handleSuccess={this.handleSuccess} handleFail={this.handleFail} logout={this.logout} isAuthed={isAuthed} />
						<section className='hero is-light'>
							<div className='container'>
								<div className='hero-body'>
										<div className='columns'>
											<div className='column is-12 has-text-centered'>
												<Route exact path='/' component={Content}/>
												<Route path='/poll/:poll' component={Poll}/>
												<Route path='/newpoll' component={NewPoll}/>
												<Route path='/mypolls' component={MyPolls}/>
											</div>
										</div>
									</div>
							</div>
						</section>
					</div>
				</Router>
			)
	}
}
