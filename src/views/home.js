import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import LayoutStyles from '../styles/layout';

import { applyLetterSpacing } from '../helpers';

type Props = {};
export default class Home extends Component<Props> {

    static navigationOptions = {
        title: 'Home',
    };

    onPressAction = () => {
        this.props.navigation.navigate('NewMoment');
    };

    render() {
        return (
            <View style={LayoutStyles.appContainer}>

                <View style={styles.timelimeScopeContainer}>
                    <Text style={styles.timelineScopeText}>{applyLetterSpacing("VIEWING MOMENTS FOR:", 2)}</Text>
                </View>

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
    }
});
