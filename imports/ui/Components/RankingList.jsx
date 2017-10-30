import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Collections
import { Ranking } from '../../api/ranking.js';
import { GraduationCourses } from '../../api/graduation_courses.js';

//Material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// About component - About page
class RankingList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let ranking = this.props.ranking;
        return (
            <div>
                {this.props.loading ?
                    <CircularProgress />
                    :
                    <Table selectable={false}>
                        <TableHeader style={{ backgroundColor: '#0E6094' }}>
                            <TableRow>
                                <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Alunos</TableHeaderColumn>
                                <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Matérias restantes</TableHeaderColumn>
                                <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Horas restantes</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ranking.map((student, i) => {
                                return <TableRow rowNumber={i + 1}>
                                    <TableRowColumn>{student.name}</TableRowColumn>
                                    <TableRowColumn>{student.remainingClasses.length} matérias</TableRowColumn>
                                    <TableRowColumn>{student.remainingHours} horas</TableRowColumn>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                }
            </div>
        );
    }
}

export default createContainer((props) => {
    let handleRanking = Meteor.subscribe("ranking", props.course._id);
    let ranking;
    let handleGraduationCourses = Meteor.subscribe("graduation_courses");
    let graduationCourse;

    if (handleRanking.ready()) {
        ranking = Ranking.find({}).fetch();

        if (handleGraduationCourses.ready()) {
            ranking.map((item, i) => {
                ranking.course = GraduationCourses.findOne({});
            });
        }
    }


    return {
        ranking: ranking,
        loading: !handleRanking.ready()
    }
}, RankingList);