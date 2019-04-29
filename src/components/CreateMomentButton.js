import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

// import {months, BrandYellow} from "../variables";

import NewMomentButton from "../assets/img/icon/new-moment-button.png";

type Props = {};

export default class CreateMomentButton extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <TouchableOpacity activeOpacity={1}>
                <Image style={styles.button} source={NewMomentButton}/>
            </TouchableOpacity>
        )
    }


}

const styles = StyleSheet.create({
    button: {
        width: 120,
        height: 120
    }
});

CreateMomentButton.propTypes = {

};