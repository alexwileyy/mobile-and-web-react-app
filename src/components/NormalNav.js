import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";

import BackArrowWhite from '../assets/img/icon/back-arrow.png';
import BackArrowBlack from '../assets/img/icon/back-arrow-black.png';

type props = {};
export default class NormalNav extends Component<props> {

    constructor(props) {
        super(props);
        console.log(props);
    }

    back = () => {
        this.props.navigation.goBack();
    };

    render(){
        const arrow = this.props.backArrowColour === 'white' ? BackArrowWhite : BackArrowBlack;

        return (
            <View style={styles.nav}>
                {this.props.showBack &&
                <TouchableOpacity style={styles.arrowContainer} onPress={this.back}>
                    <Image source={arrow} style={styles.backArrow}/>
                </TouchableOpacity>
                }
                <Image source={require('../assets/img/icon/logo.png')} style={styles.logo}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    nav: {
        width: '100%',
        top: 0,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 150,
        height: 40
    },
    arrowContainer: {
        position: 'absolute',
        left: 0
    },
    backArrow: {
        height: 15,
        width: 20,
    }
});

NormalNav.defaultProps = {
    showBack: false,
    backArrowColour: "black"
};

NormalNav.propTypes = {
    showBack: PropTypes.bool,
    backArrowColour: PropTypes.string
};