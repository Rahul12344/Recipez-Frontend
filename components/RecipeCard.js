import React, {Component} from 'react';
import { View,Text,TouchableOpacity,Image,TouchableHighlight,Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { w, h } from '../api/Dimensions';
import Axios from 'axios';
import FirebaseDB from '../api/Firebase/FirebaseDB'
import WebComponent from '../components/WebView';

export default class RecipeCard extends Component {

    _mounted = false;

    signal = Axios.CancelToken.source();

    recipe = {};

    state = {
        label: null,
        time: null,
        haves: null,
        have_nots: null,
        healthLabels: null,
        url: null,
        showWebView: false
    };

    componentDidMount(){
        this._mounted = true;
        if(this._mounted){
            this.setState({
                label: this.props.recipe.label,
                time: this.props.recipe.totalTime,
                haves: this.props.recipe.haves,
                have_nots: this.props.recipe.havenots,
                healthLabels: this.props.recipe.healthLabels,
                url: this.props.recipe.url,
                showWebView: false
            });
        }
        this.recipe = 
            {
                'label': this.props.recipe.label,
                'time': this.props.recipe.totalTime,
                'haves': this.props.recipe.haves,
                'have_nots': this.props.recipe.havenots,
                'healthLabels': this.props.recipe.healthLabels,
                'url': this.props.recipe.url
            }
        ;
    }

    componentWillUnmount(){
        this._mounted = false;
    }

    addToRecipes(){
        console.log("HIIII");
        FirebaseDB.addRecipe(this.recipe, this.signal.token)
        .then(recipe => {
            console.log("HELLUUUU");
          console.log(recipe);
        })
        .catch((error) => {
          if (Axios.isCancel(error)) {
            console.log('Error: ', err.message);
          } else {
            console.log(error);
          }
        });
    }

    takeToRecipe(){
        const uri = this.props.recipe.url
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

    render(){
        return (
            <View key={this.props.recipe} style={styles.containerStyle} onPress={this.takeToRecipe}>
                { this.state.showWebView && this.takeToRecipe() }
                <View style={styles.side1}>
                    <View>
                        <Text style={styles.displayText}>{`${this.props.recipe.label}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.smallText}>Time: {`${this.props.recipe.totalTime}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.smallText}>{`${this.props.recipe.healthLabels}`}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.setState({showWebView: true})}>
                        <Text style={styles.smallText}>{`${this.props.recipe.url}`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.addButton}>
                        <TouchableOpacity style={styles.myButton} onPress={this.addToRecipes.bind(this)}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>   
                </View>
                <View style={styles.side2}>
                    <TouchableHighlight
                        style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]}
                    >
                        <Image source={{ uri:"https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png" }} style={styles.profileImg} />
                    </TouchableHighlight>
                </View>
            </View>
          );
    }
}

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginTop: h(1),
    backgroundColor: 'white',
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  side1:{
    width:w(60),
    padding:w(1)
  },
  side2:{
    width:w(35),
    alignItems: 'center',
    justifyContent: 'center'
  },
  displayText: {
    fontSize: 24,
    color: '#f0900a'
  },
  smallText: {
    fontSize: 16,
    color: '#a9aba9'
  },
  addButton: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  myButton:{
    padding: 5,
    height: 50,
    width: 200,  
    borderRadius:30,
    borderWidth: 2, 
    backgroundColor:'#c8dec8',
    borderColor: '#86a386',
    marginBottom: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 24,
    color: 'orange'
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 120,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 120,
    width: 80,
    borderRadius: 40,
  },
};

