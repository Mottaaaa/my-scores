import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Teams extends Component {
    render() {
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <th>Name</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Equipa1</td>
                                <td>Apagar</td>
                            </tr>
                            <tr>
                                <td>Equipa2</td>
                                <td>Apagar</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link to='/Teams/CreateTeam'>Create Team</Link>
            </div>
        );
    }
}

export default Teams;