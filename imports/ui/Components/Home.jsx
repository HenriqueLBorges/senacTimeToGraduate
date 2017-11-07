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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: -1,
      showCard: false,
      course: {},
      about: false,
      coordinator: {}
    }
    this.styles = {
      midButton: {
        position: 'absolute',
        bottom: '0',
        display: "table-footer-group",
        marginLeft: web ? this.props.currentUser ? '47%' : "40%" : "38.5%",
        marginRight: web ? '30%' : "35%",
      },
      rightButton: {
        marginLeft: web ? '91%' : '88%',
        position: 'absolute',
        bottom: '0',
        display: "table-footer-group"
      },
      title: { 
        marginTop: '5%', 
        marginBottom: '5%',
        fontSize: web ? "450%" : "330%"
      }
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
    const loginStyle = (Meteor.isCordova ? 'redirect' : 'redirect');

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
      self.props.history.push('/');
    });
  }

  back() {
    this.setState({ about: !this.state.about, start: !this.state.start });
  }

  render() {
    let courses = this.props.graduationCourses;
    return (
      <div style={this.state.start ? { height: '100%' } : { backgroundColor: '#ffffff', height: '100%' }}>
        {this.props.loading ?
          <CircularProgress />
          :
          <div style={this.state.start && !this.state.about ? { backgroundColor: '#0E6094', height: '100%' } : { backgroundColor: '#ffffff', height: '100%' }}>
            {!this.state.start ?
              <div style={{ textAlign: 'center', height: '100%' }}>
                <img src="http://www.go.senac.br/portal/images/logo211x124.jpg" alt="Smiley face" />
                <h1 style={this.styles.title}>Calculadora de Graduação</h1>
                <div style={{ bottom: "0px" }}>
                  <RaisedButton
                    label="Sobre"
                    labelPosition="before"
                    containerElement="label"
                    style={{ marginRight: '10%', position: 'absolute', bottom: '0', display: "table-footer-group", float: "left" }}
                    buttonStyle={{ backgroundColor: '#ff7f00' }}
                    labelColor='#ffffff'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.setState({ start: !this.state.start, about: !this.state.about })}
                  />
                  <RaisedButton
                    label={this.props.currentUser ? "Logout" : "Entrar com o Facebook"}
                    labelPosition="before"
                    containerElement="label"
                    style={this.styles.midButton}
                    buttonStyle={{ backgroundColor: '#3b5998' }}
                    labelColor='#ffffff'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={this.props.currentUser ? () => this.logout() : () => this.login()}
                  />
                  <RaisedButton
                    label="Começar"
                    labelPosition="before"
                    containerElement="label"
                    style={this.styles.rightButton}
                    buttonStyle={this.props.currentUser ? { backgroundColor: '#ff7f00' } : { backgroundColor: 'gray' }}
                    labelColor='#ffffff'
                    labelStyle={{ fontWeight: 'bold' }}
                    onClick={() => this.props.currentUser ? this.setState({ start: !this.state.start }) : ''}
                    disabled={!this.props.currentUser}
                  />
                </div>
              </div>
              :
              <div>
                {this.state.about ?
                  <About back={this.back.bind(this)} />
                  :
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
                }
              </div>
            }
          </div>
        }
        {this.state.showCard ?
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
          : ''}
      </div>
    )
  }
}

export default Radium(Home);