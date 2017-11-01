import React, { Component, PropTypes } from 'react';

//Material-ui
import RaisedButton from 'material-ui/RaisedButton';

// About component - About page
class About extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <p>Aplicação feita com Meteor e React por Henrique Borges.
                <br /><a href="https://github.com/HenriqueLBorges">Github profile</a></p>
                <div>
                    <RaisedButton
                        label='Voltar'
                        labelPosition="before"
                        containerElement="label"
                        buttonStyle={{ backgroundColor: '#ff7f00' }}
                        labelColor='white'
                        labelStyle={{ fontWeight: 'bold' }}
                        style={{ float: 'left', marginTop: '5%' }}
                        onClick={() => this.props.back()}
                    />
                </div>
            </div>
        );
    }
}

export default About;