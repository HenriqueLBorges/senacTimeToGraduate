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
    this.setState({ about: !this.state.about });
  }

  render() {
    return (
      <div style={{ backgroundColor: '#ffffff', height: '100%' }}>
        {this.props.loading ?
          <CircularProgress />
          :
          <div style={{ height: '100%' }}>
            {!this.state.about ?
              <div style={{ textAlign: 'center', height: '100%' }}>
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
                    onClick={() => this.props.currentUser ? this.props.history.push('/Courses/') : ''}
                    disabled={!this.props.currentUser}
                  />
                </div>
              </div>
              :
              <About back={this.back.bind(this)} />
            }
          </div>
        }
      </div>
    )
  }
}

export default Radium(Home);