import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Text, Button, ScrollView, DatePickerIOS, Modal, Alert, Animated,} from 'react-native';
import LayoutStyles from '../styles/layout';
import firebase from 'react-native-firebase';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid', 'Warning: Slider']);

import {TextColour, BrandYellow, containerPadding} from "../variables";

import { applyLetterSpacing } from '../helpers';

// Components
import NormalNav from '../components/NormalNav'
import TextCard from '../components/TextCard';
import PictureCard from '../components/PictureCard';
import VideoCard from '../components/VideoCard';
import CreateMomentButton from "../components/CreateMomentButton";

// Import login component
import Login from "../views/login";

const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Nov", "Dec"];

let newMomentButtonWidth;

type Props = {};
export default class Home extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showDateHeader: false,
            fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
            showTimelineDate: false,
            timelineDate: new Date(),
            modalVisible: false,
            displayDate: "Today",
            cards: [
                {
                    type: "picture",
                    text: "Coffee",
                    description: "Hello world",
                    date: new Date(),
                    time: new Date(),
                    isFavourite: false,
                    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                },
                {
                    type: "text",
                    text: "Test",
                    description: "Hello world",
                    date: new Date(),
                    time: new Date(),
                    isFavourite: false
                }
            ],
            user: firebase.auth().currentUser || props.navigation.getParam("user") || null
        };
    }

    componentWillMount(): void {
        if (firebase.auth().currentUser) {
            firebase.auth().currentUser.getIdToken(false).then(token => {
                fetch("http://localhost:3000/moments/today",
                    {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": token
                        },
                    })
                    .then(res =>res.json())
                    .then(data => {
                        let moments = data.moments.map(moment => {
                            moment.date = new Date(moment.date);
                            moment.time = new Date(moment.time);
                            return moment;
                        });
                        moments = moments.reverse();
                        this.setState({cards: moments})
                    })
            });
        }
    }

    componentDidMount(): void {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    /**
     * Compare two dates
     * @param dateA
     * @param dateB
     * @returns {boolean}
     */
    compareDates = (dateA, dateB) => {
        return `${day[dateA.getDay()]} ${month[dateA.getUTCMonth()+1]} ${dateA.getUTCFullYear()}` === `${day[dateB.getDay()]} ${month[dateB.getUTCMonth()+1]} ${dateB.getUTCFullYear()}`
    };

    /**
     * Update the timeline date
     * @param datePickerDate
     */
    updateTimelineDate = (datePickerDate) => {
        this.setState({timelineDate: datePickerDate});
        let yesterday = new Date();
        let tomorrow = new Date();
        const date = new Date();
        yesterday = yesterday.setDate(date.getDate() - 1);
        tomorrow = tomorrow.setDate(date.getDate() + 1);
        if(this.compareDates(new Date(), datePickerDate)) {
            this.setState({displayDate: "Today"});
        } else if (this.compareDates(new Date(yesterday), datePickerDate)) {
            this.setState({displayDate: "Yesterday"});
        }
        else if (this.compareDates(new Date(tomorrow), datePickerDate)) {
            this.setState({displayDate: "Tomorrow"});
        }
        else {
            this.setState({displayDate: `${day[datePickerDate.getDay()]} ${month[datePickerDate.getUTCMonth()+1]} ${datePickerDate.getUTCFullYear()}`})
        }
    };

    /**
     * Toggle the visibility of the date picker
     */
    toggleDatePicker = () => {
        this.setState(state => ({modalVisible: !state.modalVisible}))
    };

    /**
     * Fires upon scroll
     * @param scroll
     */
    handleScroll = (scroll) => {
        this.toggleDateHeader(true);
        if(scroll.nativeEvent.contentOffset.y >= 120) {
            this.toggleDateHeader(true);
        } else {
            this.toggleDateHeader(false);
        }
    };

    /**
     * Renders a card for a given type
     * @param cardProps
     * @returns {*}
     */
    renderCard = (cardProps) => {

        if(cardProps.type === "text") {
            return (
                <TextCard text={cardProps.text}
                          date={cardProps.date}
                          time={cardProps.time}
                          description={cardProps.description}
                          isFavourite={cardProps.isFavourite}
                          {...this.props}/>
            )
        }
        else if(cardProps.type === "picture"){
            return (
                <PictureCard background={cardProps.image}
                             text={cardProps.text}
                             date={cardProps.date}
                             isFavourite={cardProps.isFavourite}
                             description={cardProps.description}
                             {...this.props}
                />
            )
        }
        else if(cardProps.type === "video"){
            return (
                <VideoCard background={cardProps.image}
                             text={cardProps.text}
                             date={cardProps.date}
                             isFavourite={cardProps.isFavourite}
                             description={cardProps.description}
                             {...this.props}
                />
            )
        }
    };

    /**
     * Toggles whether to show the date header or now
     * @param toggle
     */
    toggleDateHeader = (toggle) => {

        this.setState(state => ({showDateHeader: toggle}), ()=>{
            Animated.timing(                  // Animate over time
                this.state.fadeAnim,            // The animated value to drive
                {
                    toValue: toggle ? 1 : 0,                   // Animate to opacity: 1 (opaque)
                    duration: 200,              // Make it take a while
                }
            ).start();
        });
    };

    /**
     * Adds a moment to the timeline
     * @param moment
     */
    addMomentToTimeline = (moment) => {
        console.log(moment);
        const moments = this.state.cards;
        this.setState(state => ({cards: [{...moment}, ...moments]}))
    };

    /**
     * Logs a user out of the application
     */
    logout = () => {
        firebase.auth().signOut()
            .then(res => {
                console.log(res);
                this.setState({user: null})
            })
    };

    /**
     * Render the component
     * @returns {*}
     */
    render() {

        if(!this.state.user) {
            return <Login {...this.props}/>
        }

        return (
            <View style={{...styles.appContainer, ...LayoutStyles.appContainer}}>

                <View style={styles.normalNav}>
                    <NormalNav profileIcon={this.state.user._user.photoURL} logoutAction={this.logout}/>
                </View>

                {/*<Animated.View          // Special animatable View*/}
                    {/*style={{*/}
                        {/*width: "110%",*/}
                        {/*position: "absolute",*/}
                        {/*top: 0,*/}
                        {/*left: 0,*/}
                        {/*right: 0,*/}
                        {/*opacity: this.state.fadeAnim,         // Bind opacity to animated value*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<View style={styles.navTop}>*/}
                        {/*<Text style={styles.navTopText}>Monday 28 April</Text>*/}
                    {/*</View>*/}
                {/*</Animated.View>*/}

                <Modal
                    animationType="fade"
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.dateModal}>
                        <View style={styles.datePickerContainer}>
                            <View style={{flexDirection: 'row', justifyContent: "flex-end", paddingTop: 10, marginRight: 15}}>
                                <Button title={"Done"} onPress={this.toggleDatePicker}/>
                            </View>
                            <DatePickerIOS
                                date={this.state.timelineDate}
                                onDateChange={this.updateTimelineDate}
                                mode="date"
                            />
                        </View>
                    </View>
                </Modal>

                <ScrollView style={styles.scrollView} scrollEventThrottle={100} onScrollBeginDrag={this.handleScroll} onScroll={this.handleScroll} onScrollEndDrag={this.handleScroll}>

                    <View style={styles.timelimeScopeContainer}>
                        <Text style={styles.timelineScopeText}>{applyLetterSpacing("VIEWING MOMENTS FOR:", 2)}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={styles.timelineButton} onPress={this.toggleDatePicker}>{this.state.displayDate}</Text>
                        </View>
                    </View>

                    <View>

                        {this.state.cards.map((card, index) => {

                            return (
                                <View key={index} style={styles.timelineCard}>
                                    {this.renderCard(card)}
                                </View>
                            )

                        })}

                    </View>

                </ScrollView>

                <View style={styles.newMomentContainer}>
                    <CreateMomentButton style={{flex: 1}} onMomentCreate={this.addMomentToTimeline} {...this.props}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    appContainer: {
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    container: {
        paddingLeft: 50,
        paddingRight: 50
    },
    timelimeScopeContainer: {
        marginTop: 30,
        marginBottom: 45
    },
    timelineScopeText: {
        fontSize: 12
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    timelineButton: {
        marginTop: 15,
        color: "white",
        fontSize: 23,
        textAlign: "center",
        backgroundColor: "#F2C04C",
        padding: 10,
        borderRadius: 3,
        overflow: "hidden",
        fontFamily: "Catamaran-Black"
    },
    dateModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    datePickerContainer: {
        backgroundColor: "white"
    },
    momentsTitle: {
        fontSize: 40,
        fontFamily: "Catamaran-Bold",
        color: TextColour,
        marginTop: 40
    },
    timelineCard: {
        marginBottom: 20
    },
    scrollView: {
    },
    navTop: {
        backgroundColor: BrandYellow,
        width: "100%",
        paddingTop: 50,
        paddingLeft: containerPadding,
        paddingRight: containerPadding,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 1,
    },
    navTopText: {
        color: "white",
        fontSize: 30,
        fontFamily: "Catamaran-Bold",
    },
    newMomentContainer: {
        position: 'absolute',
        width: Dimensions.get("window").width,
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center"
    },
    normalNav: {
        marginTop: 70,
        marginBottom: 20
    }
});
