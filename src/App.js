/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Animated, Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import GetNavStack, {NavStack} from './AppNavigator';
import {BrandYellow, containerPadding} from "./variables";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.NewNavStack = GetNavStack();

    this.state = {
      navType: 'normal',
      showNav: true
    };

  }


  render() {
    return (
      <View style={styles.container}>
        <this.NewNavStack/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  navContent: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: containerPadding,
    paddingRight: containerPadding
  },
  navText: {
    color: "white",
    fontSize: 25
  },
  navIcon: {
    width: 15,
    height: 15
  },
  navTopContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  navBackArrow: {
    width: 37,
    height: 29
  },
  navMomentText: {
    fontFamily: "Catamaran-Bold",
  }
});



export default App;