import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Teams from './Teams';
import Matches from './Matches';
import { DAO } from '../scripts/DAO';

class NavBar extends Component {

    componentDidMount() {
        if (DAO.getCompetition() === undefined) {
            DAO.createCompetition('');
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <header>
                        <Link to='/Home'>Home</Link>
                        <Link to='/Teams'>Teams</Link>
                        <Link to='/Scoreboard'>Scoreboard</Link>
                        <Link to='/Matches'>Matches</Link>
                    </header>
                </div>
                <Switch>
                    <Route path='/Home'>
                        <Home />
                    </Route>
                    <Route path='/Teams'>
                        <Teams />
                    </Route>
                    <Route path='/Scoreboard'>

                    </Route>

                    <Route path='/Matches'>
                        <Matches />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default NavBar;