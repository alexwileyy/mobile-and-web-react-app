import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

import {months, BrandYellow} from "../variables";
import PropTypes from "prop-types";

type Props = {};

export default class PictureCard extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){

        const {
            background,
            text,
            date
        } = this.props;

        return(
            <View style={styles.container}>
                <ImageBackground source={{uri: "https://images.unsplash.com/photo-1556209423-c0f478ab131a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80"}} style={styles.background}>
                    <Text style={styles.cardDate}>{`${date.getDate()} ${months[date.getMonth() + 1]} @ ${date.getUTCHours()}:${date.getUTCMinutes()}`}</Text>
                    <Text style={styles.cardText}>{text}</Text>
                </ImageBackground>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        backgroundColor: BrandYellow,
        borderRadius: 10,
    },
    cardText: {
        color: "white",
        fontSize: 30,
        paddingTop: 90,
        fontFamily: "Catamaran-Bold",
        lineHeight: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    cardDate: {
        fontFamily: "Catamaran-Bold",
        color: "white",
        opacity: .8,
        paddingTop: 10,
        paddingLeft: 10
    },
    background: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    }
});

PictureCard.propTypes = {
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
};