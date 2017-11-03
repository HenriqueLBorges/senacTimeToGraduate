import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Collections
import { GraduationCourses } from '../api/graduation_courses.js';
import { Professors } from '../api/professors.js';

//Components
import Home from './Components/Home.jsx';
import About from './Components/About.jsx';
import ListClasses from './Components/ListClasses.jsx';
import RankingList from './Components/RankingList.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

//Material-ui
import { default as Theme } from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';

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

    handleClick() {
        Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
        });
    }
    render() {
        return (
            <Theme muiTheme={muiTheme}>
                <div className="container" style={{height: '100%'}}>
                    {this.props.currentUser ?
                        <Router>
                            <Switch>
                                <Route exact path='/'
                                    render={(props) =>
                                        <Home
                                            graduationCourses={this.props.graduationCourses}
                                            professors={this.props.professors}
                                            loading={this.props.loading}
                                            setCourse={this.setCourse.bind(this)}
                                            currentUser={this.props.currentUser}
                                            {...props} />
                                    }
                                />
                                <Route path='/ListClasses'
                                    render={(props) =>
                                        <ListClasses
                                            calculate={false}
                                            course={this.state.course}
                                            loading={this.props.loading}
                                            currentUser={this.props.currentUser}
                                            {...props} />
                                    }
                                />
                                <Route path='/CalculateTime'
                                    render={(props) =>
                                        <ListClasses
                                            calculate={true}
                                            course={this.state.course}
                                            loading={this.props.loading}
                                            currentUser={this.props.currentUser}
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
                        :
                        <Home
                            graduationCourses={this.props.graduationCourses}
                            professors={this.props.professors}
                            loading={this.props.loading}
                            setCourse={this.setCourse.bind(this)}
                            currentUser={this.props.currentUser}
                        />
                    }
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
        loading: !handleGraduationCourses.ready() && !handleProfessors.ready(),
        currentUser: Meteor.user()
    }
}, App);