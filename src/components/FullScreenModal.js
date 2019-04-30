import React, {Component} from 'react';
import {View, Modal, Alert, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import {containerPadding} from "../variables";


type props = {};
export default class FullScreenModal extends Component<props> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render(): React.ReactNode {
        return (
            <Modal
                animationType="slide"
                visible={this.props.showModal}
                transparent={false}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View></View>
                <View style={styles.modalContainer}>
                    {this.props.children}
                </View>
            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    modalContainer: {
        marginTop: 50,
        paddingLeft: containerPadding,
        paddingRight: containerPadding
    },
});

FullScreenModal.propTypes = {
    showModal: PropTypes.bool.isRequired
};