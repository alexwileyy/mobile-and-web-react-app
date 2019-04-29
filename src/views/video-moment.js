import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import Fav from "../assets/img/favourite.png";
import NonFav from "../assets/img/non-favourite.png";
import LinearGradient from "./text-moment";
import {FormatDate} from "../helpers";
import {containerPadding} from "../variables";
import MomentNav from '../components/MomentNav';

import Video from 'react-native-video';

type props = {};
export default class VideoMoment extends Component<props> {

    constructor(props) {
        super(props);
        this.state = {
            text: props.navigation.getParam("text"),
            date: props.navigation.getParam("date"),
            description: props.navigation.getParam("description"),
            isFavourite: props.navigation.getParam("isFavourite") ? Fav : NonFav,
            background: props.navigation.getParam("background")
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
     * Render the component
     * @returns {*}
     */
    render() {

        const {
            text,
            date,
            description,
            isFavourite,
            background
        } = this.state;

        return (
            <View style={styles.background}>

                <Video repeat={true} resizeMode="cover" source={{uri: "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4"}} style={styles.video} />

                <View style={styles.overlay}></View>

                <View style={styles.test}>
                    <MomentNav text={"Video Moment"} {...this.props}/>
                </View>


                <View style={styles.content}>
                    <Text style={styles.title}>{text}</Text>
                    <Text style={styles.desc}>{description}</Text>

                    <View style={styles.border}></View>

                    <Text style={styles.date}>{FormatDate(date)}</Text>

                    <TouchableOpacity onPress={this.toggleFavourite}>
                        <Image style={styles.favourite} source={isFavourite}/>
                    </TouchableOpacity>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: "100%",
        height: Dimensions.get("window").height,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "black",
        opacity: .4
    },
    background: {
        width: "100%",
        flex: 1,
        flexDirection: "column",
        paddingTop: 50,
        backgroundColor: "black"
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
    favourite: {
        width: 115,
        height: 20,
        marginTop: 20
    },
    video: {
        position: 'absolute',
        width: "100%",
        height: "120%",
        top: 0,
        left: 0,
    }
});
