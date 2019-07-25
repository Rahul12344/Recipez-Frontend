import React, { Component } from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {w, h, totalSize} from '../../api/Dimensions';
import FirebaseAuth from '../../api/Firebase/FirebaseAuth.js';
import {RNCamera} from 'react-native-camera';
import SquareButton from '../../components/UsefulItems/SquareButton'

import RecipePhoto from './Photo';
import Recipes from './Recipes';

export default class PhotoWrapper extends Component {

  _mounted = false;

  componentDidMount(){
    this._mounted = true;
  }

  state = {
    currentScreen: 'photos',
    recipes: null
  };

  changePhotoScreen = screenName => () => {
    if(this._mounted){
      this.setState({ currentScreen: screenName });
    }
  };

  recipes = recipes => () => {
    if(this._mounted){
        this.setState({recipes: recipes});
    }
  };


  componentWillUnmount(){
    _mounted = false;
  }

  render() {
    let screenToShow;

    screenToShow = this.screenShow;
    
    switch(this.state.currentScreen) {
      case 'photos':
        screenToShow = <RecipePhoto changePhotoScreen={this.changePhotoScreen} recipes={this.recipes}/>;
        break;
      case 'recipes':
        screenToShow = <Recipes changePhotoScreen={this.changePhotoScreen} recipes={this.recipes} recipeList={this.state.recipes}/>;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
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
  background: {
    width: '100%',
    height: '100%',
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
  },
});
