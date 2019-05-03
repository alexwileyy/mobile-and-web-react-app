import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, DatePickerIOS, Button, Animated, ScrollView} from 'react-native';
import firebase from "react-native-firebase";
import MomentNav from "../components/MomentNav";
import {containerPadding, BrandYellow} from "../variables";
import { FormatDate, FormatTime } from "../helpers"

// Import components
import FullScreenModal from "../components/FullScreenModal";

// Import assets
import CalendarIcon from "../assets/img/icon/calendar.png";
import TimeIcon from "../assets/img/icon/time.png";
import VideoMoment from "../assets/img/video-moment.png";

import LinearGradient from "react-native-linear-gradient";

type Props = {};
export default class NewTextMoment extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showTimeModal: false,
            showDateModal: false,
            momentTitle: "",
            momentDescription: "",
            momentDate: new Date(),
            momentTime: new Date(),
            optionsOpen: false,
            optionsHeight: new Animated.Value(0)
        };
        this.onMomenCreate = this.props.navigation.getParam("onMomentCreate");
    }

    /**
     * Toggle the time modal
     * @param val
     */
    toggleTimeModal = (val) => {
        if(val && typeof val === "string"){
            return this.setState({showTimeModal: val})
        }
        this.setState(state => ({showTimeModal: !state.showTimeModal}))
    };

    /**
     * Toggle the date modal
     * @param val
     */
    toggleDateModal = (val) => {
        if(val && typeof val === "string"){
            return this.setState({showDateModal: val})
        }
        this.setState(state => ({showDateModal: !state.showDateModal}))
    };

    /**
     * Toggle options tab
     * @param val
     */
    toggleOptions = (val) => {
        if(val && typeof val === "string"){
            return this.setState({optionsOpen: val})
        }
        this.setState(state => ({optionsOpen: !state.optionsOpen}));
        Animated.timing(
            this.state.optionsHeight,
            {
                toValue: this.state.optionsOpen ? 0 : 165,
                duration: 200
            }
        ).start();
    };

    /**
     * Updates the date for the new moment
     * @param date
     */
    updateMomentDate = (date) => {
        this.setState({momentDate: date})
    };

    /**
     * Update the time for the new moment
     * @param date
     */
    updateMomentTime = (time) => {
        this.setState({momentTime: time})
    };

    /**
     * Updates the title for the moment
     * @param val
     */
    updateMomentTitle = (val) => {
        this.setState({momentTitle: val})
    };

    /**
     * Updates the description for the moment
     * @param val
     */
    updateMomentDesc = (val) => {
        this.setState({momentDescription: val})
    };

    /**
     * Creates a new moment adding it to the database
     */
    createMoment = () => {
        const body = {
            type: "text",
            text: this.state.momentTitle,
            description: this.state.momentDescription,
            time: this.state.momentTime,
            date: this.state.momentDate,
            location: "temp",
            isFavourite: false,
            media: false
        };
        firebase.auth().currentUser.getIdToken(false).then((token) => {
            fetch('http://localhost:3000/moments', {
                method: 'post',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            }).then(jsonRes => jsonRes.json())
                .then(result => {
                    if(result){
                        const moment = result.moment;
                        moment.date = new Date(result.date);
                        moment.time = new Date(result.time);
                        this.onMomenCreate(moment);
                        this.props.navigation.popToTop();
                    } else {
                        alert("Error whilst creating moment.");
                    }
            }).catch(err => {
                    console.log(err);
                });
        }).catch(function(error) {
            console.log(error);
            alert("An error occurred whilst authenticating you.")
        });
    };

    render() {
        return (
            <View style={styles.background}>

                <FullScreenModal showModal={this.state.showTimeModal}>
                    <Text style={styles.modalTitleText}>Select a time</Text>
                    <DatePickerIOS
                        date={this.state.momentTime}
                        onDateChange={this.updateMomentTime}
                        mode="time"
                    />
                    <Button color={BrandYellow} onPress={this.toggleTimeModal} title={"Done"}/>
                </FullScreenModal>

                <FullScreenModal showModal={this.state.showDateModal}>
                    <Text style={styles.modalTitleText}>Select a date</Text>
                    <DatePickerIOS
                        date={this.state.momentDate}
                        onDateChange={this.updateMomentDate}
                        mode="date"
                    />
                    <Button color={BrandYellow} onPress={this.toggleDateModal} title={"Done"}/>
                </FullScreenModal>


                <View style={styles.nav}>
                    <MomentNav text={'TEXT MOMENT'} theme={"black"} {...this.props}/>
                </View>

                <View style={styles.content}>

                    <ScrollView>

                        <View style={styles.contentInput}>
                            <TextInput style={styles.titleInput}
                                       placeholder={"Start typing your moment title"}
                                       placeholderColor={"#E0E0E0"}
                                       numberOfLines={10}
                                       multiline={true}
                                       allowFontScaling={true}
                                       onChangeText={this.updateMomentTitle}
                                       value={this.state.momentTitle}

                            />
                            <TextInput style={styles.bodyInput}
                                       placeholder={"Start typing your moment description"}
                                       placeholderColor={"#E0E0E0"}
                                       numberOfLines={1}
                                       multiline={true}
                                       allowFontScaling={true}
                                       onChangeText={this.updateMomentDesc}
                                       value={this.state.momentDescription}

                            />
                        </View>

                    </ScrollView>


                </View>

                <View style={styles.momentOptions}>

                    <TouchableOpacity style={styles.momentOptionsHeader} onPress={this.toggleOptions} activeOpacity={1}>
                        <Text style={styles.momentOptionsTitle}>MOMENT OPTIONS</Text>
                        <Text>{this.state.optionsOpen ? '-' : '+'}</Text>
                    </TouchableOpacity>

                    <Animated.View          // Special animatable View
                        style={{
                            height: this.state.optionsHeight,
                            overflow: 'hidden'
                        }}
                    >
                        <TouchableOpacity style={styles.optionContainer} activeOpacity={1} onPress={()=>{this.toggleDateModal()}}>
                            <Image source={CalendarIcon} style={styles.optionIcon}/>
                            <Text style={styles.optionContent}>{FormatDate(this.state.momentDate, false)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} activeOpacity={1} onPress={()=>{this.toggleTimeModal()}}>
                            <Image source={TimeIcon} style={styles.optionIcon}/>
                            <Text style={styles.optionContent}>{FormatTime(this.state.momentTime, false)}</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <TouchableOpacity style={styles.createMomentButton} activeOpacity={1} onPress={this.createMoment}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#EFD229', '#F2C04C']} style={styles.buttonGradient}>
                            <Text style={styles.buttonText}>CREATE MOMENT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        flexDirection: "column",
        justifyContent: "space-between"
    },
    nav: {
        flex: .5
    },
    contentInput: {
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
    },
    titleInput: {
        fontFamily: "Catamaran-Black",
        fontSize: 50
    },
    bodyInput: {
        fontFamily: "Catamaran-Regular",
        fontSize: 18
    },
    momentOptions: {
        backgroundColor: "#FAF8F8",
        paddingTop: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%"
    },
    momentOptionsHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
    },
    momentOptionsTitle: {
        fontSize: 15,
        color: "#606060",
        fontFamily: "Catamaran-SemiBold",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
    },
    optionIcon: {
        width: 85,
        height: 85,
    },
    optionContent: {
        paddingTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 5,
        backgroundColor: "white",
        height: 40,
        overflow: "hidden"
    },
    modalTitleText: {
        fontFamily: "Catamaran-Black",
        fontSize: 50,
        lineHeight: 60,
        paddingTop: 40,
        paddingBottom: 20,
        color: "#535353",
        textAlign: "center"
    },
    createMomentButton: {
        marginTop: 10
    },
    buttonText: {
        fontFamily: "Catamaran-Bold",
        color: "white",
        textAlign: "center",
        padding: 20,
        fontSize: 18
    }
});
