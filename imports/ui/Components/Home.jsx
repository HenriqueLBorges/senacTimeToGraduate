import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

//Components
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

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
      if (professor._id == course.coordinator) coordinator = professor;
    })
    this.setState({ value: index, course: course, showCard: true, coordinator: coordinator });
    this.props.setCourse(course)
  }

  login() {
    const loginStyle = (Meteor.isCordova ? 'redirect' : 'popup');

    Meteor.loginWithFacebook({
      loginStyle: loginStyle,
      requestPermissions: []
    }, function (e) {

      if (e) console.log('Error at loginWithFacebook', e);
    })
  }

  logout() {
    let self = this;
    Meteor.logout(() => {
      console.log(self.props.router);
      self.props.history.push('/');
    });
  }

  render() {
    let courses = this.props.graduationCourses;

    console.log('this.props no Home = ', this.props);
    return (
      <div style={{ boxShadow: '1px 1px 1px #888888' }}>

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
                    style={{ marginBottom: '1.5%', marginRight: '10%' }}
                    buttonStyle={{ backgroundColor: '#ff7f00' }}
                    labelColor='white'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.props.history.push('/About/')}
                  />
                  <RaisedButton
                    label={this.props.currentUser ? "Logout" : "Entrar com Facebook"}
                    labelPosition="before"
                    containerElement="label"
                    style={{ marginBottom: '1.5%' }}
                    buttonStyle={{ backgroundColor: '#3b5998' }}
                    labelColor='white'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={this.props.currentUser ? () => this.logout() : () => this.login()}
                  />
                  <RaisedButton
                    label="Começar"
                    labelPosition="before"
                    containerElement="label"
                    style={{ marginBottom: '1.5%', marginLeft: '10%' }}
                    buttonStyle={this.props.currentUser ? { backgroundColor: '#ff7f00' } : { backgroundColor: 'gray' }}
                    labelColor='white'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.props.currentUser ? this.setState({ start: !this.state.start }) : ''}
                    disabled={!this.props.currentUser}
                  />
                </Paper>
              </div>
              :
              <div style={{ textAlign: 'center' }}>
                <SelectField
                  floatingLabelText="Curso"
                  value={this.state.value}
                  labelStyle={{ color: 'white' }}
                  menuItemStyle={{ color: 'white' }}
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
                label="Calcular progresso"
                labelPosition="before"
                containerElement="label"
                buttonStyle={this.props.currentUser ? { backgroundColor: '#ff7f00' } : { backgroundColor: 'gray' }}
                labelColor={'white'}
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
                labelColor='white'
                labelStyle={{ fontWeight: 'bold' }}
                onClick={() => this.props.history.push('/Ranking/')}
                disabled={!this.props.currentUser}
              />
              <RaisedButton
                label='Matérias do curso'
                labelPosition="before"
                containerElement="label"
                backgroundColor={'#ff7f00'}
                labelColor='white'
                disabledBackgroundColor={'gray'}
                disabledLabelColor={'black'}
                labelStyle={{ fontWeight: 'bold' }}
                onClick={() => this.props.currentUser ? this.props.history.push('/ListClasses/') : ''}
                disabled={!this.props.currentUser}
              />
            </CardActions>
          </Card>
          : ''}
      </div>
    )
  }
}
export default Home;