import React, { Component, PropTypes } from 'react';

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
                <br/><a href="https://github.com/HenriqueLBorges">Github profile</a></p>
            </div>
        );
    }
}

export default About;