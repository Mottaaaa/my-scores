import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';
import { Table, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

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
                <Button color='primary' onClick={this.enrollTeams} >Save</Button>
            );
        }
    }

    hideAdd() {
        Controller.load();
        if (!Controller.isCompetitionRunning()) {
            return (
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for='teamName'>Team Name:</Label>
                            <Input name='teamName' id='teamName' type='text' value={this.state.teamName} onChange={this.handleChange}
                                placeholder='insert team name...' />
                        </FormGroup>
                        <Button style={{ marginRight: '1em' }} onClick={this.handleSubmit} color='primary'>Add Team</Button>
                        {this.hideSave()}
                    </Form>
                </Container>
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
            <Container>
                <Container>
                    <header>
                        <h1>Teams</h1>
                    </header>
                </Container>
                {this.hideAdd()}
                <Container>
                    <Table id="teamTable">
                        <thead>
                            <tr>
                                <th>Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        );
    }
}

export default Teams;