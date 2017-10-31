import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Collections
import { Classes } from '../../api/classes.js';

//Material-ui
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

// Classes component - represents a list of the course's classes
class ListClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classesSelected: [],
            classes: [],
            remaingClasses: [],
            remaingHours: 0,
            totalHours: 0,
            openDialog: false,
            percentage: 0.0
        }
    }

    addNewItem(rowNumber) {
        let classesSelected = this.state.classesSelected;

        if (classesSelected.includes(rowNumber))
            classesSelected.pop(rowNumber);
        else
            classesSelected.push(rowNumber);

        this.setState({ classesSelected: classesSelected });
    }

    calculate() {
        let remaingClasses = this.props.allClasses.filter(x => !~this.state.classesSelected.indexOf(x));
        let remaingClassesAux = [];
        let classes = [];
        let totalHours = 0;
        let remaingHours = 0;
        let self = this;
        let course = this.props.course._id;
        let semesters = [];
        let finishedSemesters = [];

        for (let i = 0; i < this.props.course.semesters; i++)
            semesters.push(false);

        //Saves the sum of classes hours
        this.props.classes.map((item, i) => {
            totalHours += item.hours;
        });

        //Saves the id's of finished courses 
        this.state.classesSelected.map((item, i) => {
            classes.push(self.props.classes[item]._id);
        });

        //Saves the id's of the remaining courses Calculates the total of remaing hours
        remaingClasses.map((item, i) => {
            semesters[self.props.classes[item].semester - 1] = true;
            remaingClassesAux.push(self.props.classes[item]._id);
            remaingHours += self.props.classes[item].hours;
        });

        //Saves finished semesters
        semesters.map((semester, i) => {
            if (!semester)
                finishedSemesters.push(1);
        });

        //Calculates the course conclusion percentage
        let concludedHours = totalHours - remaingHours;
        let percentage = ((concludedHours * 100) / totalHours);

        let item = {
            course: course,
            name: this.props.currentUser.profile.name,
            classes: classes,
            remainingClasses: remaingClassesAux,
            remainingHours: remaingHours,
            percentage: percentage.toFixed(1)
        }

        Meteor.call('addNewRankingItem', item);

        this.setState({ classes: classes, remaingClasses: remaingClasses, remaingHours: remaingHours, semesters: finishedSemesters.length, totalHours: totalHours, percentage: percentage }, () => {
            this.handleDialog();
        });
    }

    handleDialog() {
        this.setState({ openDialog: !this.state.openDialog });
    }

    render() {
        let classes = this.props.classes;
        return (
            <div>
                {this.props.loading ?
                    <CircularProgress />
                    :
                    <div style={{ maxHeight: "100%" }}>
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
                                        return <TableRow key={i} selected={this.state.classesSelected.indexOf(i) !== -1}>
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
                        <Dialog
                            title="Resultados"
                            modal={true}
                            open={this.state.openDialog}
                            contentStyle={{ height: "100%", maxHeight: "95%", width: "100%", maxWidth: "none" }}
                            onRequestClose={this.handleDialog}
                        >
                            <div style={{ height: '100%', width: '100%', margin: '20', textAlign: 'center', display: 'inline-block', }} zDepth={1}>
                                <div style={{textAlign: "center"}}>
                                    {(this.state.percentage).toFixed(1)}% concluído
                                    <LinearProgress style={{ marginTop: "2%" }} mode="determinate" color={'#0E6094'} value={this.state.percentage} />
                                </div>
                                <ul style={{ marginTop: "3%", textAlign: "left" }}>
                                    <li>Você passou em {this.state.classes.length} matéria(s) e ainda faltam {this.state.remaingClasses.length} matéria(s).</li>
                                    <li>Você concluiu {this.state.semesters} semestre(s) de um total de {this.props.course.semesters} semestre(s).</li>
                                    <li>Restam {this.state.remaingHours} horas para você concluir o curso.</li>
                                </ul>
                                "Keep moving foward! That's how winning is done!" - Rocky Balboa.

                                    <div style={{ marginTop: "3%" }}>
                                    <RaisedButton
                                        label="Ranking do curso"
                                        labelPosition="before"
                                        containerElement="label"
                                        buttonStyle={{ backgroundColor: '#ff7f00' }}
                                        labelColor='white'
                                        labelStyle={{ fontWeight: 'bold' }}
                                        style={{ float: 'right' }}
                                        onClick={() => this.props.history.push('/Ranking')}
                                    />,
                                    <RaisedButton
                                        label="Voltar"
                                        labelPosition="before"
                                        containerElement="label"
                                        buttonStyle={{ backgroundColor: '#ff7f00' }}
                                        labelColor='white'
                                        labelStyle={{ fontWeight: 'bold' }}
                                        style={{ float: 'left' }}
                                        onClick={() => this.props.history.push('/')}
                                    />
                                </div>
                            </div>
                        </Dialog>
                    </div>
                }
            </div>

        );
    }
}

export default createContainer((props) => {
    let handleClasses = Meteor.subscribe('classes', props.course._id);
    let classes;
    let allClasses = [];

    if (handleClasses.ready()) {
        classes = Classes.find({ 'course_ids': props.course._id }).fetch();
        classes.map((item, i) => {
            allClasses.push(i);
        })
        //console.log('classesNotSelected ', allClasses);
    }

    return {
        classes: classes,
        loading: !handleClasses.ready(),
        allClasses: allClasses
    };
}, ListClasses);