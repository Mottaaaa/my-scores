import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';

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
        this.hideSave = this.hideSave.bind(this);
        this.hideAdd = this.hideAdd.bind(this);
    }

    componentDidMount() {
        Controller.load();
        this.loadTeams();
    }

    hideSave() {
        Controller.load();
        if (!Controller.isCompetitionRunning()) {
            return (
                <input type='button' onClick={this.enrollTeams} value='Save' />
            );
        }
    }

    hideAdd() {
        Controller.load();
        if (!Controller.isCompetitionRunning()) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Team Name:</label>
                    <input name='teamName' id='teamName' type='text' value={this.state.teamName} onChange={this.handleChange} />
                    <input type='button' onClick={this.handleSubmit} value='Add Team' />
                </form>
            );
        }
    }

    loadTeams() {
        let teams = Controller.getTeams();
        this.setState({
            teams: teams || []
        });
    }

    renderTableData() {
        if (this.state.teams !== undefined) {
            return this.state.teams.map((team, index) => {
                const { id, name } = team;
                return (
                    <tr key={id}>
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
        this.setState({
            teamName: ''
        });
    }

    enrollTeams() {
        Controller.enrollTeams(this.state.teams);
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>Teams</h1>
                    </header>
                </div>
                {this.hideAdd()}
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
                {this.hideSave()}
            </div>
        );
    }
}

export default Teams;