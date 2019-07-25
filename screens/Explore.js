import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Category';

const { height, width } = Dimensions.get('window')

class Explore extends Component {

    state = {
        data: null,
    };

    componentDidMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

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
                                placeholder="Recipe Name..."
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                    </View>
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                Trending Recipes
                            </Text>

                            <View style={{ height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Category imageUri={require('../assets/close.png')}
                                        name="Recipe 1"
                                    />
                                    <Category imageUri={require('../assets/close.png')}
                                        name="Recipe 2"
                                    />
                                    <Category imageUri={require('../assets/close.png')}
                                        name="Recipe 3"
                                    />
                                    <Category imageUri={require('../assets/close.png')}
                                        name="Recipe 4"
                                    />
                                    <Category imageUri={require('../assets/close.png')}
                                        name="Recipe 5"
                                    />
                                    <Category imageUri={require('../assets/close.png')}
                                        name="Recipe 6"
                                    />
                                </ScrollView>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    Upcoming Recipe Styles
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                    A premium selection of recipes for quality dining & comfort

                                </Text>
                                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                    <Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/close.png')}
                                    />

                                </View>
                            </View>
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});