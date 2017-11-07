import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Radium, { Style } from 'radium';

//Components
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';
import About from './About.jsx';

//Material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const web = '@media(min-width: 992px)';

class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: -1,
            course: {},
            coordinator: {}
        }
    }

    handleChange(index, course) {
        let professors = this.props.professors;
        let coordinator;
        professors.map((professor, i) => {
            if (professor._id == course.coordinator) coordinator = professor;
        })
        this.setState({ value: index, course: course, showCard: true, coordinator: coordinator });
        this.props.setCourse(course)
    }


    render() {
        let courses = this.props.graduationCourses;
        return (
            <div style={{ backgroundColor: '#0E6094'}}>
                {this.props.loading ?
                    <CircularProgress />
                    :
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <SelectField
                                floatingLabelText="Curso"
                                value={this.state.value}
                                labelStyle={{ color: '#ffffff' }}
                                menuItemStyle={{ color: '#ffffff' }}
                                listStyle={{ color: '#ffffff', backgroundColor: '#ff7f00' }}
                                style={{ textAlign: 'left' }}
                            >
                                {courses.map((course, i) => {
                                    return <MenuItem value={i} key={i} primaryText={course.name} onClick={() => this.handleChange(i, course)} />
                                })}
                            </SelectField>
                        </div>
                        <Card style={{ height: '88%' }}>
                            <CardHeader
                                title={'Coordenador'}
                                subtitle={this.state.coordinator.name}
                                avatar={this.state.coordinator.photo}
                            />
                            <CardTitle title={"Curso"} subtitle={this.state.course.name} />
                            <CardText>
                                {this.state.course.objective}
                            </CardText>
                            <CardActions style={{ position: 'absolute', bottom: '0px' }}>
                                <RaisedButton
                                    label="Calcular progresso"
                                    labelPosition="before"
                                    containerElement="label"
                                    buttonStyle={this.props.currentUser ? { backgroundColor: '#ff7f00' } : { backgroundColor: 'gray' }}
                                    labelColor={'#ffffff'}
                                    labelStyle={{ fontWeight: 'bold' }}
                                    onClick={() => this.props.currentUser ? this.props.history.push('/CalculateTime/') : ''}
                                    disabled={!this.props.currentUser}
                                />
                                <RaisedButton
                                    label="Ranking"
                                    labelPosition="before"
                                    containerElement="label"
                                    style={{ marginBottom: '1.5%' }}
                                    buttonStyle={this.props.currentUser ? { backgroundColor: '#ff7f00' } : { backgroundColor: 'gray' }}
                                    labelColor='#ffffff'
                                    labelStyle={{ fontWeight: 'bold' }}
                                    onClick={() => this.props.history.push('/Ranking/')}
                                    disabled={!this.props.currentUser}
                                />
                                <RaisedButton
                                    label='Matérias do curso'
                                    labelPosition="before"
                                    containerElement="label"
                                    backgroundColor={'#ff7f00'}
                                    labelColor='#ffffff'
                                    disabledBackgroundColor={'gray'}
                                    disabledLabelColor={'black'}
                                    labelStyle={{ fontWeight: 'bold' }}
                                    onClick={() => this.props.currentUser ? this.props.history.push('/ListClasses/') : ''}
                                    disabled={!this.props.currentUser}
                                />
                            </CardActions>
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

export default Radium(Courses);