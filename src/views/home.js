import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, ScrollView, DatePickerIOS, Modal, Alert} from 'react-native';
import LayoutStyles from '../styles/layout';

import { applyLetterSpacing } from '../helpers';

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
            displayDate: "today"
        }
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
     * @param newDate
     */
    updateTimelineDate = (newDate) => {
        this.setState({timelineDate: newDate});
        if(this.compareDates(new Date(), newDate)) {
            this.setState({displayDate: "today"});
            console.log("Setting to today..");
        } else {
            this.setState({displayDate: `${day[newDate.getDay()]} ${month[newDate.getUTCMonth()+1]} ${newDate.getUTCFullYear()}`})
        }
    };

    /**
     * Toggle the visibility of the date picker
     */
    toggleDatePicker = () => {
        this.setState(state => ({modalVisible: !state.modalVisible}))
    };

    /**
     * Render the component
     * @returns {*}
     */
    render() {
        return (
            <View style={LayoutStyles.appContainer}>

                <ScrollView>

                    <View style={styles.timelimeScopeContainer}>
                    <Text style={styles.timelineScopeText}>{applyLetterSpacing("VIEWING MOMENTS FOR:", 2)}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={styles.timelineButton} onPress={this.toggleDatePicker}>{this.state.displayDate}</Text>
                    </View>
                </View>
                </ScrollView>

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
        marginTop: 30
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
    }
});
