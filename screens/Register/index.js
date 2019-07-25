import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';
import InputField from '../../components/InputField';
import Continue from './Continue';
import FirebaseAuth from '../../api/Firebase/FirebaseAuth.js';
import Axios from 'axios';


const email = require('../../assets/email.png');
const password = require('../../assets/password.png');
const repeat = require('../../assets/repeat.png');
const person = require('../../assets/person.png');

export default class Register extends Component {

  _mounted = false;

  signal = Axios.CancelToken.source();

  state = {
    isNameCorrect: false,
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isRepeatCorrect: false,
    isCreatingAccount: false,
  };

  componentDidMount(){
    this._mounted = true;

    this.createFireBaseAccount = (name, email, password) => {
      if(this._mounted){
        this.setState({ isCreatingAccount: true });
        FirebaseAuth.signup(email, password)
          .then(user => {
            if(user) {
              this.setState({ isCreatingAccount: false });
              this.props.change('login')();
            } 
          });
      }
    };
  }

  componentWillUnmount(){
    this._mounted = false;
  }

  createUserAccount = () => {
    const name = this.name.getInputValue();
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();
    const repeat = this.repeat.getInputValue();

    this.setState({
      isNameCorrect: name === '',
      isEmailCorrect: email === '',
      isPasswordCorrect: password === '',
      isRepeatCorrect: repeat === '' || repeat !== password,
    }, () => {
      if(name !== '' && email !== '' && password !== '' && (repeat !== '' && repeat === password)){
        this.createFireBaseAccount(name, email, password);
      } else {
        console.warn('Fill up all fields correctly');
      }
    })
  };


  changeInputFocus = name => () => {
    switch (name) {
      case 'Name':
        this.setState({ isNameCorrect: this.name.getInputValue() === '' });
        this.email.input.focus();
        break;
      case 'Email':
        this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
        this.password.input.focus();
        break;
      case 'Password':
        this.setState({ isPasswordCorrect: this.password.getInputValue() === '',
          isRepeatCorrect: (this.repeat.getInputValue() !== ''
            && this.repeat.getInputValue() !== this.password.getInputValue()) });
        this.repeat.input.focus();
        break;
      default:
        this.setState({ isRepeatCorrect: (this.repeat.getInputValue() === ''
            || this.repeat.getInputValue() !== this.password.getInputValue()) });
    }
  };

  render() {
    return(
      <ImageBackground source={require('../../assets/background.png')} style={{width: '100%', height: '100%'}}>
       <View style={styles.container}>
        <Text style={styles.create}>CREATE ACCOUNT</Text>
        <InputField
          placeholder="Name"
          autoCapitalize="words"
          error={this.state.isNameCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.name = ref}
          icon={person}
        />
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          error={this.state.isEmailCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Password"
          error={this.state.isPasswordCorrect}
          style={styles.input}
          focus={this.changeInputFocus}
          ref={ref => this.password = ref}
          secureTextEntry={true}
          icon={password}
        />
        <InputField
          placeholder="Repeat Password"
          error={this.state.isRepeatCorrect}
          style={styles.input}
          secureTextEntry={true}
          returnKeyType="done"
          blurOnSubmit={true}
          focus={this.changeInputFocus}
          ref={ref => this.repeat = ref}
          icon={repeat}
        />
        <Continue isCreating={this.state.isCreatingAccount} click={this.createUserAccount}/>
        <TouchableOpacity onPress={this.props.change('login')} style={styles.touchable}>
          <Text style={styles.signIn}>{'<'} Sign In</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    )
  }
}

Register.propTypes = {
  change: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  create: {
    color:'white',
    fontSize: totalSize(2.4),
    marginTop: h(7),
    marginBottom: h(4),
    fontWeight: '700',
  },
  signIn: {
    color:'#ffffffEE',
    fontSize: totalSize(2),
    fontWeight: '700',
  },
  touchable: {
    alignSelf: 'flex-start',
    marginLeft: w(8),
    marginTop: h(4),
  },
  input: {
    marginVertical: h(2),
  }
});