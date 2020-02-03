import React, { Component } from 'react';
import { DAO } from '../scripts/DAO';

class MatchData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            childWindowUrl: 'http://localhost:8082/',
            childWindow: undefined
        };

        this.openMatchScore = this.openMatchScore.bind(this);
        this.onMessage = this.onMessage.bind(this);
        window.addEventListener("message", this.onMessage, true);
    }

    componentDidMount(){
        this.setState({
            match: this.props.match
        });
    }

    getScore() {
        let score = '';
        if (this.state.match.score !== undefined){
            score = `${this.state.match.score[0]} - ${this.state.match.score[1]}`;
        }
        return score;
    }

    onMessage(event) {
        if (event.origin === "http://localhost:8082") {
            if (this.state.match !== undefined) {
                let { matchName, score } = JSON.parse(event.data);
                let { home, visitor } = this.state.match;
                let name = `${home.name}-${visitor.name}`;
                if (matchName === name) {
                    let match = this.state.match;
                    match.score = score;
                    this.setState({
                        match: match
                    });
                    DAO.finishMatch(match.round, home, visitor, match.score);
                    DAO.save();
                    this.setState({
                        score: match.score
                    })
                }
            }
        }
    }

    openMatchScore(event) {
        if (this.state.match !== undefined) {
            let windowTopCoord = 0;
            let topEdge = window.screenY;
            let rhsEdge = window.screenX + window.outerWidth;
            console.log('vou abrir')
            let win = window.open(this.state.childWindowUrl, "", "width=300, height=150" +
                ", top=" + (topEdge + windowTopCoord + 2) + ", left=" + (rhsEdge + 2));
            windowTopCoord += 250;
            win.postMessage(this.props.matchName, '*');
            this.setState({
                childWindow: win
            });
        }
    }

    render() {
        return (
            <tr key={'R'+ this.props.roundIndex + ': '+this.props.matchName}>
                <td>{this.props.roundIndex}</td>
                <td>{this.props.matchName}</td>
                <td>{this.getScore()}</td>
                <td><input type='button' onClick={this.openMatchScore} value='Open'/></td>
            </tr>
        );
    }
}

export default MatchData;