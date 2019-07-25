import React, { Component } from 'react';
import { 
    ScrollView, 
    StyleSheet, 
    View, 
    TouchableOpacity, 
    Text, 
    Image,
    StatusBar,
    Dimensions,
    TextInput,
    SafeAreaView,
} 
from 'react-native';
import {
    ListItem
}
from 'react-native-elements';
import {w, h, totalSize} from '../../api/Dimensions';
import FirebaseAuth from '../../api/Firebase/FirebaseAuth.js';
import {RNCamera} from 'react-native-camera';
import SquareButton from '../../components/UsefulItems/SquareButton';
import RecipeCard from '../../components/RecipeCard';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Recipes extends Component {

  _mounted = false;

  state = {
    recipes: this.props.recipeList.data,
    data: this.props.recipeList.data,
    text: ''
  };

  arrayholder = this.props.recipeList.data;

  componentDidMount(){
    this._mounted = true;
    if(this._mounted){
        this.setState({ 
            recipes: this.props.recipeList.data,
            data: this.props.recipeList.data
        });
      }
  }

  componentWillUnmount(){
    this._mounted = false;
  }

  takePhoto(){
      if(this._mounted){
        this.props.changePhotoScreen('photos')();
      }
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(recipe => {
      const itemData = recipe.label.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    let errorHandlingScreens;

    if(this.props.recipeList.data.length > 0){
        errorHandlingScreens = 
            <ScrollView>
                    {this.state.data.map((recipe) => (
                        <RecipeCard key={Math.random()} recipe={recipe}/>
                    ))}
            </ScrollView>
    }
    else {
        errorHandlingScreens =  
        <ScrollView>
            <Card>
                <Text>
                    Receipt did not process
                </Text>
            </Card>>
        </ScrollView>
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd', width: w(100) }}>
                <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Recipe Name..."
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                                onChangeText={(text) => this.searchFilterFunction(text)}
                            />
                </View>
            </View>
            {errorHandlingScreens}
            <View style={styles.scroll}>
                <TouchableOpacity style={styles.myButton} onPress={this.takePhoto.bind(this)}>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scroll:{
    borderTopWidth: 1,
    borderTopColor: '#d1d1cf',
    width: w(100),
    alignItems: 'center',
    justifyContent: 'flex-end'
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
  },
  myButton:{
    padding: 5,
    height: 50,
    width: 50,  
    borderRadius:100,
    borderWidth: 2, 
    backgroundColor:'#edede8',
    borderColor: '#d1d1cf',
    marginBottom: 2,
    marginTop: 2,
  },
});
