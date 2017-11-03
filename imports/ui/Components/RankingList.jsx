import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

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
            ranking: [],
            loading: true
        }
    }

    componentDidMount() {
        let self = this;
        Meteor.call("getCourseRanking", this.props.course._id, function (error, success) {
            if (success) {
                success.sort((a, b) => a.record.percentage > b.record.percentage);
                console.log("success = ", success);
                self.setState({ ranking: success, loading: false })
            }
            else console.log("Error retrieving data");
        });
    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        Meteor.call("getCourseRanking", nextProps.course._id, function (error, success) {
            if (success) {
                success.sort((a, b) => a.record.percentage > b.record.percentage);
                console.log("success = ", success);
                self.setState({ ranking: success, loading: false })
            }
            else console.log("Error retrieving data");
        });
    }

    render() {
        let ranking = this.state.ranking;
        return (
            <div>
                {this.state.loading ?
                    <CircularProgress />
                    :
                    <Table selectable={false} adjustForCheckbox={false}>
                        <TableHeader displaySelectAll={false} style={{ backgroundColor: '#0E6094' }}>
                            <TableRow>
                                <TableHeaderColumn style={{ color: '#ffffff', fontWeight: 'bold' }}>Alunos</TableHeaderColumn>
                                <TableHeaderColumn style={{ color: '#ffffff', fontWeight: 'bold' }}>Matérias restantes</TableHeaderColumn>
                                <TableHeaderColumn style={{ color: '#ffffff', fontWeight: 'bold' }}>Porcentagem de conclusão do curso</TableHeaderColumn>
                                <TableHeaderColumn style={{ color: '#ffffff', fontWeight: 'bold' }}>Data do teste</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody stripedRows={true} displayRowCheckbox={false}>
                            {ranking.map((student, i) => {
                                return <TableRow key={i} rowNumber={i + 1}>
                                    <TableRowColumn>{student.user.profile.name}</TableRowColumn>
                                    <TableRowColumn>{student.record.remainingClasses.length} matérias</TableRowColumn>
                                    <TableRowColumn>{student.record.percentage}% concluído</TableRowColumn>
                                    <TableRowColumn>{student.record.date}</TableRowColumn>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                }
                <RaisedButton
                    label='Voltar'
                    labelPosition="before"
                    containerElement="label"
                    buttonStyle={{ backgroundColor: '#ff7f00' }}
                    labelColor='#ffffff'
                    labelStyle={{ fontWeight: 'bold' }}
                    style={{ float: 'left', marginTop: '5%' }}
                    onClick={() => this.props.history.push('/')}
                />
            </div>
        );
    }
}
export default RankingList;