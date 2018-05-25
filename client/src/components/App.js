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
				this.setState({
					isAuthed: true,
					user: user,
					token: token
				})
			}
		})
	}
	logout = () => {
		this.setState({
			isAuthed: false,
			user: null,
			token: ''
		})
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
												<Route path='/polls/:poll' render={props => (
													<Poll {...props} user={user}/>
													)}/>
												<Route path='/newpoll' render={props => (
													<NewPoll {...props} user={user} />
													)}/>
												<Route path='/mypolls' render={props => (
													<MyPolls {...props} user={user} />
													)}/>
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
