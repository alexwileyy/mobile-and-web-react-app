import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";

import BlackArrow from "../assets/img/icon/back-arrow-black.png"
import WhiteArrow from "../assets/img/icon/back-arrow.png"
import MomentIcon from "../assets/img/icon/menu.png";

type props = {};
export default class MomentNav extends Component<props> {

    constructor(props) {
        super(props);
    }

    back = () => {
        this.props.navigation.goBack();
    };

    actionMenuPress = () => {
        if(this.props.onActionMenuPress){
            this.props.onActionMenuPress();
        }
    };

    render(){

        const {
            text,
            theme
        } = this.props;

        const arrow = theme === "black" ? BlackArrow : WhiteArrow;

        return (
            <View style={styles.nav}>
                <TouchableOpacity onPress={this.back}>
                    <Image source={arrow} style={styles.backArrow}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerContent} onPress={this.actionMenuPress} activeOpacity={1}>
                    <Text style={[styles.headerText, {color: theme === "black" ? "black" : "white"}]}>{text}</Text>
                    {this.props.onActionMenuPress && <Image source={MomentIcon} style={styles.menuIcon}/>}
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    nav: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center"
    },
    menuIcon: {
        marginLeft: 17
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

MomentNav.defaultProps = {
    theme: "white"
};

MomentNav.propTypes = {
    text: PropTypes.string.isRequired,
    theme: PropTypes.string,
    onActionMenuPress: PropTypes.func
};