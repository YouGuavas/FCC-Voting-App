import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
	render() {
		return(
				<nav>
					<div>
						<div>
								FCC Voting App
						</div>
						<div />
					</div>
					<div>
						<div pullRight>
							<Link to='/'>
								<div eventKey={1}>
									Home
								</div>
								</Link>
							<div eventKey={2}>
								<div bsStyle='primary' block>
									Sign in with Twitter
								</div>
							</div>
						</div>
					</div>
				</nav>
			)
	}
}