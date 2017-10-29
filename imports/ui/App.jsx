import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

//Collections
import { GraduationCourses } from '../api/graduation_courses.js';
import { Professors } from '../api/professors.js';

//Components
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import ListClasses from './Components/ListClasses.jsx';
import RankingList from './Components/RankingList.jsx';

//Material-ui
import { default as Theme } from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    slider: {
        trackColor: 'black',
        selectionColor: '#FF8C00'
    },
    palette: {
        primary1Color: '#FFCA43',
        accent1Color: '#FFA500',
        disabledColor: '#CCCCCC'
    },
    appBar: {
        height: 50,
    }
});

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {}
        }
    }

    setCourse(course) {
        this.setState({ course: course });
    }

    render() {
        return (
            <Theme muiTheme={muiTheme}>
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path='/'
                                render={(props) =>
                                    <Home
                                        graduationCourses={this.props.graduationCourses}
                                        professors={this.props.professors}
                                        loading={this.props.loading}
                                        setCourse={this.setCourse.bind(this)}
                                        {...props} />
                                }
                            />
                            <Route path='/About'
                                render={(props) =>
                                    <Home
                                        graduationCourses={this.props.graduationCourses}
                                        loading={this.props.loading}
                                        {...props} />
                                }
                            />
                            <Route path='/ListClasses'
                                render={(props) =>
                                    <ListClasses
                                        calculate={false}
                                        course={this.state.course}
                                        loading={this.props.loading}
                                        {...props} />
                                }
                            />
                            <Route path='/CalculateTime'
                                render={(props) =>
                                    <ListClasses
                                        calculate={true}
                                        course={this.state.course}
                                        loading={this.props.loading}
                                        {...props} />
                                }
                            />
                            <Route path='/Ranking'
                                render={(props) =>
                                    <RankingList
                                        course={this.state.course}
                                        {...props} />
                                }
                            />
                        </Switch>
                    </Router>
                </div>
            </Theme>
        );
    }
}

export default createContainer(() => {
    let handleGraduationCourses = Meteor.subscribe("graduation_courses");
    let graduationCourses;
    let handleProfessors = Meteor.subscribe("professors");
    let professors;

    if (handleGraduationCourses.ready())
        graduationCourses = GraduationCourses.find({}).fetch();

    if (handleProfessors.ready())
        professors = Professors.find({}).fetch();

    return {
        graduationCourses: graduationCourses,
        professors: professors,
        loading: !handleGraduationCourses.ready() && !handleProfessors.ready()
    }
}, App);