import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, ScrollView, DatePickerIOS, Modal, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {TextColour, months} from "../variables";

type Props = {};
export default class TextCard extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    openMoment = () => {
        this.props.navigation.navigate('TextMoment', {...this.props})
    };

    render(){

        const {
            text,
            date
        } = this.props;

        return(
            <View style={styles.container}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#A8FF78', '#1CD8D2']} style={styles.linearGradient}>
                    <Text style={styles.cardDate}>{`${date.getDate()} ${months[date.getMonth() + 1]} @ ${date.getUTCHours()}:${date.getUTCMinutes()}`}</Text>
                    <Text style={styles.cardText} onPress={this.openMoment}>{text}</Text>
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

TextCard.propTypes = {
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string.isRequired,
    isFavourite: PropTypes.bool
};

TextCard.defaultProps = {
    isFavourite: false
};