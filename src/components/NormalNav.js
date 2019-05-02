import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ActionSheetIOS} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";

import BackArrowWhite from '../assets/img/icon/back-arrow.png';
import BackArrowBlack from '../assets/img/icon/back-arrow-black.png';

type props = {};
export default class NormalNav extends Component<props> {

    constructor(props) {
        super(props);
    }

    back = () => {
        this.props.navigation.goBack();
    };

    logout = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                title: "Profile",
                options: ['Cancel', 'Logout'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    /* destructive action */
                    this.props.logoutAction();
                }
            },
        );
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
                {this.props.profileIcon &&
                <TouchableOpacity style={styles.profileContainer} onPress={this.logout}>
                    {/*<Text>Here</Text>*/}
                    <Image source={{uri: this.props.profileIcon}} style={styles.profileIcon}/>
                </TouchableOpacity>
                }
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
    },
    profileContainer: {
        position: 'absolute',
        right: 0,
        overflow: "hidden",
        borderRadius: 100
    },
    profileIcon: {
        width: 35,
        height: 35
    }
});

NormalNav.defaultProps = {
    showBack: false,
    showProfile: false,
    backArrowColour: "black"
};

NormalNav.propTypes = {
    showBack: PropTypes.bool,
    backArrowColour: PropTypes.string,
    profileIcon: PropTypes.string,
    logoutAction: PropTypes.func
};