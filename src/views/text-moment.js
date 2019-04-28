import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {containerPadding, months} from '../variables'

import MomentNav from '../components/MomentNav';
import LinearGradient from 'react-native-linear-gradient';

type Props = {};
export default class TextMoment extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
        };
        // props.toggleNav(false);

    }

    // componentWillUnmount(): void {
    //     this.props.toggleNav(true);
    // }

    componentDidMount(): void {
        console.log(this.props.navigation);
        this.props.navigation.addListener(
            'willBlur',
            payload => {
                //this.props.toggleNav(true);
                console.log('willBlur', payload);
            }
        );
    }

    /**
     * Render the component
     * @returns {*}
     */
    render() {
        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} angle={45} colors={['#A8FF78', '#1CD8D2']} style={styles.background}>
                <View style={{flex:0.5}}>
                    <MomentNav text={"Text Moment"} {...this.props}/>
                </View>


                <View style={styles.content}>
                    <Text>Content</Text>
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
    nav: {
        flex: 1
        // position: "absolute",
        // top: 50,
        // left: 0,
        // width: "100%"
    },
    content: {
        flex: 10,
        justifyContent: "flex-end",
        paddingBottom: 40,
        paddingLeft: containerPadding,
        paddingRight: containerPadding
    },
    headerText: {
        fontFamily: "Catamaran-Bold",
        color: "white"
    },
    backArrow: {
        height: 15,
        width: 20
    }
});
