import React, { Component } from 'react';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import logo from '../images/favicon.ico';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Teams from './Teams';
import Matches from './Matches';
import { Controller } from '../scripts/Controller';
import Scoreboard from './Scoreboard';

class NavBar extends Component {

    componentDidMount() {
        if (!Controller.competitionExists()) {
            Controller.createCompetition('');
        }
    }

    render() {
        return (
            <Container>
                <Navbar light expand="md">
                    <NavbarBrand href="/Home"><img src={logo} alt='My Score logo' style={{height: '64px', width: '64px', borderRadius:'20px'}}></img></NavbarBrand>
                    <Nav className="mr-auto" pills>
                        <NavItem>
                            <NavLink href="/Home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Teams">Teams</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Scoreboard">Scoreboard</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/Matches">Matches</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
                
                <Container className="row d-flex justify-content-center">
                    <Container>
                        <Router>
                            <Switch>
                                <Route path='/Home'>
                                    <Home />
                                </Route>
                                <Route path='/Teams'>
                                    <Teams />
                                </Route>
                                <Route path='/Scoreboard'>
                                    <Scoreboard />
                                </Route>
                                <Route path='/Matches'>
                                    <Matches />
                                </Route>
                                <Route path='/'>
                                    <Home />
                                </Route>
                            </Switch>
                        </Router>
                    </Container>
                </Container>
            </Container>
        );
    }
}

export default NavBar;