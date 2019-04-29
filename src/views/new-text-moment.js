import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import MomentNav from "../components/MomentNav";
import {containerPadding} from "../variables";

// Import assets
import TextMoment from '../assets/img/text-moment.png';
import PictureMoment from '../assets/img/picture-moment.png';
import VideoMoment from '../assets/img/video-moment.png';
import AudioMoment from '../assets/img/audio-moment.png';

type Props = {};
export default class NewTextMoment extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props);
    }


    render() {
        return (
            <View style={styles.background}>

                <View style={styles.nav}>
                    <MomentNav text={'TEXT MOMENT'} theme={"black"} {...this.props}/>
                </View>

                <View style={styles.content}>

                </View>

            </View>
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
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
    },
    nav: {
        flex: .5,
        paddingLeft: containerPadding,
        paddingRight: containerPadding
    }
});
