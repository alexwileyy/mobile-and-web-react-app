import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, DatePickerIOS, Modal, Alert} from 'react-native';
import LayoutStyles from '../styles/layout';

import {TextColour, BrandYellow} from "../variables";

import { applyLetterSpacing } from '../helpers';

// Components
import TextCard from '../components/TextCard';
import PictureCard from '../components/PictureCard';

const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Nov", "Dec"];

type Props = {};
export default class Home extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showTimelineDate: false,
            timelineDate: new Date(),
            modalVisible: false,
            displayDate: "Today",
            cards: [
                {
                    text: "A king man held the door open for me",
                    type: "text",
                    date: new Date()
                },
                {
                    text: "The barista who made my coffee smiled at me",
                    type: "picture",
                    date: new Date(),
                    image: "https://images.unsplash.com/photo-1556209423-c0f478ab131a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80"
                }
            ]
        }
    }

    /**
     * Compare two dates
     * @param dateA
     * @param dateB
     * @returns {boolean}
     */
    compareDates = (dateA, dateB) => {
        console.log(dateA);
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
        this.props.toggleDateHeader(true);
        if(scroll.nativeEvent.contentOffset.y >= 120) {
            this.props.toggleDateHeader(true);
        } else {
            this.props.toggleDateHeader(false);
        }
    };

    /**
     * Renders a card for a given type
     * @param props
     * @returns {*}
     */
    renderCard = (props) => {

        if(props.type === "text") {
            return (
                <TextCard text={props.text} date={props.date}/>
            )
        }
        else if(props.type === "picture"){
            return (
                <PictureCard background={props.image} text={props.text} date={props.date}/>
            )
        }

    };

    /**
     * Render the component
     * @returns {*}
     */
    render() {
        return (
            <View style={LayoutStyles.appContainer}>

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

                <ScrollView scrollEventThrottle={100} onScrollBeginDrag={this.handleScroll} onScroll={this.handleScroll} onScrollEndDrag={this.handleScroll}>

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

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    }
});
