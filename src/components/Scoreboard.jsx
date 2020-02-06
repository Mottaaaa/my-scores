import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';

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

            this.sectionStyle = {
                border: '1px solid black',
                textAlign: 'center'
            };

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
                    <tr key={team} style={this.sectionStyle}>
                        <td style={this.sectionStyle}>{position}</td>
                        <td style={this.sectionStyle}>{team}</td>
                        <td style={this.sectionStyle}>{matches}</td>
                        <td style={this.sectionStyle}>{won}</td>
                        <td style={this.sectionStyle}>{drawn}</td>
                        <td style={this.sectionStyle}>{lost}</td>
                        <td style={this.sectionStyle}>{goalsFor}</td>
                        <td style={this.sectionStyle}>{goalsAgainst}</td>
                        <td style={this.sectionStyle}>{goalsDifference}</td>
                        <td style={this.sectionStyle}>{points}</td>
                    </tr>
                );
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>{this.state.competitionName} Scoreboard</h1>
                    </header>
                </div>
                <div>
                    <table id="scoreboard" style={this.sectionStyle}>
                        <thead>
                            <tr style={this.sectionStyle}>
                                <th style={this.sectionStyle}>Position</th>
                                <th style={this.sectionStyle}>Team</th>
                                <th style={this.sectionStyle}>Matches</th>
                                <th style={this.sectionStyle}>Won</th>
                                <th style={this.sectionStyle}>Drawn</th>
                                <th style={this.sectionStyle}>Lost</th>
                                <th style={this.sectionStyle}>Goals For</th>
                                <th style={this.sectionStyle}>Goals Against</th>
                                <th style={this.sectionStyle}>Goals Difference</th>
                                <th style={this.sectionStyle}>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Scoreboard;