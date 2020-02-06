import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';
import Button from 'react-bootstrap/Button';
import ButtonToolBar from 'react-bootstrap/ButtonToolbar';

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

    edit(event) {
        Controller.resetName();
        this.setState({
            competitionName: this.state.competitionName
        });
    }

    start(event) {
        Controller.initiateCompetition();
        this.setState({
            competitionName: this.state.competitionName
        });
    }

    reset(event) {
        Controller.reset();
        this.setState({
            competitionName: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.competitionName !== undefined && this.state.competitionName !== '') {
            Controller.createCompetition(this.state.competitionName);
            Controller.save();
            this.setState({
                competitionName: Controller.getCompetitionName()
            })
        }
    }

    handleChange(event) {
        this.setState({
            competitionName: event.target.value
        });
    }

    componentDidMount() {
        Controller.load();
        let competitionName = Controller.getCompetitionName();
        this.setState({
            competitionName: competitionName || ''
        });
    }
    /*
    <ButtonToolBar>
                        <Button variant='outline-primary' onClick={this.start} >Start</Button>
                    </ButtonToolBar>*/
    /*
        */

    competitionExists() {
        let competitionName = Controller.getCompetitionName();
        if (competitionName !== undefined && competitionName !== '') {
            return (
                <div class='container'>
                    <h2>{this.state.competitionName}</h2>
                    <input type='button' value='Start' onClick={this.start} />
                    <input type='button' value='Edit' onClick={this.edit} />
                    <input type='button' value='Reset' onClick={this.reset} />
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
            <div class='container'>
                <header>
                    <h1>Welcome to My Scores</h1>
                    <h2>Your personal score manager!</h2>
                </header>
                <div class='card'>
                    {this.competitionExists()}
                </div>
            </div>
        );
    }
}

export default Home;