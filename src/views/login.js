import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import firebase from 'react-native-firebase';

import Home from '../views/home';


type Props = {};
export default class Login extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(this.props);
                // this.props.navigation.navigate("Home", {user: creds});
            }
        });
    }

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword('alex@test.com', 'password')
            .then(creds => {
                this.setState({user: creds});
                this.props.navigation.navigate("Home", {user: creds});
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <View style={styles.page}>
                <Button title={"Sign in"} onPress={this.signIn}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex:1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});