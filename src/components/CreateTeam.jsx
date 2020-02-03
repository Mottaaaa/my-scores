import React, { Component } from 'react';

class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    createTeam() {
        let name = document.getElementById('teamName').value;
        
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>Create a Team</h1>
                    </header>
                </div>
                <div>
                    <label for='teamName'>Team Name:</label>
                    <input name='teamName' id='teamName' type='text' placeholder='Please Enter Team Name' />
                    <input type='button' onClick={this.createTeam()} >Save</input>
                </div>
            </div>
        );
    }
}

export default CreateTeam;