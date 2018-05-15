import React, {Component} from 'react';
import * as RBS from 'react-bootstrap';

export default class Header extends Component {
	render() {
		return(
				<RBS.Navbar>
					<RBS.Navbar.Header>
						<RBS.Navbar.Brand>
							FCC Voting App
						</RBS.Navbar.Brand>
						<RBS.Navbar.Toggle />
					</RBS.Navbar.Header>
					<RBS.Navbar.Collapse>
						<RBS.Nav pullRight>
							<RBS.NavItem eventKey={1} href="#">
								Home
							</RBS.NavItem>
							<RBS.NavItem eventKey={2}>
								<RBS.Button bsStyle='primary' block>
									Sign in with Twitter
								</RBS.Button>
							</RBS.NavItem>
						</RBS.Nav>
					</RBS.Navbar.Collapse>
				</RBS.Navbar>
			)
	}
}