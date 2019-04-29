import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";

type props = {};
export default class MomentNav extends Component<props> {

    constructor(props) {
        super(props);
    }

    back = () => {
        this.props.navigation.goBack();
    };

    render(){

        const {
            text
        } = this.props;

        return (
            <View style={styles.nav}>
                <TouchableOpacity onPress={this.back}>
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
        color: "white",
        fontSize: 18
    },
    backArrow: {
        height: 15,
        width: 20,
        zIndex: 1
    }
});


MomentNav.propTypes = {
    text: PropTypes.string.isRequired
};