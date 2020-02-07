import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';
import { Table, Button, Container } from 'reactstrap';

class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            matchWeeks: [],
            childWindowUrl: 'http://localhost:8082/',
            childWindow: undefined
        };

        this.renderDataTable = this.renderDataTable.bind(this);
        this.openMatchWindow = this.openMatchWindow.bind(this);
        this.sendMatchInfo = this.sendMatchInfo.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.searchMatch = this.searchMatch.bind(this);
    }

    openMatchWindow(event) {
        if (this.state.matchWeeks !== undefined) {
            let windowTopCoord = 0;
            let topEdge = window.screenY;
            let rhsEdge = window.screenX + window.outerWidth;
            let win = window.open(this.state.childWindowUrl, "", "width=800, height=300" +
                ", top=" + (topEdge + windowTopCoord + 2) + ", left=" + (rhsEdge + 2));
            windowTopCoord += 250;
            this.setState({
                childWindow: win
            });
        }
    }

    componentDidMount() {
        Controller.load();
        if (Controller.isCompetitionRunning()) {
            this.setState({
                matchWeeks: Controller.getMatchWeeks()
            });
        }
        window.addEventListener("message", this.onMessage, true);
    }

    renderDataTable() {
        if (this.state.matchWeeks !== undefined) {
            return this.state.matchWeeks.map((matchWeek, index) => {
                return matchWeek.matches.map((match, idx) => {
                    let { id, homeTeam, visitorTeam, result } = match;
                    let matchName = `${homeTeam.name}-${visitorTeam.name}`;
                    let scoreStr = '';
                    if (result !== undefined) {
                        scoreStr = `${result[0]} - ${result[1]}`;
                    }
                    return (
                        <tr key={id}>
                            <td>{matchWeek.matchWeekNumber}</td>
                            <td>{matchName}</td>
                            <td>{scoreStr}</td>
                            <td><Button onClick={this.sendMatchInfo} color='info' value={[index, idx]}>Send Data</Button></td>
                        </tr>
                    )
                });
            });
        }
    }

    sendMatchInfo(event) {
        if (this.state.matchWeeks !== undefined) {
            let indexes = event.target.value;
            indexes = indexes.split(',');
            let match = this.searchMatch(indexes);
            let matchID = match.id;
            let matchName = `${match.homeTeam.name}-${match.visitorTeam.name}`;
            let score = match.result;
            if (this.state.childWindow !== undefined) {
                this.state.childWindow.postMessage(JSON.stringify({ matchID, matchName, score }), '*');
            }
        }
    }

    searchMatch(indexes) {
        if (this.state.matchWeeks !== undefined) {
            return this.state.matchWeeks[indexes[0]].matches[indexes[1]];
        }
    }

    searchMatchByID(matchID) {
        if (this.state.matchWeeks !== undefined) {
            return this.state.matchWeeks.some(matchWeek => {
                return matchWeek.matches.some(match => match.id === matchID);
            });
        }
    }

    onMessage(event) {
        if (event.origin === "http://localhost:8082") {
            if (this.state.matchWeeks !== undefined) {
                let result = JSON.parse(event.data);
                let { matchID, matchName, score } = result;
                score[0] = parseInt(score[0]);
                score[1] = parseInt(score[1]);
                this.state.matchWeeks.map((matchWeek, index) => {
                    return matchWeek.matches.map((match, index) => {
                        if (match.id === matchID) {
                            match.result = score;
                            Controller.finishMatch(matchWeek.matchWeekNumber, match.homeTeam, match.visitorTeam, match.result);
                            this.setState({
                            });
                        }
                        return true;
                    });
                });
            }
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
                <Container>
                    <Button onClick={this.openMatchWindow} color='primary' >Open Match Registration Window</Button>
                    <Table id="matchesTable">
                        <thead>
                            <tr>
                                <th>Matchweek</th>
                                <th>Match</th>
                                <th>Score</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDataTable()}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Matches;