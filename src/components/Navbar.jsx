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
                        <Link to='/Competitions'>Competitions</Link>
                    </header>
                </div>
                <Switch>
                    <Route path='/Home'>
                        <Home></Home>
                    </Route>
                    <Route path='/Teams'>
                        <Teams></Teams>
                    </Route>
                    <Route path='/Competitions'>

                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default NavBar;