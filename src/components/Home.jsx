import React, { Component } from 'react';
import { Controller } from '../scripts/Controller';
import { Button, Form, FormGroup, Label, Input, Container, ButtonGroup } from 'reactstrap';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            competitionName: ''
        };

        this.fileUpload = this.fileUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.competitionExists = this.competitionExists.bind(this);
        this.edit = this.edit.bind(this);
        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);
    }

    state = {
        selectedFile: null
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

    fileUpload(event) {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
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

        Controller.saveImage(this.state.selectedFile);
    }

    handleChange(event) {
        this.setState({
            competitionName: event.target.value
        });
    }

    componentDidMount() {
        Controller.load();
        let competitionName = Controller.getCompetitionName();
        let competitionImage = Controller.loadImage();
        this.setState({
            competitionName: competitionName || '',
            selectedFile: competitionImage
        });
    }

    competitionExists() {
        let competitionName = Controller.getCompetitionName();
        if (competitionName !== undefined && competitionName !== '') {
            return (
                <Container>
                    {(this.state.selectedFile ? <img src={URL.createObjectURL(this.state.selectedFile)} height='20%' width='20%' max-height='120px'
                        min-height='30px' max-width='120px' min-width='30px' alt="Generic placeholder image" /> : "")}
                    < br />
                    <h2>{this.state.competitionName}</h2>
                    <br />
                    <ButtonGroup size='lg'>
                        <Button color='primary' onClick={this.start} >Start</Button>
                        <Button color='primary' onClick={this.edit} >Edit</Button>
                        <Button color='primary' onClick={this.reset} >Reset</Button>
                    </ButtonGroup>
                </Container>
            );
        } else {
            return (
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="competitionName">Competition Name:</Label>
                        <Input type="text" name="competitionName" id='competitionName' placeholder="insert a competition name..." onChange={this.handleChange} value={this.state.competitionName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='file'>File:</Label>
                        <Input type="file" name="file" id='file' accept="image/png, image/jpeg" onChange={this.fileUpload} />
                    </FormGroup>
                    <Button color='primary' size='lg' onClick={this.handleSubmit}>Save</Button>
                </Form>
            );
        }
    }

    render() {
        return (
            <Container style={{textAlign: 'center'}}>
                <Container fluid>
                    <h1>Welcome to My Scores</h1>
                    <p className="lead">Your personal score manager!</p>
                </Container>
                <Container fluid>
                    {this.competitionExists()}
                </Container>
            </Container>
        );
    }
}

export default Home;