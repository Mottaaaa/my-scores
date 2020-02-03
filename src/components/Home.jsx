import React, { Component } from 'react';
import { DAO } from '../scripts/DAO';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitionName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.competitionExists = this.competitionExists.bind(this);
        this.edit = this.edit.bind(this);
        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);
    }

    edit(event){
        DAO.resetName();
        this.setState({
            competitionName: this.state.competitionName
        });
    }

    start(event){
        DAO.initiateCompetition();
        this.setState({
            competitionName: this.state.competitionName
        });
    }

    reset(event){
        DAO.reset();
        this.setState({
            competitionName: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.competitionName !== undefined && this.state.competitionName !== '') {
            DAO.createCompetition(this.state.competitionName);
            DAO.save();
            this.setState({
                competitionName: DAO.getCompetition().name
            })
        }
    }

    handleChange(event) {
        this.setState({
            competitionName: event.target.value
        });
    }

    componentDidMount() {
        DAO.load();
        let competition = DAO.getCompetition();
        this.setState({
            competitionName: competition.name || ''
        });
    }

    competitionExists() {
        let competition = DAO.getCompetition();
        if (competition !== undefined && competition.name !== undefined && competition.name !== '') {
            return (
                <div>
                    <h2>{this.state.competitionName}</h2>
                    <input type='button' value='Start' onClick={this.start}/>
                    <input type='button' value='Edit' onClick={this.edit}/>
                    <input type='button' value='Reset' onClick={this.reset}/>
                </div>
            );
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Competition Name:</label>
                    <input type='text' value={this.state.competitionName} onChange={this.handleChange} />
                    <input type='button' value='Save' onClick={this.handleSubmit} />
                </form>
            );
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Welcome to My Scores</h1>
                    <h2>Your personal score manager!</h2>
                </header>
                <div>
                    {this.competitionExists()}
                </div>
            </div>
        );
    }
}

export default Home;