import React, {Component} from 'react';
import Content from './Content';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './Nav';
import Poll from './Poll';
import NewPoll from './NewPoll'; 

export default class App extends Component {
	render() {
		return(
				<Router>
					<div className='container'>
						<Nav/>
						<section className='hero is-light'>
							<div className='container'>
								<div className='hero-body'>
										<div className='columns'>
											<div className='column is-12 has-text-centered'>
												<Route exact path='/' component={Content}/>
												<Route path='/polls/:poll' render={props => (
													<Poll {...props}/>
													)}/>
												<Route path='/newpoll' component={NewPoll}/>
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
