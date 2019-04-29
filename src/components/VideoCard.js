import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';

import {months, BrandYellow} from "../variables";
import PropTypes from "prop-types";

type Props = {};

export default class VideoCard extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    openMoment = () => {
        this.props.navigation.navigate('VideoMoment', {...this.props})
    };

    render(){

        const {
            background,
            text,
            date
        } = this.props;

        return(
            <TouchableOpacity style={styles.container} onPress={this.openMoment} activeOpacity={0.8}>
                <ImageBackground source={{uri: background}} style={styles.background}>
                    <Text style={styles.cardDate}>{`${date.getDate()} ${months[date.getMonth() + 1]} @ ${date.getUTCHours()}:${date.getUTCMinutes()}`}</Text>
                    <Text style={styles.cardText}>{text}</Text>
                </ImageBackground>
            </TouchableOpacity>
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

VideoCard.propTypes = {
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
};