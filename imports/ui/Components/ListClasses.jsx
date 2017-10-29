import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Collections
import { Classes } from '../../api/classes.js';

//Material-ui
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

// Classes component - represents a list of the course's classes
class ListClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classesSelected: [],
            classesNotSelected: []
        }
    }

    addNewItem(rowNumber) {
        let classesSelected = this.state.classesSelected;
        let classesNotSelected = this.state.classesNotSelected;

        if (classesSelected.includes(rowNumber)) {
            classesSelected.pop(rowNumber);
            classesNotSelected.push(rowNumber);
        }
        else {
            classesSelected.push(rowNumber);
            classesNotSelected.pop(rowNumber);
        }

        this.setState({ classesSelected: classesSelected, classesNotSelected: classesNotSelected });
    }

    calculate() {
        console.log('this.props no ListCLasses = ', this.props);
        console.log('classesSelected = ', this.state.classesSelected);
        let remaingClasses = [];
        let remaingHours = 0;
        let self = this;
        let course = this.props.course._id;

        //Save the id's of finished courses
        this.state.classesSelected.map((item, i) => {
            remaingClasses.push(self.props.classes[item]._id);
        });

        //Calculates the total of remaing hours
        this.state.classesNotSelected.map((item, i) => {
            remaingHours += item.hours;
        });

        let item = {
            course: course,
            name: 'Henrique Borges',
            remainingClasses: remaingClasses,
            remainingHours: remaingHours
        }

        Meteor.call('addNewRankingItem', item);
        this.props.history.push('/Ranking');
    }


    render() {
        let classes = this.props.classes;
        return (
            <div>
                {this.props.loading ?
                    <CircularProgress />
                    :
                    <div>
                        {this.props.calculate ?
                            <Table multiSelectable={true} onCellClick={(rowNumber) => this.addNewItem(rowNumber)}>
                                <TableHeader style={{ backgroundColor: '#0E6094' }}>
                                    <TableRow>
                                        <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Disciplina</TableHeaderColumn>
                                        <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Semestre</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {classes.map((item, i) => {
                                        return <TableRow>
                                            <TableRowColumn style={{ title: item.description }}>{item.name}</TableRowColumn>
                                            <TableRowColumn>{item.semester}º semestre</TableRowColumn>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                            :
                            <Table selectable={false}>
                                <TableHeader style={{ backgroundColor: '#0E6094' }}>
                                    <TableRow>
                                        <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Disciplina</TableHeaderColumn>
                                        <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Carga horária</TableHeaderColumn>
                                        <TableHeaderColumn style={{ color: 'white', fontWeight: 'bold' }}>Semestre</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {classes.map((item, i) => {
                                        return <TableRow>
                                            <TableRowColumn style={{ title: item.description }}>{item.name}</TableRowColumn>
                                            <TableRowColumn>{item.hours} horas</TableRowColumn>
                                            <TableRowColumn>{item.semester}º semestre</TableRowColumn>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        }
                        <RaisedButton
                            label="Calcular"
                            labelPosition="before"
                            containerElement="label"
                            buttonStyle={{ backgroundColor: '#ff7f00' }}
                            labelColor='white'
                            labelStyle={{ fontWeight: 'bold' }}
                            style={{ float: 'right', marginTop: '5%' }}
                            onClick={() => this.calculate()}
                        />
                        <RaisedButton
                            label='Voltar'
                            labelPosition="before"
                            containerElement="label"
                            buttonStyle={{ backgroundColor: '#ff7f00' }}
                            labelColor='white'
                            labelStyle={{ fontWeight: 'bold' }}
                            style={{ float: 'left', marginTop: '5%' }}
                            onClick={() => this.props.history.push('/')}
                        />
                    </div>
                }
            </div>

        );
    }
}

export default createContainer((props) => {
    let handleClasses = Meteor.subscribe('classes', props.course._id);
    let classes;

    if (handleClasses.ready())
        classes = Classes.find({ 'course_ids': props.course._id }).fetch();

    return {
        classes: classes,
        loading: !handleClasses.ready()
    };
}, ListClasses);