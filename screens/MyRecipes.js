import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, List } from "react-native-gesture-handler";
import Axios from 'axios';

import FirebaseDB from '../api/Firebase/FirebaseDB';


class Profile extends Component {

    _mounted = false;

    signal = Axios.CancelToken.source();

    componentDidMount(){
        this._mounted = true;

        this.getUsersRecipes();
    }

    getUsersRecipes = () => {
        FirebaseDB.getAllRecipes(this.signal.token)
        .then(recipe => {
            if(this._mounted){
                this.setState({
                    data: recipe.data,
                    error: recipe.error || null,
                    loading: false,
                });
                this.arrayholder = recipe.data;
                console.log(this.arrayholder);
            }
        })
        .catch((error) => {
            if (Axios.isCancel(error)) {
                console.log('Error: ', err.message);
            } else {
                console.warn("Cannot find recipes");
            }
        });
    };

    searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };

    componentWillUnmount(){
        this._mounted = false;
        this.signal.cancel('Api is being canceled');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
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
                                placeholder="My Recipe Name..."
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                    </View>
                </View>
                <FlatList>
                    
                </FlatList>
            </SafeAreaView>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});