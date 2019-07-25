import React, { Component } from "react";

const recipepublish = require('../assets/recipepublish.png');

import {
    View,
    Text,
    StyleSheet
} from "react-native";

class Publish extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Saved</Text>
            </View>
        );
    }
}
export default Publish;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});