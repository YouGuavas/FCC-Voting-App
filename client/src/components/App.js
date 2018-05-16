import React, {Component} from 'react';
import Content from './Content';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default class App extends Component {
	render() {
		return(
				<Router>
					<div className='hero-head'>
						<div className='container'>
							<nav className='nav'>
								<div className='nav-left'>
									<Link to='/' className='nav-item'>Test</Link>
								</div>
								<span className='nav-toggle'>
									<span></span>
									<span></span>
									<span></span>
								</span>
								<div className='nav-right'>
									<Link to='/' className='nav-item'>Home</Link>
								</div>
							</nav>
						</div>
						<Route exact path='/' component={Content}/>
					</div>
				</Router>
			)
	}
}
