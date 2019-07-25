import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from '../api/Dimensions';
 
const myRecipe = require('../assets/myrecipe.png')


const MyRecipes = (props) => {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={myRecipe}/>
        {props.children}
      </View>
    );
  };

MyRecipes.propTypes = {
    change: PropTypes.func.isRequired,
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:"center",
      height: h(33),
      width: w(90),
      backgroundColor: '#fff',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    icon: {
        width: w(95),
        height: w(50),
        opacity: 0.8
    },
});

export default MyRecipes;