import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

type Props = {};
export default class TextMoment extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /**
     * Render the component
     * @returns {*}
     */
    render() {
        return (
            <View>
                <Text>Text Moment</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
