import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';
import { Table, Container } from 'reactstrap';

class Scoreboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitionName: ''
        }

        this.renderDataTable = this.renderDataTable.bind(this);
    }

    componentDidMount() {
        Controller.load();
        if (Controller.isCompetitionRunning()) {

            let classifications = Controller.getClassification();
            this.setState({
                competitionName: Controller.getCompetitionName(),
                scores: classifications
            });

            this.state.scores = classifications;
        }
    }

    renderDataTable() {
        if (this.state.scores !== undefined && this.state.scores.length > 0) {
            return this.state.scores.map((classification, index) => {
                let { team, matches, won, drawn, lost, goalsFor, goalsAgainst,
                    goalsDifference, points } = classification;
                let position = (index + 1);
                return (
                    <tr key={team} >
                        <td>{position}</td>
                        <td>{team}</td>
                        <td>{matches}</td>
                        <td>{won}</td>
                        <td>{drawn}</td>
                        <td>{lost}</td>
                        <td>{goalsFor}</td>
                        <td>{goalsAgainst}</td>
                        <td>{goalsDifference}</td>
                        <td>{points}</td>
                    </tr>
                );
            });
        }
    }

    render() {
        return (
            <Container>
                <Container>
                    <header>
                        <h1>{this.state.competitionName} Scoreboard</h1>
                    </header>
                </Container>
                <Container>
                    <Table id="scoreboard">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Team</th>
                                <th>Matches</th>
                                <th>Won</th>
                                <th>Drawn</th>
                                <th>Lost</th>
                                <th>Goals For</th>
                                <th>Goals Against</th>
                                <th>Goals Difference</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDataTable()}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        );
    }
}

export default Scoreboard;