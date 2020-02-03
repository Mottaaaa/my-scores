import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Teams from './Teams';

class NavBar extends Component {

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
                        <Home></Home>
                    </Route>
                    <Route path='/Teams'>
                        <Teams></Teams>
                    </Route>
                    <Route path='/Scoreboard'>

                    </Route>

                    <Route path='/Matches'>
                        
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default NavBar;