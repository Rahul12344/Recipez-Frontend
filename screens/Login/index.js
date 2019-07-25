import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image,ImageBackground} from 'react-native';
import InputField from "../../components/InputField";
import {w, h, totalSize} from '../../api/Dimensions';
import GetStarted from './GetStarted';
import FirebaseAuth from '../../api/Firebase/FirebaseAuth.js'
import Axios from 'axios';

const companyLogo = require('../../assets/companylogo.png');
const email = require('../../assets/email.png');
const password = require('../../assets/password.png');

export default class Login extends Component {

  _mounted = false;

  signal = Axios.CancelToken.source();

  state = {
    isEmailCorrect: false,
    isPasswordCorrect: false,
    isLogin: false,
  };

  componentDidMount(){
    this._mounted = true;
  
    this.loginToFireBase = (email, password) => {
      if(this._mounted) {
        this.setState({ isLogin: true });
        FirebaseAuth.login(email,password, this.signal.token)
        .then(user => {
          console.log(this.signal.token);
          if(user) {
            if(user.data.user)
            {
              this.setState({ isLogin: false });
              this.props.success(user);
              this.props.change('user')();
            }
            else {
              this.setState({ isLogin: false });
              console.warn('Wrong username/password');
            }
          }
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Error: ', err.message); // => prints: Api is being canceled
          } else {
            this.setState({ isLogin: false });
          }
        });
      }
    };
  }

  componentWillUnmount(){
    this._mounted = false;
    this.signal.cancel('Api is being canceled');
  }

  getStarted = () => {
    const email = this.email.getInputValue();
    const password = this.password.getInputValue();

    if(this._mounted) {
      this.setState({
        isEmailCorrect: email === '',
        isPasswordCorrect: password === '',
      }, () => {
        if(email !== '' && password !== ''){
          this.loginToFireBase(email, password);
        } else {
          console.warn('Fill up all fields')
        }
      });
    }
  };

  changeInputFocus = name => () => {
    if(this._mounted) {
      if (name === 'Email') {
        this.setState({ isEmailCorrect: this.email.getInputValue() === '' });
        this.password.input.focus();
      } else {
        this.setState({ isPasswordCorrect: this.password.getInputValue() === '' });
      }
    }
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
        <Image style={styles.icon} resizeMode="contain" source={companyLogo}/>
        <InputField
          placeholder="Email"
          keyboardType="email-address"
          style={styles.email}
          error={this.state.isEmailCorrect}
          focus={this.changeInputFocus}
          ref={ref => this.email = ref}
          icon={email}
        />
        <InputField
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry={true}
          blurOnSubmit={true}
          error={this.state.isPasswordCorrect}
          ref={ref => this.password = ref}
          focus={this.changeInputFocus}
          icon={password}
        />
        <GetStarted
          click={this.getStarted}
          isLogin={this.state.isLogin}
        />
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={this.props.change('register')} style={styles.createAccount} activeOpacity={0.6}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.change('forgot')} style={styles.forgotPassword} activeOpacity={0.6}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: w(70),
    height: h(30),
    marginTop: h(10),
    marginBottom: h(7),
  },
  textContainer: {
    width: w(100),
    flexDirection: 'row',
    marginTop: h(5),
  },
  email: {
    marginBottom: h(4.5),
  },
  touchable: {
    flex: 1,
    paddingVertical: w(2),
    backgroundColor: '#b1baaf',
    borderRadius: w(10),
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: w(2)
  },
  createAccount: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
    marginLeft: w(1),
    marginRight: w(12),
  },
  forgotPassword: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
});
