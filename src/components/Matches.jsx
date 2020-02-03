import React, { Component } from 'react';
import MatchData from './MatchData';
import { DAO } from '../scripts/DAO';

class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rounds: [],
            
        };

        this.renderDataTable = this.renderDataTable.bind(this);
    }



    componentDidMount() {
        DAO.load();
        if (DAO.isCompetitionRunning()) {
            this.setState({
                rounds: DAO.getMatches()
            });
        }

    }

    renderDataTable() {
        if (this.state.rounds !== undefined) {
            return this.state.rounds.map((round, index) => {
                let roundIndex = (index + 1);
                return round.map((match, index) => {
                    let { home, visitor} = match;
                    let matchName = `${home.name}-${visitor.name}`;
                    return (
                        <MatchData matchName={matchName} match={match} roundIndex={roundIndex} />
                    )
                });
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>Matches</h1>
                    </header>
                </div>
                <div>
                    <table id="matchesTable">
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Match</th>
                                <th>Score</th>
                                <th>Action</th>
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

export default Matches;