import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";

type props = {};
export default class NormalNav extends Component<props> {

    constructor(props) {
        super(props);
    }

    render(){

        return (
            <View style={styles.nav}>
                <Image source={require('../assets/img/icon/logo.png')} style={styles.logo}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    nav: {
        height: 100,
        width: '100%',
        top: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 10
    },
    logo: {
        width: 150,
        height: 40
    },
});


NormalNav.propTypes = {

};