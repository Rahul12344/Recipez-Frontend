import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Category extends Component {
    render() {
        return (
            <View style={styles.view}>
                <View style={{ flex: 2 }}>
                    <Image source={this.props.imageUri}
                        style={styles.image}
                    />
                </View>
                <View style={styles.viewTwo}>
                    <Text>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}
export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        height: 130, 
        width: 130, 
        marginLeft: 20, 
        borderWidth: 0.5, 
        borderColor: '#dddddd'
    },
    image: {
        flex: 1, 
        width: null, 
        height: null, 
        resizeMode: 'cover'
    },
    viewTwo: {
        flex: 1, 
        paddingLeft: 10, 
        paddingTop: 10
    }
});