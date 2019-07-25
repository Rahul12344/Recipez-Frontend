import FirebaseLogin from "./screens/FirebaseLogin";
import React, {Component} from 'react';

export default class App extends Component {
    render() {
    return (
        <FirebaseLogin login={user => console.warn(user)}/>
        )
    }
}