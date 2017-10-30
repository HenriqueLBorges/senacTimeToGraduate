import React, { Component, PropTypes } from 'react';

//Material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: -1,
      showCard: false,
      course: {},
      teste: true,
      coordinator: {}
    }
  }

  handleChange(index, course) {
    let professors = this.props.professors;
    let coordinator;
    professors.map((professor, i) => {
      if(professor._id == course.coordinator) coordinator = professor;
    })
    this.setState({ value: index, course: course, showCard: true, coordinator: coordinator});
    this.props.setCourse(course)
  }

  render() {
    let courses = this.props.graduationCourses;
    
    console.log('this.props no Home = ', this.props);
    return (
      <div style={{ backgroundColor: '#0E6094', boxShadow: '1px 1px 1px #888888' }}>
        {this.props.loading ?
          <CircularProgress />
          :
          <div>
            {!this.state.start ?
              <div style={{ textAlign: 'center' }}>
                <Paper zDepth={1} rounded={false}>
                  <img src="http://www.go.senac.br/portal/images/logo211x124.jpg" alt="Smiley face" />
                  <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Calculadora de Graduação</h1>
                  <RaisedButton
                    label="Sobre"
                    labelPosition="before"
                    containerElement="label"
                    style={{ marginBottom: '3.6%', marginRight: '10%' }}
                    buttonStyle={{ backgroundColor: '#ff7f00' }}
                    labelColor='white'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.props.history.push('/About/')}
                  />
                  <RaisedButton
                    label="Ranking"
                    labelPosition="before"
                    containerElement="label"
                    style={{ marginBottom: '3.6%'}}
                    buttonStyle={{ backgroundColor: '#ff7f00' }}
                    labelColor='white'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.props.history.push('/Ranking/')}
                  />
                  <RaisedButton
                    label="Começar"
                    labelPosition="before"
                    containerElement="label"
                    style={{ marginBottom: '3.6%', marginLeft: '10%' }}
                    buttonStyle={{ backgroundColor: '#ff7f00' }}
                    labelColor='white'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.setState({ start: !this.state.start })}
                  />
                </Paper>
              </div>
              :
              <div style={{ textAlign: 'center' }}>
                <SelectField
                  floatingLabelText="Curso"
                  value={this.state.value}
                  labelStyle={{ color: 'white'}}
                  menuItemStyle={{ color: 'white'}}
                  listStyle={{ color: 'white', backgroundColor: '#ff7f00' }}
                  style={{ textAlign: 'left' }}
                >
                  {courses.map((course, i) => {
                    return <MenuItem value={i} key={i} primaryText={course.name} onClick={() => this.handleChange(i, course)} />
                  })}
                </SelectField>
              </div>
            }

          </div>
        }
        {this.state.showCard ?
          <Card>
            <CardHeader
              title={'Coordenador'}
              subtitle={this.state.coordinator.name}
              avatar={this.state.coordinator.photo}
            />
            <CardTitle title={"Curso"} subtitle={this.state.course.name} />
            <CardText>
              {this.state.course.objective}
            </CardText>
            <CardActions>
              <RaisedButton
                label="Tempo restante de curso"
                labelPosition="before"
                containerElement="label"
                buttonStyle={{ backgroundColor: '#ff7f00' }}
                labelColor='white'
                labelStyle={{ fontWeight: 'bold' }}
                onClick={() => this.props.history.push('/CalculateTime/')}
              />
              <RaisedButton
                label='Matérias do curso'
                labelPosition="before"
                containerElement="label"
                buttonStyle={{ backgroundColor: '#ff7f00' }}
                labelColor='white'
                labelStyle={{ fontWeight: 'bold' }}
                onClick={() => this.props.history.push('/ListClasses/')}
              />
            </CardActions>
          </Card>
          : ''}
      </div>
    )
  }
}
export default Home;