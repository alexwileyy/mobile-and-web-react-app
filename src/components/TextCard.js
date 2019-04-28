import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, DatePickerIOS, Modal, Alert} from 'react-native';
import {TextColour} from "../variables";

import LinearGradient from 'react-native-linear-gradient';

type Props = {};
export default class TextCard extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return(
            <View style={styles.container}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A8FF78', '#1CD8D2']} style={styles.linearGradient}>
                    <Text style={styles.cardDate}>28 Mar @ 2:45pm</Text>
                    <Text style={styles.cardText}>A kind man held the door open for me</Text>
                </LinearGradient>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        // backgroundColor: "#1CD8D2"
    },
    cardText: {
        color: "white",
        fontSize: 30,
        paddingTop: 40,
        fontFamily: "Catamaran-Bold",
        lineHeight: 30
    },
    cardDate: {
        fontFamily: "Catamaran-Bold",
        color: "white",
        opacity: .8
    },
    linearGradient: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        borderRadius: 10,
        padding: 10
    }
});