import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ActionSheetIOS} from 'react-native';

import {containerPadding, months, days} from '../variables'
import {FormatDate} from '../helpers'

import MomentNav from '../components/MomentNav';
import LinearGradient from 'react-native-linear-gradient';
import Logo from "../assets/img/icon/logo.png";
import NonFav from "../assets/img/non-favourite.png"
import Fav from "../assets/img/favourite.png"

type Props = {};
export default class TextMoment extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            text: props.navigation.getParam("text"),
            date: props.navigation.getParam("date"),
            description: props.navigation.getParam("description"),
            isFavourite: props.navigation.getParam("isFavourite") ? Fav : NonFav,
        };
    }

    /**
     * toggle the favourite state
     */
    toggleFavourite = () => {
        this.setState(state => ({isFavourite: state.isFavourite === Fav ? NonFav : Fav}))
        //TODO: Add API call
    };

    /**
     * Launches the moment action menu for IOS
     */
    momentActionMenu = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                title: "Moment Options",
                options: ['Cancel', 'Edit Moment', 'Show Moment Location', 'Delete Moment'],
                destructiveButtonIndex: 3,
                cancelButtonIndex: 0,
            },
            (buttonIndex) => {
                // Delete button
                if (buttonIndex === 1) {
                    //TODO: Delete the moment
                }
                // Edit moment
                else if(buttonIndex === 2) {
                    //TODO: Edit the moment
                }
                // Show moment location
                else if(buttonIndex === 2) {
                    //TODO: Show the moment location
                }
            },
        );

    };

    /**
     * Render the component
     * @returns {*}
     */
    render() {

        const {
            text,
            date,
            description,
            isFavourite
        } = this.state;

        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} angle={45} colors={['#A8FF78', '#1CD8D2']} style={styles.background}>

                <View style={styles.test}>
                    <MomentNav text={"Text Moment"} onActionMenuPress={this.momentActionMenu} {...this.props}/>
                </View>


                <View style={styles.content}>
                    <Text style={styles.title}>{text}</Text>
                    <Text style={styles.desc}>{description}</Text>

                    <View style={styles.border}></View>

                    <Text style={styles.date}>{FormatDate(date)}</Text>

                    <TouchableOpacity onPress={this.toggleFavourite}>
                        <Image style={styles.favourite} source={this.state.isFavourite}/>
                    </TouchableOpacity>

                </View>


            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        paddingTop: 50
    },
    content: {
        flex: 10,
        justifyContent: "flex-end",
        paddingBottom: 40,
        paddingLeft: containerPadding,
        paddingRight: containerPadding
    },
    test: {
        flex: 1,
        justifyContent: "flex-end",
        zIndex: 10000
    },
    title: {
        fontSize: 60,
        color: "white",
        fontFamily: "Catamaran-Bold",
        lineHeight: 75
    },
    desc: {
        fontSize: 15,
        color: "white",
        fontFamily: "Catamaran-Regular",
    },
    border: {
        width: 50,
        height: 3,
        backgroundColor: "white",
        marginTop: 20,
        marginBottom: 20
    },
    date: {
        color: "white",
        fontFamily: "Catamaran-Regular",
    },
    meta: {

    },
    favourite: {
        width: 115,
        height: 20,
        marginTop: 20,
    }
});
