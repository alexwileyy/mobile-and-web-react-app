import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import NormalNav from "../components/NormalNav";
import {containerPadding} from "../variables";

// Import assets
import TextMoment from '../assets/img/text-moment.png';
import PictureMoment from '../assets/img/picture-moment.png';
import VideoMoment from '../assets/img/video-moment.png';
import AudioMoment from '../assets/img/audio-moment.png';
import LinearGradient from "./text-moment";

type Props = {};
export default class NewMoment extends Component<Props> {

    launchMoment = (type) => {
        switch (type) {
            case "text":
                this.props.navigation.navigate("NewTextMoment", {onMomentCreate: this.props.navigation.getParam("onMomentCreate")});
                break;
            case "picture":
                break;
            case "video":
                break;
            case "audio":
                break;
        }
    };

    render() {
        return (
            <View style={styles.background}>

                <View style={styles.nav}>
                    <NormalNav showBack={true} backArrowColour={"black"} {...this.props}/>
                </View>

                <View style={styles.content}>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionContainer} onPress={()=>{this.launchMoment("text")}}>
                            <Image style={styles.action} source={TextMoment}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionContainer} onPress={()=>{this.launchMoment("picture")}}>
                            <Image style={styles.action} source={PictureMoment}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionContainer} onPress={()=>{this.launchMoment("audio")}}>
                            <Image style={styles.action} source={AudioMoment}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionContainer} onPress={()=>{this.launchMoment("video")}}>
                            <Image style={styles.action} source={VideoMoment}/>
                        </TouchableOpacity>

                    </View>

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
    },
    actionContainer: {
        width: "50%",
    },
    actions: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: 15
    },
    action: {
        width: "100%",
        height: 170
    }
});
