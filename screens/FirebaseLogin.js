import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet, ImageBackground } from 'react-native';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import User from './User';
import { w } from '../api/Dimensions';

export default class FirebaseLogin extends Component {

  _mounted = false;

  state = {
    currentScreen: 'login', // can be: 'login' or 'register' or 'forgot'
  };

  changeScreen = screenName => () => {
    if(this._mounted){
      this.setState({ currentScreen: screenName });
    }
  };

  userSuccessfullyLoggedIn = (user) => {
    if(this._mounted){
      this.props.login(user);
    }
  };

  componentDidMount(){
    this._mounted = true;
    console.log("HELLO");
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    let screenToShow;

    screenToShow = this.screenShow;
    
    switch(this.state.currentScreen) {
      case 'login':
        screenToShow = <Login change={this.changeScreen} success={this.userSuccessfullyLoggedIn}/>;
        break;
      case 'register':
        screenToShow = <Register change={this.changeScreen} />;
        break;
      case 'forgot':
        screenToShow = <ForgotPassword change={this.changeScreen}/>;
        break;
      case 'user':
        screenToShow = <User change={this.changeScreen} />;
        break;
    }

    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-w(40)}
        style={styles.container}
      >
        <ImageBackground
          source={this.props.background}
          style={styles.background}
          resizeMode="stretch"

        >
          {screenToShow}
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}



FirebaseLogin.propTypes = {
  login: PropTypes.func.isRequired,
};

FirebaseLogin.defaultProps = {
  background: null,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  background: {
    width: '100%',
    height: '100%',
  },
});
