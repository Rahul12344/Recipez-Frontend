import React, {Component} from 'react';
import { View,Text,TouchableOpacity,Image,TouchableHighlight,Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { w, h } from '../api/Dimensions';
import Axios from 'axios';
import FirebaseDB from '../api/Firebase/FirebaseDB';

export default class WebComponent extends Component {
    render(){
        const uri = this.props.url
        return (
            <WebView
                ref={(ref) => { this.webview = ref; }}
                source={{ uri }}
                onNavigationStateChange={(event) => {
                if (event.url !== uri) {
                    this.webview.stopLoading();
                    Linking.openURL(event.url);
                }
                }}
            />
        )
    }
}
