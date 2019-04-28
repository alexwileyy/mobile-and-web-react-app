import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";

type props = {};
export default class MomentNav extends Component<props> {

    constructor(props) {
        super(props);
    }

    render(){

        const {
            text
        } = this.props;

        return (
            <View style={styles.nav}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Image source={require('../assets/img/icon/back-arrow.png')} style={styles.backArrow}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    nav: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
    },
    headerText: {
        fontFamily: "Catamaran-Bold",
        color: "white"
    },
    backArrow: {
        height: 15,
        width: 20
    }
});


MomentNav.propTypes = {
    text: PropTypes.string.isRequired
};