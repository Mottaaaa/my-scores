import React, { Component } from 'react';
import { DAO } from '../scripts/DAO';

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            teamName: '',
            competitionInUse: false
        };

        this.loadTeams = this.loadTeams.bind(this);
        this.enrollTeams = this.enrollTeams.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isCompetitionRunning = this.isCompetitionRunning.bind(this);
    }

    componentDidMount() {
        DAO.load();
        this.loadTeams();
    }

    isCompetitionRunning() {
        DAO.load();
        if (!DAO.isCompetitionRunning()) {
            return (
                <input type='button' onClick={this.enrollTeams} value='Save' />
            );
        }
    }

    loadTeams() {
        this.setState({
            teams: DAO.getTeams() || []
        });
    }

    renderTableData() {
        if (this.state.teams !== undefined) {
            return this.state.teams.map((team, index) => {
                const { name } = team;
                return (
                    <tr key={name}>
                        <td>{name}</td>
                    </tr>
                )
            });
        }
    }

    handleChange(event) {
        this.setState({
            teamName: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let teams = this.state.teams;
        let team = {
            name: this.state.teamName
        };
        if (!teams.some(t => t.name === team.name) && team.name !== '') {
            teams.push(team);
            this.setState({
                teams
            });
        }
        DAO.save();
        this.setState({
            teamName: ''
        });
    }

    enrollTeams() {
        DAO.enrollTeams(this.state.teams);
        DAO.save();
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>Create a Team</h1>
                    </header>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>Team Name:</label>
                    <input name='teamName' id='teamName' type='text' value={this.state.teamName} onChange={this.handleChange} />
                    <input type='button' onClick={this.handleSubmit} value='Add Team' />
                </form>
                <div>
                    <table id="teamTable">
                        <thead>
                            <tr>
                                <th>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
                {this.isCompetitionRunning()}
            </div>
        );
    }
}

export default Teams;