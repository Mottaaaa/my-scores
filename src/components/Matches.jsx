import React, { Component } from 'react';
import { DAO } from '../scripts/DAO';

class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rounds: [],
            childWindowUrl: 'http://localhost:8082/',
            childWindow: undefined
        };

        this.renderDataTable = this.renderDataTable.bind(this);
        this.openMatchWindow = this.openMatchWindow.bind(this);
        this.sendMatchInfo = this.sendMatchInfo.bind(this);
        this.onMessage = this.onMessage.bind(this);

    }

    openMatchWindow(event) {
        if (this.state.rounds !== undefined) {
            let windowTopCoord = 0;
            let topEdge = window.screenY;
            let rhsEdge = window.screenX + window.outerWidth;
            let win = window.open(this.state.childWindowUrl, "", "width=500, height=500" +
                ", top=" + (topEdge + windowTopCoord + 2) + ", left=" + (rhsEdge + 2));
            windowTopCoord += 250;
            this.setState({
                childWindow: win
            });
        }
    }

    componentDidMount() {
        DAO.load();
        if (DAO.isCompetitionRunning()) {
            this.setState({
                rounds: DAO.getMatches()
            });
        }
        window.addEventListener("message", this.onMessage, true);
    }

    renderDataTable() {
        if (this.state.rounds !== undefined) {
            return this.state.rounds.map((round, index) => {
                let roundIndex = (index + 1);
                return round.map((match, idx) => {
                    let { home, visitor, score } = match;
                    let matchName = `${home.name}-${visitor.name}`;
                    let keyIndex = [roundIndex - 1, idx];
                    let scoreStr = '';
                    if (score !== undefined) {
                        scoreStr = `${score[0]} - ${score[1]}`;
                    }
                    return (
                        <tr key={keyIndex}>
                            <td>{roundIndex}</td>
                            <td>{matchName}</td>
                            <td>{scoreStr}</td>
                            <td><input type='button' onClick={this.sendMatchInfo} value={keyIndex} style={{color: 'buttonFace', cursor: 'pointer'}}/></td>
                        </tr>
                    )
                });
            });
        }
    }

    sendMatchInfo(event) {
        if (this.state.rounds !== undefined) {
            let data = event.target.value;
            data = data.split(',');
            data[0] = parseInt(data[0]);
            data[1] = parseInt(data[1]);
            let round = this.state.rounds[data[0]];
            let match = round[data[1]];
            let matchName = `${match.home.name}-${match.visitor.name}`;
            let score = match.score;
            if (this.state.childWindow !== undefined) {
                this.state.childWindow.postMessage(JSON.stringify({matchName, score}), '*');
            }
        }
    }

    onMessage(event) {
        if (event.origin === "http://localhost:8082") {
            if (this.state.rounds !== undefined) {

                let result = JSON.parse(event.data);
                let {matchName, score} = result;
                this.state.rounds.map((round, index) => {
                    return round.map((match, index) => {
                        let name = `${match.home.name}-${match.visitor.name}`;
                        if (matchName === name) {
                            match.score = score;
                            DAO.finishMatch(match.round, match.home, match.visitor, match.score);
                            DAO.save();
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
                    <input type='button' onClick={this.openMatchWindow} />
                </div>
            </div>
        );
    }
}

export default Matches;