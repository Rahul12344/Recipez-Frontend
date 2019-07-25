import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {w, h, totalSize} from '../../api/Dimensions';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PhotoWrapper from '../Photo/PhotoWrapper';
import Explore from '../Explore';
import MyRecipes from '../MyRecipes';
import Publish from '../Publish';

const email = require('../../assets/email.png');
const password = require('../../assets/password.png');


const UserNav = createBottomTabNavigator ({

  Receipt: {
    screen: PhotoWrapper,
    navigationOptions: {
      tabBarLabel: 'RECEIPT',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-camera" color={tintColor} size={24} />
      )
    }
  },

  Explore:{
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-search" color={tintColor} size={24} />
      )
    }
  },

  MyRecipes: {
    screen: MyRecipes,
    navigationOptions: {
      tabBarLabel: 'MY RECIPES',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-book" color={tintColor} size={24} />
      )
    }
  },

  Publish: {
    screen: Publish,
    navigationOptions: {
      tabBarLabel: 'PUBLISH',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-cloud-upload" color={tintColor} size={24} />
      )
    }
  } 

});

const Users = createAppContainer(UserNav);

export default Users;