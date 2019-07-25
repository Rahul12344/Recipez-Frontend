import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from '../../api/Dimensions';
import FirebaseAuth from '../../api/Firebase/FirebaseAuth.js';
import {RNCamera} from 'react-native-camera';
import SquareButton from '../../components/UsefulItems/SquareButton'
import Axios from 'axios';

import Receipt from '../../api/Recipe/Receipt';

export default class RecipePhoto extends Component {

  _mounted = false;

  signal = Axios.CancelToken.source();

  componentDidMount(){
    this._mounted = true;
  }

  componentWillUnmount(){
    _mounted = false;
    this.signal.cancel('Api is being canceled');
  }

  takePictureAndSendReceipt = async() => {
    if(this._mounted) {
      Receipt.receipt('/Users/rahulnatarajan/Desktop/Pics/targetbanana.png', this.signal.token)
        .then(recipe => {
          console.log(recipe);
          this.props.recipes(recipe)();
          this.props.changePhotoScreen('recipes')();
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Error: ', err.message); // => prints: Api is being canceled
          } else {
            this.setState({ isLogin: false });
          }
        });
      if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
      }
    };
  }

  render() {
    return (
       <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
      >
        <Text style={styles.capture} onPress={this.takePictureAndSendReceipt}>
          SEND RECEIPT
        </Text>
      </RNCamera>
    )
  }
}

RecipePhoto.propTypes = {
  changePhotoScreen: PropTypes.func.isRequired,
  recipes: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e0facf'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: h(100),
    width: w(100),
  },
  capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40  
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
  },
  createAccount: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  forgotPassword: {
    color:'#ffffffEE',
    textAlign: 'center',
    fontSize: totalSize(2),
    fontWeight: '600',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cad9c7'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdcfba'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93b38d'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
